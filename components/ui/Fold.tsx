"use client";
import { useEffect, useRef, type ReactNode } from "react";

// <details> that is closed on the server and on phones, and opens itself on mount when the viewport
// is 820px or wider. After mount the visitor's own toggling is respected (no re-open on resize).
// label names what the fold belongs to for screen readers ("You get in Launch Site"), since the
// visible summary repeats on every package card.
export function Fold({ summary, label, children }: { summary: string; label?: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (ref.current && window.matchMedia("(min-width:820px)").matches) ref.current.open = true;
  }, []);
  return (
    <details ref={ref} className="fold">
      <summary>{summary}{label && <span className="sr-only"> in {label}</span>}</summary>
      {children}
    </details>
  );
}
