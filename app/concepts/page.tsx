"use client";

// /concepts — what Jason actually builds with.
// Obsidian-style knowledge graph (force-directed, glowing nodes).
// CSS 3D rotating concept stack. Concept catalog.
// Lab theme (canonical). All concepts publicly known — no private contacts.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MissionFooter } from "@/components/MissionFooter";

type Node = {
  id: string;
  label: string;
  x: number; // % of viewBox 0-100
  y: number;
  size: number; // 4-12
  group: "person" | "product" | "skill" | "proof" | "credential";
};

type Edge = { from: string; to: string };

// Real proof + real concepts. No private contacts.
const NODES: Node[] = [
  { id: "jw", label: "Jason Walls", x: 50, y: 50, size: 12, group: "person" },
  // Products
  { id: "cr", label: "ChargeRight", x: 28, y: 28, size: 9, group: "product" },
  { id: "zw", label: "ZombieWells", x: 22, y: 60, size: 7, group: "product" },
  { id: "rs", label: "RightSuite", x: 32, y: 80, size: 6, group: "product" },
  { id: "lf", label: "Lennox Fields", x: 16, y: 42, size: 6, group: "product" },
  // Proof
  { id: "anth", label: "Anthropic case study", x: 76, y: 22, size: 8, group: "proof" },
  { id: "cuban", label: "Cuban repost", x: 82, y: 38, size: 7, group: "proof" },
  { id: "st", label: "Sunday Times", x: 78, y: 56, size: 7, group: "proof" },
  { id: "shark", label: "Shark Tank", x: 70, y: 72, size: 6, group: "proof" },
  { id: "views", label: "680K views · 97 days", x: 64, y: 18, size: 6, group: "proof" },
  // Skills / concepts
  { id: "skills", label: "Claude skills", x: 50, y: 14, size: 7, group: "skill" },
  { id: "agents", label: "Agent SDK", x: 38, y: 16, size: 6, group: "skill" },
  { id: "mcp", label: "MCP servers", x: 62, y: 86, size: 6, group: "skill" },
  { id: "jsonld", label: "JSON-LD schema", x: 88, y: 70, size: 5, group: "skill" },
  { id: "kg", label: "Knowledge graphs", x: 86, y: 84, size: 6, group: "skill" },
  { id: "ed", label: "Eval-driven dev", x: 14, y: 78, size: 5, group: "skill" },
  { id: "comp", label: "Computer use", x: 46, y: 88, size: 5, group: "skill" },
  // Credentials
  { id: "ibew", label: "IBEW Local 369", x: 14, y: 18, size: 6, group: "credential" },
  { id: "me", label: "Master Electrician", x: 8, y: 30, size: 6, group: "credential" },
  { id: "nec", label: "NEC 220.82", x: 10, y: 56, size: 4, group: "credential" },
];

const EDGES: Edge[] = [
  // Person to all
  { from: "jw", to: "cr" }, { from: "jw", to: "zw" }, { from: "jw", to: "rs" },
  { from: "jw", to: "lf" }, { from: "jw", to: "anth" }, { from: "jw", to: "cuban" },
  { from: "jw", to: "st" }, { from: "jw", to: "shark" }, { from: "jw", to: "skills" },
  { from: "jw", to: "agents" }, { from: "jw", to: "mcp" }, { from: "jw", to: "jsonld" },
  { from: "jw", to: "kg" }, { from: "jw", to: "ed" }, { from: "jw", to: "comp" },
  { from: "jw", to: "ibew" }, { from: "jw", to: "me" }, { from: "jw", to: "nec" },
  { from: "jw", to: "views" },
  // Product cross-links
  { from: "cr", to: "anth" }, { from: "cr", to: "cuban" }, { from: "cr", to: "st" },
  { from: "cr", to: "shark" }, { from: "cr", to: "views" }, { from: "cr", to: "ibew" },
  { from: "cr", to: "nec" }, { from: "cr", to: "skills" },
  { from: "zw", to: "anth" }, { from: "zw", to: "kg" },
  { from: "rs", to: "skills" }, { from: "rs", to: "agents" },
  { from: "lf", to: "comp" }, { from: "lf", to: "jsonld" },
  // Skill clusters
  { from: "skills", to: "agents" }, { from: "skills", to: "mcp" },
  { from: "agents", to: "comp" }, { from: "kg", to: "jsonld" },
  { from: "ed", to: "skills" }, { from: "mcp", to: "jsonld" },
  // Credential cluster
  { from: "ibew", to: "me" }, { from: "me", to: "nec" }, { from: "ibew", to: "nec" },
];

