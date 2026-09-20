import Link from "next/link";

export default function Page() {
  return (
    <main className="stub">
      <p className="eyebrow">Wolverines Eye</p>
      <h1>Lab</h1>
      <p className="lede">Research surfaces. Coming soon.</p>
      <p><Link href="/">← Front door</Link></p>
    </main>
  );
}
