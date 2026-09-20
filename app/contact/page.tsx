import Link from "next/link";

export default function Page() {
  return (
    <main className="stub">
      <p className="eyebrow">Wolverines Eye</p>
      <h1>Contact</h1>
      <p className="lede">Humans hold the keys. Coming soon.</p>
      <p><Link href="/">← Front door</Link></p>
    </main>
  );
}