const GROUP_COLOR: Record<Node["group"], string> = {
  person: "#39FF6A",
  product: "#F0A800",
  proof: "#A78BFA",
  skill: "#60E5DB",
  credential: "#F87171",
};

const CONCEPT_CARDS = [
  { title: "Claude Skills", body: "Reusable bundles of instructions, tools, and context that turn Claude into a domain expert. I write and ship them daily — the AI Workflow in a Week tier ships you one." },
  { title: "Agent SDK", body: "Multi-agent orchestrators with shared filesystem memory. Used by Anthropic for agents that survive across sessions. I build these for clients who need work to compound." },
  { title: "MCP Servers", body: "Model Context Protocol — how Claude talks to external systems (Stripe, Gmail, your database). I write MCP servers and integrate existing ones." },
  { title: "Knowledge Graphs", body: "Force-directed graphs of products, people, skills, and edges. My own one (Cortex) has 232 nodes and 1,489 edges. Powers the agents that run my businesses." },
  { title: "JSON-LD + AEO", body: "Structured data that gets you cited by ChatGPT, Perplexity, and Claude. Schema layering yields ~4.2x higher AI citation rate. Shipped on this site." },
  { title: "Eval-Driven Dev", body: "Test your agent against a benchmark before shipping. Same logic as TDD, applied to AI behavior. Cuts hallucination, accelerates iteration." },
  { title: "Computer Use", body: "Claude controlling apps on your machine — Chrome, Mail, Slack, native apps. I build automation flows that run while you sleep." },
  { title: "Cortex (my own)", body: "232-node knowledge graph at ~/cortex/. Tracks every product, person, skill, and revenue loop. Auto-heals weekly. The brain that runs the practice." },
];

