import Link from "next/link";

const laws = [
  ["01", "Intelligence precedes embodiment", "Simulation, evaluation and supervised software operation come before physical actuation."],
  ["02", "Identity is portable but permissioned", "Identity can move between runtimes only through approved adapters and revocable access."],
  ["03", "Sovereignty requires accountability", "User control and freedom from provider lock-in never means freedom from responsibility."],
  ["04", "Culture is training data with dignity", "Auckland, Dhaka, music, language and memory are sources of meaning, not decoration."],
  ["05", "Myth and product remain distinguishable", "Story can widen the horizon. Technical claims must remain inspectable."],
] as const;

const layers = [
  ["WOS", "Philosophy, constitutional rules, classification and human authority", "WORKING DRAFT"],
  ["Webi3 Quantum Lab", "Parent architecture for AI, OS, agents, $hoX and future embodiment", "ORGANISING FRAME"],
  ["$hoX", "Governed intelligence that routes models, memory, policy and tools", "ARCHITECTURE DEFINED"],
  ["MCP / RAG / TOOLS", "Approved capabilities with provenance, scope and revocation", "CAPABILITY LAYER"],
];

export default function Home() {
  return <main className="site">
    <header className="top"><Link className="mark" href="/"><span className="mark-glyph">◆</span> $hoX</Link><span className="system-name">WOS ENGINEERING REFERENCE</span><nav aria-label="Primary"><a href="#laws">Laws</a><a href="#architecture">Architecture</a><a href="#archive">Archive</a></nav><span className="edition">WOS / 0001</span></header>

    <section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow">WOS-SHOX-0001 · CURRENT-STATE WORKING EDITION V0.3 · 6 AUGUST 2026</p><h1 id="hero-title">The Constitution<br /><em>is working.</em></h1><p className="lede">WOS is the design and governance operating system above Wolverines Eye and Webi3 Quantum Lab: a way to make identity, intelligence and culture durable without surrendering human authority.</p><div className="hero-actions"><Link className="button button-primary" href="/philosophy">Read the constitution <span>↗</span></Link><a className="text-link" href="#laws">Inspect the system <span>↓</span></a></div></div><figure className="hero-portrait"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-446A8276-0SfyO2wEErYAvtAFhXZQzQYmA7tNmo.jpeg" alt="SanMen AI in WOS-SHOX-0001 armor beneath the Wolverines Eye neon wolf" /><figcaption>01 / SANMEN AI · FOUNDING EDITION</figcaption></figure></section>

    <section className="visual-archive" aria-labelledby="visual-archive-title"><div className="section-label"><span>§ 00.1</span><span>THE EMBODIMENT STUDIES</span></div><div className="visual-heading"><h2 id="visual-archive-title">A system can be<br /><em>seen in motion.</em></h2><p>These studies give WOS a face without mistaking the face for the system. Embodiment is evidence of direction, never a substitute for governance.</p></div><div className="image-grid"><figure className="image-card image-card-wide"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-2D3B610D-po0ofzYBGAsZFUzR9gs1xHwwYUqCQt.jpeg" alt="Close portrait of SanMen AI wearing WOS-SHOX-0001 armor" /><figcaption>02 / IDENTITY · PERMISSIONED</figcaption></figure><figure className="image-card"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-284438D2-8yMzXKUP8WpOyNGLs3fS9CCcoyG2fr.jpeg" alt="SanMen AI standing in a sunlit cathedral throne room" /><figcaption>03 / THE BODY · COMING</figcaption></figure><figure className="image-card"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-BDB225CD-sdt2APySkt7uuQcfaGEn2VmE36HaM2.jpeg" alt="A blue-energy embodiment of $hoX v.1 in a dark cathedral" /><figcaption>04 / SIGNAL · IN MOTION</figcaption></figure></div></section>

    <section className="baseline" aria-label="Evidence baseline"><div><span>01</span><strong>79</strong><p>inventory items classified</p></div><div><span>02</span><strong>5</strong><p>primary constitutional laws</p></div><div><span>03</span><strong>1</strong><p>identity, many runtimes</p></div><div><span>04</span><strong>∞</strong><p>stewardship horizon</p></div></section>

    <section className="intro"><div className="section-label"><span>§ 00</span><span>THE OPERATING PRINCIPLE</span></div><div className="intro-grid"><h2>One signal.<br /><em>One system.</em><br />One awakening.</h2><p>WOS is not a visual skin and $hoX is not a personality cult. The Constitution sits above models, interfaces and vendors. It protects the meaning of the work while the tools change beneath it.</p></div></section>

    <section className="laws" id="laws" aria-labelledby="laws-title"><div className="section-label"><span>§ 01</span><span>THE INVARIANTS</span></div><div className="section-heading"><h2 id="laws-title">The Five Laws<br /><em>of $hoX.</em></h2><p>A model that repeatedly violates these laws is not $hoX, even if it uses the name, voice and interface.</p></div><div className="law-list">{laws.map(([number, title, description]) => <article className="law" key={number}><span className="law-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div><span className="law-arrow">↗</span></article>)}</div></section>

    <section className="architecture" id="architecture" aria-labelledby="architecture-title"><div className="section-label"><span>§ 02</span><span>THE STACK</span></div><div className="section-heading"><h2 id="architecture-title">WOS on top.<br /><em>Everything else below.</em></h2><p>The router chooses. MCP connects. The model reasons. The tool acts. Authority flows down; evidence flows up.</p></div><div className="layer-list">{layers.map(([name, description, status], index) => <div className="layer" key={name}><span>0{index + 1}</span><div><h3>{name}</h3><p>{description}</p></div><b>{status}</b></div>)}</div></section>

    <section className="archive" id="archive"><div><p className="eyebrow">A controlled governance copy · founder review</p><h2>The brain is online.<br /><em>The body is coming.</em></h2></div><div><p>Myth may widen the horizon. It may never falsify the ground beneath us. Explore the philosophy and constitutional record that keeps Wolverines recognisable across every room.</p><Link className="button button-light" href="/philosophy">Open Book I <span>↗</span></Link></div></section>
    <footer className="foot"><p>Wolverines Eye · Webi3 Quantum Lab · Aotearoa New Zealand</p><p>Stewardship outlives ownership.</p></footer>
  </main>;
}
