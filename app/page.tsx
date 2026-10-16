import Link from "next/link";

const principles = [
  ["01", "Identity over trends"],
  ["02", "Timelessness over convenience"],
  ["03", "Luxury through restraint"],
  ["04", "Story before aesthetics"],
  ["05", "Consistency compounds"],
  ["06", "Technology serves creativity"],
  ["07", "Build for decades"],
] as const;

const atmospheres = ["Quiet confidence", "Wonder", "Presence", "Dignity", "Hope"];

const doors = [
  ["Music", "Sound as memory.", "/music"],
  ["Art", "Images with a reason to exist.", "/art"],
  ["Webi3", "The company operating layer.", "/webi3"],
  ["Archive", "What deserves to survive.", "/archive"],
] as const;

export default function Home() {
  return (
    <main className="site">
      <header className="top">
        <Link className="mark" href="/">Wolverines<span>Eye</span></Link>
        <nav aria-label="Primary"><a href="#philosophy">Philosophy</a><a href="#doors">Explore</a><a href="#archive">Archive</a></nav>
        <span className="edition">BOOK I / 0.1</span>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">A living culture &amp; IP house · Aotearoa New Zealand</p>
          <h1 id="hero-title">Make work<br /><em>that endures.</em></h1>
          <p className="lede">Wolverines is a home for music, art, technology and ideas held in trust. We make with identity, restraint and a long memory.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/philosophy">Read the philosophy <span>↗</span></Link><a className="text-link" href="#doors">Enter the house <span>↓</span></a></div>
        </div>
        <div className="hero-mark" aria-hidden="true"><span>W</span><small>THE WITNESS</small></div>
      </section>

      <section className="signal" aria-label="Wolverines statement"><p>IDENTITY</p><span>×</span><p>CRAFT</p><span>×</span><p>STEWARDSHIP</p></section>

      <section className="philosophy" id="philosophy" aria-labelledby="philosophy-title">
        <div className="section-label"><span>01</span><span>THE FOUNDATION</span></div>
        <div className="philosophy-grid"><div><h2 id="philosophy-title">A point of view<br />before a <em>point of sale.</em></h2><p className="body-copy">The wolf is never the hero; it is the witness. Every piece begins with a human centre, then earns its surface through care.</p></div><div className="principles">{principles.map(([number, text]) => <div className="principle" key={number}><span>{number}</span><strong>{text}</strong></div>)}</div></div>
      </section>

      <section className="atmosphere" aria-labelledby="atmosphere-title"><div className="section-label"><span>02</span><span>THE FEELING</span></div><div className="atmosphere-heading"><h2 id="atmosphere-title">How the work<br /><em>should feel.</em></h2><p>Five atmospheres guide the work. Not a moodboard — a standard.</p></div><div className="atmosphere-list">{atmospheres.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><i>↗</i></div>)}</div></section>

      <section className="doors" id="doors" aria-labelledby="doors-title"><div className="section-label"><span>03</span><span>THE HOUSE</span></div><div className="doors-heading"><h2 id="doors-title">Different rooms.<br /><em>One character.</em></h2><p>Move through the ecosystem. Each door opens to a different form of the same belief.</p></div><div className="door-grid">{doors.map(([label, blurb, href], index) => <Link href={href} className="door-card" key={label}><span>0{index + 1}</span><h3>{label}</h3><p>{blurb}</p><b>↗</b></Link>)}</div></section>

      <section className="archive" id="archive" aria-labelledby="archive-title"><div><p className="eyebrow">A book held in trust · Review edition 0.1</p><h2 id="archive-title">Read what<br /><em>must survive.</em></h2></div><div><p>The Philosophy is our first record of why the work exists, what it owes to people, and what should remain true when the tools change.</p><Link className="button button-light" href="/philosophy">Open Book I <span>↗</span></Link></div></section>

      <footer className="foot"><p>Wolverines Eye Limited <span>·</span> Aotearoa New Zealand</p><p>Stewardship outlives ownership.</p></footer>
    </main>
  );
}