export default function ConceptsPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stackRef = useRef<HTMLDivElement | null>(null);

  // Subtle parallax tilt on the 3D stack — follows mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!stackRef.current) return;
      const r = stackRef.current.getBoundingClientRect();
      const mx = (e.clientX - r.left - r.width / 2) / r.width;
      const my = (e.clientY - r.top - r.height / 2) / r.height;
      if (Math.abs(mx) < 0.6 && Math.abs(my) < 0.6) {
        setTilt({ x: my * -8, y: mx * 12 });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div data-theme="lab">
      <main style={{ position: "relative", zIndex: 1 }}>
        {/* status bar same as Lab home for continuity */}
        <div className="status-bar">
          <span><span className="dot" /><span className="accent">on the wire</span></span>
          <span>concepts: <span className="accent">8 live</span></span>
          <span>graph: <span className="accent">232 nodes · 1,489 edges</span></span>
          <span>last build: <span className="accent">2026-05-09</span></span>
          <span className="ml">
            <Link href="/" style={{ color: "var(--text)", borderBottom: "1px dotted var(--text-mid)", textDecoration: "none" }}>
              ← lab home
            </Link>
          </span>
        </div>

        {/* HERO */}
        <section className="hero">
          <p className="kicker">// concepts</p>
          <h1 className="h-title">
            The <b>graph</b><br />that runs<br />the brain.
          </h1>
          <p className="lede">
            Most AI consultants will sell you a workflow. I'll show you the whole graph
            it lives inside — products, people, skills, edges, the way the work
            connects. This is mine. <em>Yours can look like this too.</em>
          </p>
        </section>

        {/* OBSIDIAN-STYLE GRAPH */}
        <section className="graph-section">
          <div className="graph-frame" aria-label="Knowledge graph visualization">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="graph-svg">
              <defs>
                <radialGradient id="bg-glow">
                  <stop offset="0%" stopColor="rgba(57,255,106,0.06)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="0.6" />
                </filter>
              </defs>
              <rect width="100" height="100" fill="url(#bg-glow)" />
              {/* edges */}
              <g stroke="rgba(232,230,224,0.10)" strokeWidth="0.08" fill="none">
                {EDGES.map((e, i) => {
                  const a = NODES.find((n) => n.id === e.from);
                  const b = NODES.find((n) => n.id === e.to);
                  if (!a || !b) return null;
                  const active = hovered && (e.from === hovered || e.to === hovered);
                  return (
                    <line
                      key={i}
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke={active ? GROUP_COLOR[a.group] : "rgba(232,230,224,0.10)"}
                      strokeWidth={active ? 0.16 : 0.08}
                      style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                    />
                  );
                })}
              </g>
              {/* nodes */}
              <g>
                {NODES.map((n) => {
                  const active = hovered === n.id;
                  return (
                    <g
                      key={n.id}
                      onMouseEnter={() => setHovered(n.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ cursor: "pointer" }}
                    >
                      <circle
                        cx={n.x} cy={n.y}
                        r={n.size / 4 + (active ? 0.4 : 0)}
                        fill={GROUP_COLOR[n.group]}
                        opacity={hovered && !active ? 0.35 : 0.9}
                        filter="url(#node-glow)"
                        style={{ transition: "opacity 0.3s, r 0.3s" }}
                      />
                      <circle
                        cx={n.x} cy={n.y}
                        r={n.size / 4 - 0.2}
                        fill={GROUP_COLOR[n.group]}
                        opacity={hovered && !active ? 0.4 : 1}
                        style={{ transition: "opacity 0.3s" }}
                      />
                    </g>
                  );
                })}
              </g>
            </svg>
            {/* labels overlay */}
            <div className="graph-labels">
              {NODES.map((n) => {
                const active = hovered === n.id;
                return (
                  <div
                    key={n.id}
                    className="graph-label"
                    style={{
                      left: n.x + "%",
                      top: n.y + "%",
                      color: GROUP_COLOR[n.group],
                      opacity: active ? 1 : hovered ? 0.2 : (n.size > 6 ? 0.85 : 0.5),
                      fontWeight: n.id === "jw" ? 700 : 500,
                      fontSize: n.size > 8 ? 13 : n.size > 5 ? 11 : 10,
                    }}
                  >
                    {n.label}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="graph-legend">
            <Legend color={GROUP_COLOR.person} label="person" />
            <Legend color={GROUP_COLOR.product} label="product" />
            <Legend color={GROUP_COLOR.proof} label="proof" />
            <Legend color={GROUP_COLOR.skill} label="skill" />
            <Legend color={GROUP_COLOR.credential} label="credential" />
            <span className="legend-meta">hover any node · 232 in my actual graph · 1,489 edges</span>
          </div>
        </section>

        {/* 3D CONCEPT STACK */}
        <section className="stack-section">
          <p className="kicker">// 3d · the concepts I build with</p>
          <h2 className="h2">
            Move your mouse. <b>The stack listens.</b>
          </h2>
          <div className="stack-stage" ref={stackRef}>
            <div
              className="stack"
              style={{
                transform: `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              {CONCEPT_CARDS.map((c, i) => (
                <div
                  key={c.title}
                  className="stack-card"
                  style={{
                    transform: `translateZ(${(i - CONCEPT_CARDS.length / 2) * 28}px) translateX(${(i - CONCEPT_CARDS.length / 2) * 18}px) translateY(${(i - CONCEPT_CARDS.length / 2) * 6}px) rotateZ(${(i - CONCEPT_CARDS.length / 2) * 1.5}deg)`,
                    zIndex: i,
                  }}
                >
                  <div className="stack-num">0{i + 1}</div>
                  <div className="stack-title">{c.title}</div>
                  <div className="stack-body">{c.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONCEPT CATALOG */}
        <section className="catalog">
          <p className="kicker">// concept catalog</p>
          <h2 className="h2">Pick one. <b>I'll build with it.</b></h2>
          <div className="catalog-grid">
            {CONCEPT_CARDS.map((c, i) => (
              <article key={c.title} className="cat-card">
                <div className="cat-num">0{i + 1}</div>
                <h3 className="cat-title">{c.title}</h3>
                <p className="cat-body">{c.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <MissionFooter activeId="lab" />

      <style jsx>{`
        .status-bar { display: flex; gap: 20px; padding: 14px 32px; border-bottom: 1px solid var(--rule); font-family: var(--font-jbm), monospace; font-size: 11px; color: var(--text-mid); flex-wrap: wrap; align-items: center; }
        .ml { margin-left: auto; }
        .dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--signal); margin-right: 8px; vertical-align: middle; box-shadow: 0 0 8px var(--signal); animation: pulse 2s infinite; }
        .accent { color: var(--text); }

        .hero { padding: 96px 32px 48px; max-width: 1100px; margin: 0 auto; }
        .kicker { font-family: var(--font-jbm), monospace; font-size: 11px; color: var(--signal); letter-spacing: 0.16em; margin-bottom: 22px; }
        .h-title { font-family: var(--font-jbm), monospace; font-weight: 200; font-size: clamp(40px, 5.5vw, 72px); letter-spacing: -0.02em; line-height: 1.04; color: var(--text); margin: 0 0 28px; }
        .h-title b { font-weight: 700; color: var(--signal); }
        .lede { font-family: var(--font-plex), sans-serif; font-size: 19px; line-height: 1.55; max-width: 640px; color: var(--text-mid); }
        .lede em { color: var(--text); font-style: italic; }

        .graph-section { padding: 32px 32px 96px; max-width: 1280px; margin: 0 auto; }
        .graph-frame { position: relative; aspect-ratio: 16 / 10; background: var(--surface); border: 1px solid var(--rule); border-radius: 4px; overflow: hidden; box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.5); }
        .graph-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .graph-labels { position: absolute; inset: 0; pointer-events: none; }
        .graph-label { position: absolute; transform: translate(8px, -50%); font-family: var(--font-jbm), monospace; white-space: nowrap; transition: opacity 0.3s; pointer-events: none; }
        .graph-legend { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 24px; padding: 0 8px; font-family: var(--font-jbm), monospace; font-size: 11px; color: var(--text-mid); align-items: center; }
        .legend-meta { margin-left: auto; opacity: 0.6; }

        .stack-section { padding: 96px 32px 48px; max-width: 1280px; margin: 0 auto; }
        .h2 { font-family: var(--font-jbm), monospace; font-weight: 200; font-size: clamp(28px, 3.5vw, 44px); letter-spacing: -0.02em; line-height: 1.1; color: var(--text); margin: 14px 0 56px; }
        .h2 b { font-weight: 700; }
        .stack-stage { perspective: 1400px; height: 520px; display: flex; align-items: center; justify-content: center; padding: 24px; }
        .stack { position: relative; width: 360px; height: 460px; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .stack-card { position: absolute; inset: 0; background: var(--surface); border: 1px solid var(--rule); padding: 32px 28px; box-shadow: 0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04); border-radius: 4px; }
        .stack-card:nth-child(odd) { border-left: 2px solid var(--signal); }
        .stack-card:nth-child(even) { border-left: 2px solid var(--amber); }
        .stack-num { font-family: var(--font-jbm), monospace; font-size: 11px; color: var(--text-mid); letter-spacing: 0.18em; margin-bottom: 18px; }
        .stack-title { font-family: var(--font-jbm), monospace; font-weight: 700; font-size: 22px; color: var(--text); margin-bottom: 14px; line-height: 1.15; }
        .stack-body { font-family: var(--font-plex), sans-serif; font-size: 14px; line-height: 1.55; color: var(--text-mid); }

        .catalog { padding: 80px 32px 96px; max-width: 1280px; margin: 0 auto; }
        .catalog-grid { display: grid; grid-template-columns: 1fr; gap: 1px; background: var(--rule); border: 1px solid var(--rule); }
        @media (min-width: 760px) { .catalog-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1080px) { .catalog-grid { grid-template-columns: 1fr 1fr 1fr 1fr; } }
        .cat-card { background: var(--surface); padding: 28px 24px; transition: background 0.2s; }
        .cat-card:hover { background: var(--surface-2); }
        .cat-num { font-family: var(--font-jbm), monospace; font-size: 10px; color: var(--signal); letter-spacing: 0.22em; margin-bottom: 14px; }
        .cat-title { font-family: var(--font-jbm), monospace; font-weight: 700; font-size: 17px; color: var(--text); margin: 0 0 12px; }
        .cat-body { font-family: var(--font-plex), sans-serif; font-size: 13px; line-height: 1.55; color: var(--text-mid); margin: 0; }

        @media (max-width: 700px) {
          .stack-stage { height: 420px; }
          .stack { width: 88%; height: 380px; }
          .stack-card { padding: 22px 20px; }
        }
      `}</style>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: color, boxShadow: `0 0 6px ${color}` }} />
      {label}
    </span>
  );
}
