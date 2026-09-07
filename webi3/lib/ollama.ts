export interface OllamaRequest {
  model: string;
  prompt: string;
  system?: string;
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
  };
}

export interface OllamaResponse {
  response: string;
  done: boolean;
}

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const DEFAULT_MODEL = process.env.OLLAMA_MODEL || "llama3.2:3b";

export async function generateOllamaResponse(
  userMessage: string,
  systemPrompt: string,
  model: string = DEFAULT_MODEL,
): Promise<string> {
  const url = `${OLLAMA_BASE_URL}/api/generate`;

  const payload: OllamaRequest = {
    model,
    prompt: userMessage,
    system: systemPrompt,
    stream: false,
    options: {
      temperature: 0.7,
      top_p: 0.9,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Ollama returned ${response.status}: ${response.statusText}`);
  }

  const data: OllamaResponse = await response.json();
  return data.response;
}
