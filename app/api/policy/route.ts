/**
 * POST /api/policy
 *
 * Server-side route that wraps shox's `/v1/chat` endpoint into a semantic
 * policy gate, per PHASE_1.md (Phase 1, Option 2). This is the only route
 * that should call `classifyMessage` — the rest of the app calls this route,
 * not shox directly, so the shox-wrapping detail stays isolated here and in
 * `lib/policy/client.ts`.
 */
import { NextRequest, NextResponse } from "next/server";
import { classifyMessage } from "@/lib/policy/client";
import { logPolicyDecision } from "@/lib/logging/policyLog";
import type { PolicyRequest } from "@/lib/policy/types";

export async function POST(request: NextRequest) {
  let body: PolicyRequest;
  try {
    body = (await request.json()) as PolicyRequest;
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (typeof body.message !== "string" || body.message.trim().length === 0) {
    return NextResponse.json(
      { error: "`message` is required and must be a non-empty string." },
      { status: 400 },
    );
  }

  const shoxBaseUrl = process.env.SHOX_BASE_URL;
  const shoxApiKey = process.env.SHOX_POLICY_API_KEY;
  if (!shoxBaseUrl || !shoxApiKey) {
    return NextResponse.json(
      { error: "Policy gate is not configured." },
      { status: 503 },
    );
  }

  const decision = await classifyMessage(body.message, {
    baseUrl: shoxBaseUrl,
    apiKey: shoxApiKey,
  });

  logPolicyDecision(body.message, decision);

  return NextResponse.json(decision, { status: 200 });
}
