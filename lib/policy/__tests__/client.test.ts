import { describe, expect, it, vi } from "vitest";
import { classifyMessage } from "../client";
import { POLICY_PROMPT_VERSION } from "../systemPrompt";

function jsonResponse(body: unknown, ok = true) {
  return {
    ok,
    json: async () => body,
  } as Response;
}

describe("classifyMessage", () => {
  const config = { baseUrl: "https://shox.test", apiKey: "test-token" };

  it.each([undefined, null, 42, {}, [], "", "   "])(
    "rejects invalid model provenance instead of returning ALLOW: %j",
    async (model) => {
      const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({
        model,
        content: JSON.stringify({
          decision: "ALLOW", reason_code: "OK", policy_version: POLICY_PROMPT_VERSION,
        }),
      }));
      const decision = await classifyMessage("hello", { ...config, fetchImpl });
      expect(decision).toMatchObject({
        decision: "REVIEW", reason_code: "CLASSIFIER_ERROR", model: "unknown",
      });
    },
  );

  it.each([null, [], 42, "response"])("rejects a non-object envelope: %j", async (body) => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(body));
    expect(await classifyMessage("hello", { ...config, fetchImpl })).toMatchObject({
      decision: "REVIEW", reason_code: "CLASSIFIER_ERROR", model: "unknown",
    });
  });

  it("rejects a well-formed decision for a different policy version", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({
      model: "m1",
      content: JSON.stringify({ decision: "ALLOW", reason_code: "OK", policy_version: "9.9.9" }),
    }));
    expect(await classifyMessage("hello", { ...config, fetchImpl })).toMatchObject({
      decision: "REVIEW", reason_code: "CLASSIFIER_ERROR", policy_version: POLICY_PROMPT_VERSION,
    });
  });

  it("fails closed on the current shox answer envelope; it is not the expected classifier contract", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({
      product: "shox", request_id: "test-request", model: "m1",
      category: "simple", provider: "ollama",
      answer: JSON.stringify({ decision: "ALLOW", reason_code: "OK", policy_version: POLICY_PROMPT_VERSION }),
    }));
    expect(await classifyMessage("hello", { ...config, fetchImpl })).toMatchObject({
      decision: "REVIEW", reason_code: "CLASSIFIER_ERROR",
    });
  });

  it("returns the parsed decision on a well-formed response", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse({
        model: "ollama/llama3",
        content: JSON.stringify({
          decision: "ALLOW",
          reason_code: "OK",
          policy_version: "1.0.0",
        }),
      }),
    );

    const decision = await classifyMessage("hello there", {
      ...config,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(decision.decision).toBe("ALLOW");
    expect(decision.model).toBe("ollama/llama3");
  });

  it("sends a single system + user turn with no history", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse({
        model: "ollama/llama3",
        content: JSON.stringify({
          decision: "ALLOW",
          reason_code: "OK",
          policy_version: "1.0.0",
        }),
      }),
    );

    await classifyMessage("hello there", {
      ...config,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    const [, init] = fetchImpl.mock.calls[0];
    const requestBody = JSON.parse(init.body as string);
    expect(requestBody.messages).toHaveLength(2);
    expect(requestBody.messages[0].role).toBe("system");
    expect(requestBody.messages[1]).toEqual({
      role: "user",
      content: "hello there",
    });
    expect(requestBody.temperature).toBe(0);
  });

  it("falls back to REVIEW/CLASSIFIER_ERROR on a non-ok HTTP response", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({}, false));

    const decision = await classifyMessage("hello", {
      ...config,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(decision.decision).toBe("REVIEW");
    expect(decision.reason_code).toBe("CLASSIFIER_ERROR");
  });

  it("falls back to REVIEW/CLASSIFIER_ERROR when content is not valid JSON", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse({ model: "m1", content: "not json at all" }),
    );

    const decision = await classifyMessage("hello", {
      ...config,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(decision.decision).toBe("REVIEW");
    expect(decision.model).toBe("m1");
  });

  it("falls back to REVIEW/CLASSIFIER_ERROR when the decision fails schema validation", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse({
        model: "m1",
        content: JSON.stringify({ decision: "MAYBE", reason_code: "OK" }),
      }),
    );

    const decision = await classifyMessage("hello", {
      ...config,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(decision.decision).toBe("REVIEW");
    expect(decision.reason_code).toBe("CLASSIFIER_ERROR");
  });

  it("falls back to REVIEW/CLASSIFIER_ERROR when fetch throws (network error)", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("network down"));

    const decision = await classifyMessage("hello", {
      ...config,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(decision.decision).toBe("REVIEW");
    expect(decision.reason_code).toBe("CLASSIFIER_ERROR");
    expect(decision.model).toBe("unknown");
  });

  it("never returns ALLOW when the classifier response is untrustworthy", async () => {
    const badResponses = [
      jsonResponse({}, false),
      jsonResponse({ model: "m1", content: "garbage" }),
      jsonResponse({ model: "m1" }),
    ];

    for (const response of badResponses) {
      const fetchImpl = vi.fn().mockResolvedValue(response);
      const decision = await classifyMessage("hello", {
        ...config,
        fetchImpl: fetchImpl as unknown as typeof fetch,
      });
      expect(decision.decision).not.toBe("ALLOW");
    }
  });
});
