import Link from "next/link";

const doors = [
  { href: "/music", label: "Music", blurb: "Wolverines Music — sound and release culture." },
  { href: "/art", label: "Art", blurb: "Visual works and restrained marks." },
  { href: "/philosophy", label: "Philosophy", blurb: "WOS covenant — identity before scale." },
  { href: "/archive", label: "Archive", blurb: "Memory kept inspectable." },
  { href: "/webi3", label: "Webi3", blurb: "Company OS / Quantum Lab door." },
  { href: "/lab", label: "Lab", blurb: "Research surfaces — evidence over hype." },
  { href: "/about", label: "About", blurb: "The story, held in stewardship." },
  { href: "/contact", label: "Contact", blurb: "The next door — humans hold the keys." },
] as const;

const stack = [
  { name: "Wolverines Eye", role: "Culture & IP" },
  { name: "Webi3", role: "Company OS · Quantum Lab NZ" },
  { name: "ShoX ($hoX)", role: "Governed intelligence" },
  { name: "ibCode", role: "Builder layer · since 1983" },
] as const;

export default function Home() {
  return (
    <main className="site">
      <header className="top">
        <p className="mark">Wolverines Eye</p>
        <nav aria-label="Primary">
          {doors.slice(0, 4).map((d) => (
            <Link key={d.href} href={d.href}>
              {d.label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">Canonical front door</p>
        <h1>WolverinesEye.com</h1>
        <p className="lede">
          The culture and IP door of the Wolverines Eye ecosystem — identity over
          trends, stewardship over spectacle, technology in service of creativity.
        </p>
      </section>

      <section className="stack" aria-labelledby="stack-title">
        <h2 id="stack-title">Ecosystem map</h2>
        <ul>
          {stack.map((s) => (
            <li key={s.name}>
              <strong>{s.name}</strong>
              <span>{s.role}</span>
            </li>
          ))}
        </ul>
        <p className="note">
          Product and host spellings stay separate. Humans hold signing authority.
          Checksums are not signatures.
        </p>
      </section>

      <section className="doors" aria-labelledby="doors-title">
        <h2 id="doors-title">Doors</h2>
        <div className="grid">
          {doors.map((d) => (
            <Link key={d.href} href={d.href} className="card">
              <h3>{d.label}</h3>
              <p>{d.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mantras" aria-label="WOS mantras">
        <p>CODE AS LAW</p>
        <p>TRUST BY DESIGN</p>
        <p>EVERY ACTION LOGGED</p>
        <p>EVERY DECISION VERIFIED</p>
      </section>

      <footer className="foot">
        <p>
          Wolverines Eye Limited · Aotearoa New Zealand · Stewardship outlives
          ownership.
        </p>
        <p className="quiet">
          Experimental policy gate lives server-side — not a claim of Gate close.
        </p>
      </footer>
    </main>
  );
}
