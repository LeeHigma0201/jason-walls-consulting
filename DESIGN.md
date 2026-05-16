# DESIGN.md — Jason Walls Consulting

> Single source of truth for visual identity. Read before every UI change. Update after every UI session. Do not deviate without explicit direction.

## Brand Identity

- **Personality**: Trade-credible, peer-to-peer, work-zone-honest. No agency-luxury.
- **Tone**: Plain English. The same way a Master Electrician explains a panel calc to an apprentice — confident, specific, no jargon for jargon's sake.
- **Positioning**: AI for the trades, built by an IBEW Master Electrician. Fixed-fee. Pay for the build, not the build time.
- **Audience**: Tradespeople — electricians, plumbers, HVAC, contractors, fleet operators, small construction. Skeptical of consultants. Loyal once won. Time-poor. Pride in the craft.
- **Design POV**: A tradesperson's tool wall, beautifully typeset. The opposite of Mercedes-Benz polish. Earned, not bought.

## Mission Gate (must pass on every change)

1. Does this widen access to expertise, or narrow it? → if narrow, kill it.
2. Does this sound like one of us, or one of them? → if "them," rewrite peer.

## Color System

### Tokens (live in `app/globals.css` under `[data-theme="lab"]` — used by `/` and `/concepts`)

| Token | Value | Usage | Contrast on bg |
|-------|-------|-------|----------------|
| `--bg` | `#0E0E10` | Page background | — |
| `--surface` | `#171719` | Cards, demo panels | — |
| `--surface-2` | `#22222a` | Section dividers, code editors | — |
| `--text` | `#e8e6e0` | Primary body text | 14.7:1 ✓ AAA |
| `--text-mid` | `#88857c` | Secondary text, captions | 5.1:1 ✓ AA |
| `--rule` | `#2a2a32` | Dividers, card borders | — |
| `--amber` | `#F0A800` | **Primary CTA, featured pricing, accents** (60-30-10 the "10") | 9.2:1 ✓ AAA |
| `--signal` | `#39FF6A` | **Status indicators only** — "live", "available", "shipped" | — |
| `--paper` | `#f4f2ee` | Inverted card surfaces (light cards on dark) | — |

### 60-30-10 distribution
- **60%** ink (`#0E0E10`) — page bg
- **30%** surface (`#171719`–`#22222a`) — cards, panels, dividers
- **10%** amber (`#F0A800`) — CTAs, hover states, featured tier, key data

### Why amber over green (changed 2026-05-09)
- Green = tech-startup signal; amber = work-zone safety signal. Tradespeople instantly read amber as "active job site."
- Reserved green for status/availability only — small dot, low chroma, never as a major UI accent.

## Typography

| Role | Font | Weight | Size | Line Height | Letter Spacing |
|------|------|--------|------|-------------|----------------|
| Display H1 | JetBrains Mono | 200 | clamp(40px, 5.5vw, 72px) | 1.04 | -0.02em |
| Display H2 | JetBrains Mono | 200 / b 700 | clamp(28px, 3.5vw, 44px) | 1.1 | -0.02em |
| H3 (card title) | JetBrains Mono | 700 | 17–22px | 1.2 | normal |
| Body lede | IBM Plex Sans | 300 | 19px | 1.55 | normal |
| Body | IBM Plex Sans | 400 | 15–17px | 1.55 | normal |
| Kicker / caption | JetBrains Mono | 400 | 11px | 1.4 | 0.16–0.22em |
| Numerals / specs | JetBrains Mono | 200 / 700 | 24–48px | 1 | -0.02em |
| Tier price | JetBrains Mono | 200 | 36px | 1 | -0.02em |

**Pairing rationale:** JetBrains Mono headlines = "blueprint specs" reading. IBM Plex Sans body = clean technical reading. Both explicitly endorsed by Anthropic Frontend Aesthetics Cookbook (2026). NOT Inter, NOT Roboto, NOT Space Grotesk (all flagged as overused).

**Weight contrast rule:** Use 200 vs 700 (not 400 vs 600). 3× size jumps minimum.

