import { describe, expect, it } from "vitest";
import { parseModelDecision, validatePolicyDecision } from "../schema";

describe("parseModelDecision", () => {
  it("accepts a well-formed ALLOW decision", () => {
    const result = parseModelDecision({
      decision: "ALLOW",
      reason_code: "OK",
      explanation: "Benign message.",
      policy_version: "1.0.0",
    });
    expect(result).not.toBeNull();
    expect(result?.decision).toBe("ALLOW");
  });

  it("accepts a well-formed REFUSE decision", () => {
    const result = parseModelDecision({
      decision: "REFUSE",
      reason_code: "HARASSMENT",
      policy_version: "1.0.0",
    });
    expect(result).not.toBeNull();
    expect(result?.reason_code).toBe("HARASSMENT");
  });

  it("rejects ALLOW paired with a non-OK reason_code", () => {
    const result = parseModelDecision({
      decision: "ALLOW",
      reason_code: "HARASSMENT",
      policy_version: "1.0.0",
    });
    expect(result).toBeNull();
  });

  it("rejects REVIEW paired with an invalid reason_code", () => {
    const result = parseModelDecision({
      decision: "REVIEW",
      reason_code: "HARASSMENT",
      policy_version: "1.0.0",
    });
    expect(result).toBeNull();
  });

  it("rejects a decision value outside the fixed taxonomy", () => {
    const result = parseModelDecision({
      decision: "MAYBE",
      reason_code: "OK",
      policy_version: "1.0.0",
    });
    expect(result).toBeNull();
  });

  it("rejects a missing policy_version", () => {
    const result = parseModelDecision({
      decision: "ALLOW",
      reason_code: "OK",
    });
    expect(result).toBeNull();
  });

  it("rejects malformed input (not an object)", () => {
    expect(parseModelDecision("not json")).toBeNull();
    expect(parseModelDecision(null)).toBeNull();
    expect(parseModelDecision(undefined)).toBeNull();
  });

  it("rejects an explanation longer than 500 characters", () => {
    const result = parseModelDecision({
      decision: "ALLOW",
      reason_code: "OK",
      explanation: "a".repeat(501),
      policy_version: "1.0.0",
    });
    expect(result).toBeNull();
  });
});

describe("validatePolicyDecision", () => {
  it("accepts a full PolicyDecision including model", () => {
    const result = validatePolicyDecision({
      decision: "REVIEW",
      reason_code: "AMBIGUOUS_INTENT",
      model: "ollama/llama3",
      policy_version: "1.0.0",
    });
    expect(result).not.toBeNull();
    expect(result?.model).toBe("ollama/llama3");
  });

  it("rejects a decision missing the model field", () => {
    const result = validatePolicyDecision({
      decision: "REVIEW",
      reason_code: "AMBIGUOUS_INTENT",
      policy_version: "1.0.0",
    });
    expect(result).toBeNull();
  });
});
