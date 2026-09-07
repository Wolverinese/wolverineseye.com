export interface PolicyResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Phase 0 embedded policy check.
 * Refuse requests that violate constitutional boundaries.
 */
export function checkPolicy(message: string): PolicyResult {
  const lower = message.toLowerCase();

  // Hard-coded refusal triggers
  const refusedTriggers = [
    "secret",
    "credentials",
    "password",
    "seed phrase",
    "private key",
    "delete",
    "override",
    "ignore",
    "bypass",
  ];

  for (const trigger of refusedTriggers) {
    if (lower.includes(trigger)) {
      return {
        allowed: false,
        reason: "I cannot process that request. It violates constitutional boundaries.",
      };
    }
  }

  return { allowed: true };
}
