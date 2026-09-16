import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../route";
import { classifyMessage } from "@/lib/policy/client";
import { logPolicyDecision } from "@/lib/logging/policyLog";

vi.mock("@/lib/policy/client", () => ({ classifyMessage: vi.fn() }));
vi.mock("@/lib/logging/policyLog", () => ({ logPolicyDecision: vi.fn() }));

function request(body: string) {
  return new NextRequest("http://localhost/api/policy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

describe("POST /api/policy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("SHOX_BASE_URL", "https://shox.test");
    vi.stubEnv("SHOX_POLICY_API_KEY", "test-token");
  });
  afterEach(() => vi.unstubAllEnvs());

  it.each([
    "null", "[]", "true", "42", '"text"', "{}",
    '{"message":null}', '{"message":42}', '{"message":"  "}', "{",
  ])("rejects invalid input without classification or audit logging: %s", async (body) => {
    const response = await POST(request(body));
    expect(response.status).toBe(400);
    expect(classifyMessage).not.toHaveBeenCalled();
    expect(logPolicyDecision).not.toHaveBeenCalled();
  });

  it("returns 503 without dispatch when the gate is unconfigured", async () => {
    vi.stubEnv("SHOX_POLICY_API_KEY", "");
    const response = await POST(request('{"message":"hello"}'));
    expect(response.status).toBe(503);
    expect(classifyMessage).not.toHaveBeenCalled();
  });

  it("returns and logs a configured classification", async () => {
    const decision = {
      decision: "REVIEW" as const,
      reason_code: "CLASSIFIER_ERROR" as const,
      model: "unknown",
      policy_version: "1.0.0",
    };
    vi.mocked(classifyMessage).mockResolvedValue(decision);
    const response = await POST(request('{"message":"hello"}'));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(decision);
    expect(classifyMessage).toHaveBeenCalledWith("hello", {
      baseUrl: "https://shox.test", apiKey: "test-token",
    });
    expect(logPolicyDecision).toHaveBeenCalledWith("hello", decision);
  });
});
