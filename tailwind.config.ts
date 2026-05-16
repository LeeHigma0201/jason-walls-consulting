import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lab (canonical / )
        ink: "#0E0E10",
        "ink-2": "#171719",
        "ink-3": "#22222a",
        "lab-text": "#e8e6e0",
        "lab-mid": "#88857c",
        signal: "#39FF6A",
        amber: "#F0A800",
        rule: "#2a2a32",
        // Receipts (/trades)
        "paper": "#F5F1E8",
        "paper-2": "#ede7d4",
        "paper-rule": "#d8cfb8",
        "ink-warm": "#1a1612",
        "ink-warm-mid": "#4a4540",
        stamp: "#10b981",
        // Workshop (/story)
        "cream": "#F4EFE6",
        "cream-2": "#ebe2cf",
        "ink-edit": "#1c1a18",
        "ink-edit-mid": "#5a4f43",
        "rule-warm": "#d8ccb4",
        copper: "#A85C2A",
      },
      fontFamily: {
        mono: ['var(--font-jbm)', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['var(--font-plex)', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
        display: ['var(--font-newsreader)', 'Newsreader', 'Georgia', 'serif'],
      },
      maxWidth: {
        prose: "720px",
        reader: "860px",
        wide: "1280px",
      },
    },
  },
  plugins: [],
} satisfies Config;
