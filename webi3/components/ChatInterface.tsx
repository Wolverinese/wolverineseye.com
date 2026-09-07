"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I'm \$hoX, the governed intelligence of Webi3. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response || "I couldn't process that." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Could not reach \$hoX." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass flex h-[60vh] flex-col p-4">
      <div className="flex-1 overflow-y-auto space-y-4 p-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.role === "user"
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-[#1A1A2E] text-[#EDEDF2]"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-[#1A1A2E] px-4 py-2 text-[#A1A1B5]">
              \$hoX is thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask \$hoX anything..."
          className="flex-1 rounded-full bg-[#1A1A2E] px-4 py-2 text-[#EDEDF2] placeholder-[#A1A1B5] outline-none ring-1 ring-[#8B5CF6]/30 focus:ring-[#8B5CF6]"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="rounded-full bg-[#8B5CF6] px-6 py-2 text-white transition hover:bg-[#7C3AED] disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
