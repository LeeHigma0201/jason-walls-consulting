# PORTFOLIO-EVIDENCE.md — what Jason Walls has actually shipped, and how he works

Compiled 2026-10-21 on branch `feat/consulting-v2`. Every row is sourced to a file, a git command, a
public URL I fetched today, or the iTunes lookup API. **INFERRED** marks inference. Nothing here is a
new metric: counts are quoted from existing files or from commands listed so they can be re-run.
Rules applied: `~/dev/cr-marketing-os/claims.json` (2026-09-30) bans "Master Electrician", "220.82",
bare "$49", invented scale claims. Private folders (case file, money, journal) were not opened.

## 0. Verdict: what he can credibly sell

| Can sell today, with proof | Evidence |
|---|---|
| Web apps that take money: Next.js + Stripe + Gemini vision, live at evchargeright.com | §1.1 |
| iOS apps through App Store submission: two apps live under developer "JASON LLOYD WALLS" | §1.1, §1.2 |
| Public-interest / data sites built fast: zombiewells.com (live), the Evolve KY talk deck (live) | §1.3, §1.7 |
| AI workflows and agent tooling for a one-person business: Marketing OS, Founder cockpit, 8 Claude Code mods, a public mod marketplace | §2 |
| A verifiable process: specs, tests, invariants, claims lint, session coordination, phone-driven agent crews | §3 |
| A trade credential: electrician, IBEW Local 369, the person who wrote an NEC Article 220 engine | §4 |

