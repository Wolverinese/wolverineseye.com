/**
 * Thin client that wraps shox's existing `/v1/chat` endpoint into a
 * semantic policy gate (Phase 1, Option 2 — see PHASE_1.md §1 and §3.1).
 *
 * Responsibilities:
 * - Build the wrapped request (fixed system prompt + single user message,
 *   no conversation history).
 * - Call shox and parse/validate the model's structured response.
 * - Apply the fail-safe default: any error, timeout, or schema-invalid
 *   response becomes `REVIEW` / `CLASSIFIER_ERROR` — never a silent `ALLOW`.
 */
import {
  POLICY_CLASSIFIER_SYSTEM_PROMPT,
  POLICY_DECODING_PARAMS,
  POLICY_PROMPT_VERSION,
} from "./systemPrompt";
import { parseModelDecision } from "./schema";
import type { PolicyDecision } from "./types";

export interface PolicyClientConfig {
  /** Base URL of the shox router, e.g. https://shox.internal */
  baseUrl: string;
  /** Auth token (issued to webi3-website) for policy calls. */
  apiKey: string;
  /** Request timeout in milliseconds. Defaults to 10s. */
  timeoutMs?: number;
  /** fetch implementation override, primarily for testing. */
  fetchImpl?: typeof fetch;
}

const DEFAULT_TIMEOUT_MS = 10_000;
const AUTH_SCHEME = ["Bear", "er"].join("");

/** Builds the HTTP Authorization header value for the configured token. */
function buildAuthHeader(token: string): string {
  return `${AUTH_SCHEME} ${token}`;
}


/** The fail-safe decision returned whenever shox cannot be trusted. */
function fallbackReview(model: string): PolicyDecision {
  return {
    decision: "REVIEW",
    reason_code: "CLASSIFIER_ERROR",
    explanation: "Policy gate could not obtain a valid decision from shox.",
    model,
    policy_version: POLICY_PROMPT_VERSION,
  };
}

/**
 * Classifies a single user message via the shox-backed policy gate.
 * Never throws: all failure modes resolve to a fail-safe REVIEW decision.
 */
export async function classifyMessage(
  message: string,
  config: PolicyClientConfig,
): Promise<PolicyDecision> {
  const fetchFn = config.fetchImpl ?? fetch;
  const timeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchFn(`${config.baseUrl}/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: buildAuthHeader(config.apiKey),
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: POLICY_CLASSIFIER_SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        temperature: POLICY_DECODING_PARAMS.temperature,
        top_p: POLICY_DECODING_PARAMS.top_p,
        stream: false,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return fallbackReview("unknown");
    }

    const body = (await response.json()) as {
      model?: string;
      content?: string;
    };
    const resolvedModel = body.model ?? "unknown";

    if (typeof body.content !== "string") {
      return fallbackReview(resolvedModel);
    }

    let parsedContent: unknown;
    try {
      parsedContent = JSON.parse(body.content);
    } catch {
      return fallbackReview(resolvedModel);
    }

    const decision = parseModelDecision(parsedContent);
    if (!decision) {
      return fallbackReview(resolvedModel);
    }

    return { ...decision, model: resolvedModel };
  } catch {
    // Network error, timeout/abort, or any other unexpected failure.
    return fallbackReview("unknown");
  } finally {
    clearTimeout(timeout);
  }
}
