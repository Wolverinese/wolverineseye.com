/**
 * Append-only audit log for policy gate decisions.
 *
 * Phase 1 scope (see PHASE_1.md §2.2 Memory): each policy request/response
 * pair is logged for audit and abuse tracking. This is NOT fed back into
 * future policy prompts — it exists purely for observability.
 *
 * The default implementation logs structured entries to stdout (captured by
 * the hosting platform's log aggregation). Swap `logPolicyDecision` for a
 * durable sink (database, log service) when one is available, without
 * changing callers.
 */
import { createHash } from "node:crypto";
import type { PolicyDecision } from "../policy/types";

export interface PolicyLogEntry {
  timestamp: string;
  /** SHA-256 of the raw user message — never log the raw message itself. */
  message_hash: string;
  decision: PolicyDecision["decision"];
  reason_code: PolicyDecision["reason_code"];
  model: PolicyDecision["model"];
  policy_version: PolicyDecision["policy_version"];
}

/** Hashes a user message for audit logging without persisting raw content. */
export function hashMessage(message: string): string {
  return createHash("sha256").update(message, "utf8").digest("hex");
}

/**
 * Records a policy decision to the audit log. Never throws — logging
 * failures must not block the policy gate response.
 */
export function logPolicyDecision(
  message: string,
  decision: PolicyDecision,
): void {
  try {
    const entry: PolicyLogEntry = {
      timestamp: new Date().toISOString(),
      message_hash: hashMessage(message),
      decision: decision.decision,
      reason_code: decision.reason_code,
      model: decision.model,
      policy_version: decision.policy_version,
    };
    console.log(JSON.stringify({ type: "policy_decision", ...entry }));
  } catch {
    // Logging must never break the request path.
  }
}
