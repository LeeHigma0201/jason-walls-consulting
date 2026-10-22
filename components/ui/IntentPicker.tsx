"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { OFFERS } from "@/lib/offers";
import { Price } from "@/components/ui/Price";

export type IntentOption = {
  id: string;
  label: string;
  sub: string;
  offerId: string;
  extraLink?: { href: string; label: string };
};

// "Which of these sounds like you?" A radiogroup of cards (roving focus, arrow keys). Nothing is
// chosen at first and the result panel is not rendered. Choosing flips the card's breaker (CSS, 180ms)
// and the panel fades in (200ms). Phone: panel sits under the chosen card. 900+: cards left, panel right.
export function IntentPicker({ options }: { options: IntentOption[] }) {
  const [sel, setSel] = useState<string | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Phone: the panel opens under the chosen card, often below the fold, so bring it into view.
  useEffect(() => {
    if (!sel) return;
    if (!window.matchMedia("(max-width:899px)").matches) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRef.current?.scrollIntoView({ block: "nearest", behavior: calm ? "auto" : "smooth" });
  }, [sel]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = options.length;
    let j = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") j = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") j = (i - 1 + n) % n;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = n - 1;
    if (j < 0) return;
    e.preventDefault();
    setSel(options[j].id);
    refs.current[j]?.focus();
  };

  const tabStop = sel ? options.findIndex((o) => o.id === sel) : 0;
  const nodes: React.ReactNode[] = [];
  options.forEach((opt, i) => {
    const on = sel === opt.id;
    nodes.push(
      <button
        key={opt.id}
        ref={(el) => { refs.current[i] = el; }}
        type="button"
        role="radio"
        aria-checked={on}
        tabIndex={i === tabStop ? 0 : -1}
        className="opt"
        style={{ ["--r" as string]: i + 1 }}
        onClick={() => setSel(opt.id)}
        onKeyDown={(e) => onKey(e, i)}
      >
        <span>
          <strong>{opt.label}</strong>
          <small>{opt.sub}</small>
        </span>
        <span className="breaker" aria-hidden="true"><i /></span>
      </button>,
    );
    const offer = OFFERS.find((o) => o.id === opt.offerId);
    if (on && offer) {
      nodes.push(
        <div key={`${opt.id}-panel`} ref={panelRef} className="intent-panel" role="region" aria-label={offer.name} style={{ scrollMarginBottom: "calc(88px + env(safe-area-inset-bottom))" }}>
          <h3 className="display h3" style={{ margin: 0 }}>{offer.name}</h3>
          <p style={{ margin: 0, color: "var(--text-mid)" }}>{offer.short}</p>
          <Price o={offer} />
          <p className="kicker" style={{ margin: 0 }}>{offer.duration}</p>
          <div className="actions">
            <Link href={offer.bookHref} className="btn btn-primary" aria-label={`Ask about this one: ${offer.name}`}>Ask about this one</Link>
          </div>
          {opt.extraLink && <Link href={opt.extraLink.href} className="text-link text-link-block">{opt.extraLink.label}</Link>}
        </div>,
      );
    }
  });

  const chosen = sel ? OFFERS.find((o) => o.id === options.find((x) => x.id === sel)?.offerId) : undefined;

  return (
    <>
    <div className="intent intent-grid" role="radiogroup" aria-label="Which of these sounds like you?" style={{ ["--n" as string]: options.length }}>
      {nodes}
    </div>
    <div
      aria-live="polite"
      style={{ position: "absolute", width: 1, height: 1, margin: -1, padding: 0, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 }}
    >
      {chosen ? `${chosen.name} selected. Details are open.` : ""}
    </div>
    </>
  );
}