Not sellable as proof yet: InspectRight (web beta, copy not scrubbed), BidRight (prototype, synthetic
demo), Moblox (private, kids' names), kes-timesheets (client work, permission not on file), Lennox
Fields (excluded, see §5).

## 1. Shipped products

### 1.1 ChargeRight — web + iOS. State: LIVE (web since 2026-07-18 cutover; iOS on App Store)
- What: a homeowner answers a questionnaire, optionally uploads panel photos; the app runs an NEC
  Article 220 load calculation and sells a one-time report. Source: `~/dev/ChargeRight-redesign-prod/CLAUDE.md`.
- Web: https://evchargeright.com (HTTP 200 today). Vercel project `chargeright-redesign`; live tag
  `web-live-2026-07-18`, byte-checked 2026-07-24 (`~/dev/_CHARGERIGHT-SOURCE-OF-TRUTH/README.md`).
  OG image: https://evchargeright.com/og/home-v6.png.
- iOS: App Store id 6755695416, free, v4.0.1, release date 2026-07-10 (iTunes lookup API, 2026-10-21).
  https://apps.apple.com/us/app/chargeright/id6755695416 . Native SwiftUI in `~/dev/Firebase/ios/App/App/`.
  Conflict to fix elsewhere: `Firebase/ios/App/App/Views/SettingsView.swift:74` links a different app id (6738029498).
- NEC engine: `src/lib/nec-calculators.ts` (+ `calculator.ts`, `nec-tables.ts`, `nec-adoption.ts` for
  editions 2017/2020/2023/2026, `capacity-verdict.ts`, `charging-calculator.ts`). Methods present in code:
  220.82 optional method, 220.83(A)/(B) existing dwelling, Article 220 Part III standard method, NEC 2026
  "120.82", Annex D examples (test file `nec-annex-d.test.ts`). Public wording must follow claims.json:
  "NEC Article 220 load calculation (220.83(A) existing dwelling; 220.87 measured load)". Never cite 220.82 in copy.
- Tests: 88 test files under `src/` and `scripts/`; NEC-specific `it()` counts: nec-calculators 15,
  nec-annex-d 16, capacity-verdict 10, nec-parity 8. `package.json` gates: `verify:nec`, `verify:claims`,
  `verify:method-copy`, `verify:seo`. (Counted, not run.)
- Vision: `src/lib/vision/panel-pipeline.ts`, two-pass Gemini flow (LOCATE boxes → crop/contrast → READ
  amperage/brand/label per crop), per-field confidence, corroborated against the questionnaire. Model
  `gemini-2.5-flash` (`:983`), escalation `gemini-2.5-pro` (`:376`). Header comment: 9.3 s + 4.7 s on one
  test panel (a comment, not a benchmark; don't publish as a number).
- Payments: Stripe one-time `ASSESSMENT_PRICE_CENTS = 4999` (`src/lib/pricing.ts:32`), webhook at
  `src/app/api/webhooks/stripe/route.ts`; Apple IAP `com.evchargeright.assessment.single`
  (`Firebase/.../StoreKitService.swift:17`), $69.99 per `src/lib/ios-pricing.ts` (confirmed 2026-08-18),
  receipt verification `src/lib/apple/verify-transaction.ts` with a test beside it.
- History: web repo first commit 2026-05-24, last 2026-10-19, 347 commits (shared with parent worktree
  `~/dev/ChargeRight-redesign`); Firebase repo 2026-02-28 → 2026-09-22, 463 commits.
- Customer/revenue numbers exist only in `INVESTOR-FACTS-2026-10-18.md`, marked "LOCAL ONLY ... not for
  sharing until Jason approves". **Not used on the site.** Allowed public phrase: "paying customers".
- Reach (allowed): the X post `x.com/walls_jason1/status/2032052167578665458` (2026-03-12) read 897,375
  views on 2026-07-30 (`~/dev/wiki/marketing/x-intelligence/x-post-performance.md:83`); blockers.md B-20
  says 901K. Safe wording: "a ChargeRight post that passed 890K views". The old "680,000+ views" on the
  current site has no source found: **drop it**.

### 1.2 BendRight — iOS. State: LIVE on the App Store
- What: conduit-bending calculator; v1.1 adds an ARKit measure feature. Stack: Vite + React PWA,
  Capacitor 8, Swift/ARKit (`~/dev/bendright/package.json`, `~/dev/wiki/projects/bendright.md`).
- App Store id 6779847124, $6.99, release 2026-07-15, **version 1.1 live** (iTunes lookup, 2026-10-21):
  https://apps.apple.com/us/app/bendright/id6779847124 . Privacy page https://bendright.vercel.app (200).
- Promo videos posted 2026-10-01: https://youtu.be/-Zz9P2HD4UQ and https://youtube.com/shorts/WOahngN0QKg.
- History: 2026-07-16 → 2026-10-01, 13 commits. Tests: `tests/bendMath.test.mjs` (wiki says 16 pass).
- Allowed claims in repo: "Built by an electrician", "Electrician made". No sales numbers recorded.

### 1.3 ZombieWells — web. State: LIVE at https://zombiewells.com (200 today)
- Public-interest map/report tool on abandoned, contaminated oil wells in the Permian Basin; page text
  today cites RRC, Carbon Tracker, DOI figures and a "Report a Suspected Well" flow.
- Built with attorney Sarah Stogner (`~/dev/rolodex/INDEX.md`: "Attorney / ZombieWells partner").
  Use "attorney", not "District Attorney" (that title appears only in `promo-video/SCRIPT.md` and is unverified).
- "Built in 45 minutes" (2026-03-20) appears in `app/trades/page.tsx:117` and `app/story/page.tsx`; no
  repo under ~/dev was found to time-stamp it. Keep only as Jason's own account ("I built the first
  version in an afternoon" is the safe form) or drop the minute count. **PROPOSED: say "built in a day".**
- No usage numbers. OG image: https://zombiewells.com/opengraph-image.

### 1.4 InspectRight (RightSuite). State: WEB BETA, not shipped on iOS
- AI panel-photo analysis for home inspectors; Next.js, Supabase, Stripe, Gemini via Genkit on Vertex
  (`~/dev/inspectright/CLAUDE.md`). Live at https://inspectright.vercel.app (200 today); inspectright.app
  did not resolve from here. `IOS_LAUNCH.md`: scaffolded only; Capacitor shell removed.
- History: 2026-02-10 → 2026-07-18, 77 commits. **27 "Master Electrician" occurrences in the live HTML**
  (counted today). Do not link until scrubbed. Site may say "in beta" without a link.

### 1.5 BidRight. State: PROTOTYPE (local only, no remote)
- Plan intelligence for electrical estimators: reads a drawing set, reports cross-trade conflicts,
  scope gaps, RFIs, field-adjusted labor (`~/dev/bidright/README.md`). 5 commits on 2026-07-29;
  wiki says 34 tests across 2 suites. Demo numbers are from a synthetic fixture. Mention as "in the lab", no numbers.

### 1.6 Moblox / Noblox. State: PRIVATE
- Offline, kid-safe voxel building game for his two children, two editions from one codebase
  (`VITE_VARIANT`), three.js + Vite + PWA, 82 commits 2026-06-10 → 2026-09-18, 9 test files.
  README says keep private (children's names). Site may say "a private game I built for my kids", no link, no names.

### 1.7 Evolve KY talk deck. State: LIVE at https://evolve-deck.vercel.app (200)
- "Do you really need a panel upgrade?", 2026-07-26 talk; 35 commits. Contains "Master Electrician"
  (index.html 406/462/1190). Mention the talk; do not link until scrubbed.

### 1.8 Client/other
- kes-timesheets: photo of a handwritten crew timesheet → Excel, Gemini via Vercel proxy, 8 commits
  2026-08-26; Vercel project exists, URL not recorded. **INFERRED client work; needs the client's OK before showing.**
- linkedin-connect (LinkedIn API posting CLI), revenue-hud and seo-hud (macOS HUDs), agent-world
  (research prototype; its own RESULTS.md says "NO task-reliability benefit"): internal, not for the site.

## 2. In-house AI tooling (how he builds; all private unless noted)
- **claude-mods**: 7 Claude Code mods in README (mod-scout, usage-meter, check-ledger, resume-nudge,
  chrome-cockpit, session-claims, burn-watch) plus you-oughta-know; local plugin marketplace. 6 commits
  2026-10-01 → 10-02. **Public marketplace**: https://github.com/LeeHigma0201/claude-code-mods (scrubbed
  export, 1 commit 2026-10-01 with the first 4 mods). `wrangle` (`/wrangle`) rounds every session into
  projects with a PROJECT.md (`~/dev/claude-mods-wrangle/README.md`).
- **Marketing OS** (`~/dev/cr-marketing-os`): rulebook, `claims.json`, `bin/lint.mjs` claim linter,
  `bin/act.mjs` outward-action caps, Keychain vault, routines, blockers ledger. 17 commits 2026-09-30 → 10-19.
  `VIDEO-PRODUCTION.md` (2026-10-10): stills first, real audio from frame 0, master 1080x1920, inspect the
  exported file (contact sheet, silence scan, whisper transcript vs script, claims check).
- **Founder cockpit** (`~/dev/founder-cockpit`): one 6 AM read-only pull of Stripe, Vercel, Gmail,
  Calendar, Claude usage, news → dashboard + 10-line brief; feeds the **Watch Board** session dashboard
  (`wiki/business-running-list.md:17`, 2026-10-16). 4 commits 2026-10-08 → 10-17.
- **Cortex** (`~/dev/cortex`): knowledge graph + revenue tooling, Next.js app, MCP server, cost-tally
  scripts; 15 commits 2026-04-08 → 10-14.
- **Video pipeline**: `~/dev/promo-video` (Veo 3.1 on Vertex, TTS, captions, grade; 299 mp4 files found by
  `find`), `~/dev/promo-clips` (246 mp4), `~/dev/video-tools` (hyperframes, faster-whisper, Remotion plugin).
  Counts overlap; do not add. Current rule set forbids generated faces of Jason.
- **session-bus** (`~/dev/session-bus`): agent hand-off bus, 18 commits 2026-08-08 → 09-05.

## 3. How he works (quotable, sourced)
- "Reads replies on his phone, mostly through Remote Control into local Claude Code sessions (231 Remote
  Control sessions by 2026-10-08)." — `~/dev/wiki/reference/OPERATING-MANUAL.md` v1.1
- "since August 2026 about 40 sessions a week he starts plus about 250 agent and scheduled runs." — same
- "parallel agents plus an independent verifier that never sees the builder's reasoning." — same
- "419 sessions you started, plus 873 runs launched by agents or schedules." "Peak concurrency: 24
  sessions on 8/9." — `~/dev/wiki/inbox/claude-usage-audit-2026-10-08.md`
- Process (`~/dev/engineering-standards/STANDARDS.md`, 2026-10-14): claim files before editing; read the
  done-ledger; branch/worktree only; "done" = the gate passed on the final diff; spec → plan → implement
  for anything bigger than a bug fix; hooks enforce; LLM output is untrusted input; prompts tuned by
  eval; a human approves anything public or that moves money; unattended jobs get budgets and a supervisor.
- Taste gate (`~/dev/claude-taste/TASTE.md`, 103 ledger rows): real over faked, judged rendered on a
  phone, one idea per screen, 2–3 options to pick from, claims lint first.
- Checkable counts run 2026-10-21: `find ~/dev -maxdepth 2 -name .git -type d | wc -l` = 48 repos;
  `ls ~/.claude/skills | wc -l` = 39 skills; `ls ~/.claude/agents | wc -l` = 15 agents;
  `find ~/.claude/projects -maxdepth 2 -name '*.jsonl' | wc -l` = 1,657 top-level session transcripts.
- Preview deploys: Vercel preview URLs per branch are standard in his repos (this repo's deployments
  list shows branch deploys). Red-team reviews: `/code-review` per STANDARDS §9 and the
  `INVESTOR-DD-REDTEAM-2026-10-18.md` and `marketing-red-team` agent exist. **INFERRED** as routine from
  those files; the site should say "independent review" rather than a count.

## 4. Credentials and press: allowed wording
- Trade: "electrician", "electrician-founder", "IBEW Local 369". **Never "Master Electrician"**
  (exam passed, license not issued as of 2026-10-02; OPERATING-MANUAL §1). Do not publish a license number
  (EE642643 appears in one file, conflicting with "not issued"; unresolved).
- Mark Cuban: "reposted and DM'd" (`wiki/inbox/anthropic-call-followup-seed.md`, 2026-08-27). Never in
  cold outreach copy (rolodex rule), never above the fold (DESIGN.md).
- Sunday Times: "a call from the Sunday Times" / Danny Fortson asked for a meeting; **no published
  piece** (commit c662563; `marketing-playbook.md:33`). Never "featured in".
- Anthropic: reached out; a call was prepared (2026-08-27 seed). **No "case study" exists**: the current
  site's "Anthropic case study" trust item must go.
- Shark Tank casting responded (story page timeline, 2026-03-17): keep off the consulting site (no outcome).

## 5. Excluded on purpose
- Lennox Fields (lennoxfields.com, live): described on the current site as a family member's therapy
  practice. Family and legal matters are off-limits for this site; removed from v2 without comment.
- Anything from case-file, money, journal, custody, medical, kids' names, Tamara. Not opened.

## 6. Current site facts (jason-walls.vercel.app)
- Vercel project `jason-walls` (team `chargeright`), only domain `jason-walls.vercel.app`; **no custom
  domain**. Last production deploy 2026-05-16 at commit 37fc6a6; commits after that (App Store showcase,
  story fix, agent API) never deployed. `hi@jasonwalls.work` is the contact address in `app/book/page.tsx`.
- Live copy today still says "Master Electrician" (hero kicker, press card), "680,000+ views",
  "Anthropic case study", "Sunday Times" trust item: all replaced in v2.
- Screenshots: headless Chrome is blocked inside the sandbox (profile socket), so product visuals for
  the site use each product's own public OG image and App Store icons already in `public/apps/`.
