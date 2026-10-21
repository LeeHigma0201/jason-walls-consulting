"use client";
import { useEffect, useSyncExternalStore } from "react";

// Preview-only: `?look=blueprint|paper|shop` switches the token set so Jason can pick on his phone,
// and `?pick` shows the picker. The choice is remembered in localStorage. Remove once a look is chosen.
const LOOKS = ["blueprint", "paper", "shop"] as const;
type Look = (typeof LOOKS)[number];
const isLook = (v: unknown): v is Look => typeof v === "string" && (LOOKS as readonly string[]).includes(v);

const subs = new Set<() => void>();
const subscribe = (cb: () => void) => { subs.add(cb); return () => { subs.delete(cb); }; };
const emit = () => subs.forEach((f) => f());

function getLook(): Look {
  try {
    const q = new URLSearchParams(window.location.search).get("look");
    if (isLook(q)) { localStorage.setItem("look", q); return q; }
    const s = localStorage.getItem("look");
    return isLook(s) ? s : "blueprint";
  } catch { return "blueprint"; }
}
function getShow(): boolean {
  try {
    if (new URLSearchParams(window.location.search).has("pick")) localStorage.setItem("pick", "1");
    return localStorage.getItem("pick") === "1";
  } catch { return false; }
}
function applyLook(l: Look) { document.documentElement.dataset.look = l; }
function choose(l: Look) { try { localStorage.setItem("look", l); } catch {} emit(); }

export function LookPicker() {
  const look = useSyncExternalStore(subscribe, getLook, () => "blueprint" as Look);
  const show = useSyncExternalStore(subscribe, getShow, () => false);
  useEffect(() => { applyLook(look); }, [look]);

  if (!show) return null;
  return (
    <div role="group" aria-label="Preview look" style={{ position: "fixed", top: 68, right: 12, zIndex: 50, display: "flex", gap: 6, background: "var(--surface)", border: "1px solid var(--rule)", padding: 6, borderRadius: 999, boxShadow: "var(--shadow)" }}>
      {LOOKS.map((l) => (
        <button key={l} onClick={() => choose(l)} className="mono" aria-pressed={look === l}
          style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 10px", borderRadius: 999, border: "1px solid transparent", cursor: "pointer",
            background: look === l ? "var(--accent)" : "transparent", color: look === l ? "var(--accent-ink)" : "var(--text-mid)" }}>
          {l}
        </button>
      ))}
    </div>
  );
}
