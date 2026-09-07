import { NextRequest, NextResponse } from "next/server";
import { checkPolicy } from "@/lib/policyCheck";
import { getSystemPrompt } from "@/lib/constitution";
import { generateOllamaResponse } from "@/lib/ollama";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    // 1. Policy check
    const policyResult = checkPolicy(message);
    if (!policyResult.allowed) {
      return NextResponse.json({
        response: policyResult.reason || "I cannot process that request.",
      });
    }

    // 2. Get constitutional system prompt
    const systemPrompt = getSystemPrompt();

    // 3. Generate response via Ollama
    const response = await generateOllamaResponse(message, systemPrompt);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
