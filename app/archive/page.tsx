import Link from "next/link";

export default function Page() {
  return (
    <main className="stub">
      <p className="eyebrow">Wolverines Eye</p>
      <h1>Archive</h1>
      <p className="lede">Inspectable memory. Coming soon.</p>
      <p><Link href="/">← Front door</Link></p>
    </main>
  );
}
