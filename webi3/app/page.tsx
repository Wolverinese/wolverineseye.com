import Link from "next/link";

export default function Home() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-4xl font-bold md:text-6xl">
        The brain is online.
      </h1>
      <p className="mt-4 text-xl text-[#A1A1B5]">
        Intelligence for creators & builders.
      </p>
      <Link
        href="/chat"
        className="mt-8 rounded-full bg-[#8B5CF6] px-8 py-4 text-lg font-medium text-white shadow-[0_0_30px_rgba(139,92,246,0.3)] transition hover:bg-[#7C3AED]"
      >
        Launch \$hoX →
      </Link>
    </section>
  );
}
