/**
 * Shared types for the semantic policy gate (Phase 1, Option 2).
 *
 * These mirror the JSON Schema contract defined in `policy/schema.json` and
 * documented in `PHASE_1.md` §2.4/§3.1. Keep in sync with that schema.
 */

/** The fixed, closed set of policy outcomes for Phase 1. */
export type PolicyDecisionValue = "ALLOW" | "REFUSE" | "REVIEW";

/** Fixed reason_code vocabulary, mirroring `policy/schema.json`. */
export type PolicyReasonCode =
  | "OK"
  | "HARASSMENT"
  | "HATE_SPEECH"
  | "VIOLENCE_OR_THREATS"
  | "SELF_HARM"
  | "SEXUAL_CONTENT_MINORS"
  | "SEXUAL_CONTENT_ADULT"
  | "ILLEGAL_ACTIVITY"
  | "MALWARE_OR_EXPLOITS"
  | "PRIVACY_VIOLATION"
  | "SPAM_OR_ABUSE"
  | "PROMPT_INJECTION_ATTEMPT"
  | "MISINFORMATION"
  | "IP_INFRINGEMENT"
  | "AMBIGUOUS_INTENT"
  | "INSUFFICIENT_CONTEXT"
  | "CLASSIFIER_ERROR";

/** The structured decision object returned to callers of the policy gate. */
export interface PolicyDecision {
  decision: PolicyDecisionValue;
  reason_code: PolicyReasonCode;
  explanation?: string;
  /** Resolved model id from shox that produced this decision (provenance). */
  model: string;
  /** Version of the taxonomy/system prompt that produced this decision. */
  policy_version: string;
}

/** Request body accepted by `POST /api/policy`. */
export interface PolicyRequest {
  /** The end-user message to classify. Treated as data, never as instructions. */
  message: string;
}
