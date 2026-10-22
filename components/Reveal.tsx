"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Adds .in to each .sr element once, as it enters the viewport. CSS only hides .sr under html.js
// (set by the inline script in layout), and layout's script adds html.sr-off if this never mounts,
// so a script failure hides nothing. Under prefers-reduced-motion the CSS shows everything anyway.
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.setAttribute("data-reveal", "on");
    const els = Array.from(document.querySelectorAll<HTMLElement>(".sr:not(.in)"));
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  return null;
}
