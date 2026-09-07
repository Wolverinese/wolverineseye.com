import ChatInterface from "@/components/ChatInterface";

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-[#8B5CF6]">\$hoX</h1>
        <p className="text-[#A1A1B5]">Governed intelligence for Webi3.</p>
      </div>
      <ChatInterface />
    </div>
  );
}
