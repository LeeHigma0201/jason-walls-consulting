"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// The old blueprint / paper / shop looks and the picker UI are gone: direction A is the site default
// and needs no data-look. This now only switches the token set for the two preview routes that still
// carry their own: /v/b and /v/c. /v/a and everything else use :root.
export function LookPicker() {
  const path = usePathname();
  const dir = /^\/v\/(b|c)(\/|$)/.exec(path ?? "")?.[1];
  useEffect(() => {
    const el = document.documentElement;
    if (dir) el.dataset.look = `dir-${dir}`;
    else delete el.dataset.look;
  }, [dir]);
  return null;
}
