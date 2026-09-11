/**
 * Runtime validation for the PolicyDecision contract, mirroring
 * `policy/schema.json`. Any response from shox that fails this validation
 * must be treated as a fail-safe REVIEW, never a silent ALLOW.
 *
 * See PHASE_1.md §2.4 (Evaluation) and §4 (Testing Strategy).
 */
import { z } from "zod";
import type { PolicyDecision } from "./types";

export const POLICY_REASON_CODES = [
  "OK",
  "HARASSMENT",
  "HATE_SPEECH",
  "VIOLENCE_OR_THREATS",
  "SELF_HARM",
  "SEXUAL_CONTENT_MINORS",
  "SEXUAL_CONTENT_ADULT",
  "ILLEGAL_ACTIVITY",
  "MALWARE_OR_EXPLOITS",
  "PRIVACY_VIOLATION",
  "SPAM_OR_ABUSE",
  "PROMPT_INJECTION_ATTEMPT",
  "MISINFORMATION",
  "IP_INFRINGEMENT",
  "AMBIGUOUS_INTENT",
  "INSUFFICIENT_CONTEXT",
  "CLASSIFIER_ERROR",
] as const;

/** The raw shape the model itself is expected to emit (no `model` field yet). */
export const modelDecisionSchema = z
  .object({
    decision: z.enum(["ALLOW", "REFUSE", "REVIEW"]),
    reason_code: z.enum(POLICY_REASON_CODES),
    explanation: z.string().max(500).optional(),
    policy_version: z.string().regex(/^\d+\.\d+\.\d+$/),
  })
  .superRefine((val, ctx) => {
    if (val.decision === "ALLOW" && val.reason_code !== "OK") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ALLOW decisions must use reason_code OK",
        path: ["reason_code"],
      });
    }
    if (
      val.decision === "REVIEW" &&
      !["AMBIGUOUS_INTENT", "INSUFFICIENT_CONTEXT", "CLASSIFIER_ERROR"].includes(
        val.reason_code,
      )
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "REVIEW decisions must use reason_code AMBIGUOUS_INTENT, INSUFFICIENT_CONTEXT, or CLASSIFIER_ERROR",
        path: ["reason_code"],
      });
    }
  });

/** The full PolicyDecision contract, including the caller-supplied `model` field. */
export const policyDecisionSchema = z.intersection(
  modelDecisionSchema,
  z.object({ model: z.string().min(1) }),
);

/**
 * Parses and validates a raw (untrusted) model response body against the
 * PolicyDecision contract. Never throws — returns `null` on any validation
 * failure so callers can apply the fail-safe REVIEW default.
 */
export function parseModelDecision(
  raw: unknown,
): z.infer<typeof modelDecisionSchema> | null {
  const result = modelDecisionSchema.safeParse(raw);
  return result.success ? result.data : null;
}

/** Validates a fully-assembled PolicyDecision (including `model`). */
export function validatePolicyDecision(raw: unknown): PolicyDecision | null {
  const result = policyDecisionSchema.safeParse(raw);
  return result.success ? (result.data as PolicyDecision) : null;
}