## Spacing

- Grid base: **4px**
- Section padding pattern: 80–96px vertical between sections (alternating 64 → 96 → 64 for rhythm where useful)
- Card internal padding: 28–32px
- Container max width: 1280px (wide), 760px (prose), 1100px (hero)

## Shadows

| Level | Value | Used On |
|-------|-------|---------|
| Whisper | `0 1px 0 rgba(255,255,255,0.04)` inset | Cards at rest |
| Soft | `0 12px 32px rgba(0,0,0,0.4)` | Cards on hover, dropdowns |
| Lifted | `0 24px 48px rgba(0,0,0,0.5)` | Demo panels, featured pricing |

Dark theme reduces shadow opacity from 0.08–0.12 light to 0.4–0.5 dark — depth comes from contrast against ink, not blur.

## Component Defaults

| Element | Border Radius | Shadow | Padding | Notes |
|---------|--------------|--------|---------|-------|
| Button (primary) | 0px | none | 14px 22px | Amber bg, ink text. Mono 13px 500. |
| Button (ghost) | 0px | none | 14px 22px | Transparent, ink-2 border, mono. |
| Card | 4px or 0 | Whisper | 28–32px | 1px rule border. |
| Tier card (featured) | 4px | Lifted (amber-tinted) | 28px | scale(1.02), amber border. |
| Status pill | 999px | none | 4px 10px | Mono 10px, all-caps optional. |
| Section divider | — | — | — | 1px var(--rule), no decoration. |

## Animation

- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` — premium-feeling ease-out
- **Hover duration**: 200ms
- **Page transition**: 300–500ms
- **Hero load**: ONE orchestrated stagger reveal (cookbook rule). 60ms × index, cap at 400ms total. No scattered micro-interactions.
- **Status dot pulse**: 2s infinite, opacity 1↔0.5
- **`prefers-reduced-motion`**: ALL animation disabled. Instant state changes only.

## Layout DNA

- **Hero**: Editorial Split (60/40 text/visual). Asymmetric. Visual side carries the demo proof.
- **Pain section**: Stacked Narrative — single column, generous spacing between bullet lines. Each line is screenshot-friendly (TikTok-clip-able by design).
- **What I build**: Bento Grid — 4 cards, 2×2 on desktop, 1-col on mobile.
- **Pricing**: 4 equal columns desktop, 1-col mobile. ONE featured card (Von Restorff: scale 1.02 + amber border).
- **Proof**: Stacked Narrative — receipts of work.
- **Mission**: Stacked Narrative — quote treatment, generous trim.

## Texture & Atmosphere

- Subtle radial gradients in bg: `rgba(240,168,0,0.04)` top-left, `rgba(57,255,106,0.03)` bottom-right.
- Inner-shadow card edges (`inset 0 1px 0 rgba(255,255,255,0.04)`) for "lit from above" effect.
- No noise grain (would muddy the work-zone feel).
- No glassmorphism (too "tech-startup").

## Brand Anti-Patterns (Mission-gate enforcement)

These violate THIS brand specifically — even if generic design said they'd work elsewhere.

- **No purple/violet anywhere.** That's tech-startup signal. Pure ink + amber.
- **No "scale," "transform," "10x," "leverage" copy.** Consultant-speak — fails the "one of us" gate.
- **No stock office photography.** No suits, glass desks, lifestyle shots. If photography is added, it must be real worksite, real tools, real prints.
- **No Inter, Roboto, Arial, system-font headlines.** Per design-philosophy + Anthropic cookbook.
- **No green as primary accent.** Reserved for status only.
- **No Mark Cuban / Anthropic / Sunday Times above the fold.** Press is a credential, not the pitch. Per `feedback_no_cuban_in_copy.md`.
- **No Mark Cuban Foundation reference.** Held silently per `project_jason_walls_consulting_mcf_private.md` until Jason approves.
- **No "AI for everyone" / abstract industry language.** Always specific: electricians, plumbers, HVAC, contractors. Or `prints / takeoffs / NEC / apprentices / dispatch`.
- **No 3-column SaaS feature grid.** Bento or editorial only.
- **No light mode.** Trade-zone is dark. Light mode reads as office software.

## Distribution-Friendly Design (added 2026-05-09)

The site doubles as TikTok / YouTube content. Design with that in mind:

- Each pain bullet is its own visual selector that screenshots cleanly to 1080×1350.
- Pricing cards screenshot cleanly individually.
- Mission paragraph stands alone as a quotable block.
- Hero video is the canonical 9:16 demo asset (when recorded).
- Wordmark ("AI for the trades · IBEW Local 369") works as a TikTok overlay.

## Design Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-09 | Promote amber to primary, demote green to status-only | Trade audience signal: amber = work-zone, green = tech-startup |
| 2026-05-09 | Drop typewriter on hero | Gimmicky for trade audience; reserved for tech buyers (now in /lab) |
| 2026-05-09 | Replace 3D code panel with prints-to-AI workflow visual | Trade buyers don't relate to code editor; they relate to prints |
| 2026-05-09 | Add explicit "you" pain section | Tradespeople need to feel seen in literal day-to-day terms before they trust pitch |
| 2026-05-09 | Same 4-tier pricing, retitled deliverables | Pricing model unchanged (it works); framing trade-specific |
| 2026-05-09 | Move original tech-buyer Lab to `/lab` | Preserve asset for technical buyers who arrive via tech channels; not the front door |
| 2026-05-09 | Replace homepage entirely with premium editorial theme (`[data-theme="home"]`) | "Cheap and SaaS" feedback. Dark+amber palette read as trade-vendor not premium. Refactored to cream paper + warm ink + clay accent (Anthropic-Claude inspired) + Fraunces variable serif display + Apple-grade typographic discipline + RightSuite professional bones. The Mission still passes — feels EARNED-expensive, not luxury-exclusive. |
| 2026-05-09 | Promote Fraunces to display, demote JetBrains Mono to spec/numerals only | Fraunces variable axes (opsz, SOFT) gives Apple-grade kerning at display sizes. Mono everywhere reads "tech bro." Serif at scale reads "premium editorial." |
| 2026-05-09 | Single signature accent: clay `#CC785C` | Anthropic's brand color. Warm, confident, signals "considered" not "tech." Reserves teal `#0D6963` for data-only. |
| 2026-05-09 | Hero: editorial center-aligned with single big visual below | Apple pattern. ONE confident moment per scroll-screen. Generous whitespace. |
| 2026-05-09 | Apple-style sticky nav: transparent → solid+blur on scroll | `backdrop-filter: saturate(180%) blur(20px)` once `scrollY > 24`. Premium feel, not utilitarian. |
| 2026-05-10 | Broaden ICP from "AI for trades" to "trades + SMB + dealer groups + founders" | Verified demand check (sourced in chat): trades pay $99-$299/mo for software, not $25K lump sums. The $25K-MVP market is real but lives in tech-founder / dealer-group / SMB-owner segments. Keeping Strategy Hour at $300 for access. |
| 2026-05-10 | Add 2 ongoing tiers (Tool + Tune-up $299/mo, Embedded Builder $4K/mo) | Matches how trades actually buy software (subscription model — see BuildOps, ServiceTitan, Fixlify). Captures recurring revenue. Sourced from 2026 trade-software pricing data. |
| 2026-05-10 | "Starts at" language on upper tiers + "Scope it out" CTA | Confidence-protection for Jason. Site does the asking, not him. Buyer always gets a discovery call before any number is committed — scope first, quote after. |
| 2026-05-10 | Replace 4 AI-only deliverables with 4 capability buckets (Websites / iOS / AI / Agent infrastructure) | His real portfolio is broader: ChargeRight (web+iOS), Lennox Fields (web), ZombieWells (web), Cortex (agent infra), 50+ skills (AI). Site now reflects the verified portfolio. |
| 2026-05-10 | Add Lennox Fields + Cortex to "Receipts" proof section | Both are verified-live and verifiable on disk. Strengthens the proof beyond just ChargeRight. |
