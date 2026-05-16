// Prebuilt solutions — productized templates for trades that Jason has personally
// run on the truck. One-time setup fee, customer keeps their own NotebookLM /
// Claude / Sheets subscriptions. Built so a small shop owns the workflow instead
// of renting it back from a vendor.
//
// Companion to lib/offers.ts (custom builds). Mission gate:
//   ✓ widens access — productized expertise where no honest equivalent exists
//   ✓ peer voice — every voiceProof line is something a tech who's done the work would say
//
// CURATED 2026-05-15 against trade-research from 6 specialized subagents
// (BICSI, electrical, fiber, IP camera, framing, HVAC). 6 dead SKUs archived,
// 4 research-validated SKUs added. See project_jason_walls_templates_2026_05_14.md
// for the full provenance chain.
//
// `samplePrompts` shows real questions the notebook can answer (concrete > abstract).
// `notForThis` is the honest scope limit. Builds trust by saying what we DON'T do.

export type TemplateProduct = {
  id: string;
  slug: string;
  name: string;
  trade: "project" | "data" | "fiber" | "electrical" | "security";
  tradeLabel: string;
  priceLabel: string;
  priceNum: number;
  setupDays: string;
  short: string;
  who: string;
  problem: string;
  whatYouGet: string[];
  workflow: string[];
  subscriptions: { name: string; cost: string; why: string }[];
  voiceProof: string;
  samplePrompts?: string[];
  notForThis?: string[];
  featured?: boolean;
  stripeUrl?: string;
  stripeProductId?: string;
  stripePriceId?: string;
};

export const TEMPLATES: TemplateProduct[] = [
  // ──────────────────────────────────────────────────────────────
  // PROJECT / FOREMAN
  // ──────────────────────────────────────────────────────────────
  {
    id: "project-brain",
    slug: "project-brain",
    name: "Project Brain",
    trade: "project",
    tradeLabel: "Project / Foreman",
    priceLabel: "$1,999",
    priceNum: 1999,
    setupDays: "set up in 5 business days",
    short:
      "Per-project AI pack so your foreman walks into every room knowing the spec, the heights, what's going in, and what the other trades are doing.",
    who:
      "GCs, electrical / mechanical / plumbing foremen, project managers — anyone responsible for a crew that has to be right the first time, room by room.",
    problem:
      "Your foreman is the bottleneck. Apprentices ask him the same thing in three rooms. He's flipping through addendum 4 to confirm a ceiling height. The mechanical guys roughed in over where his conduit was supposed to go. The drawings he has on his phone are from last revision. The clock is running on every minute of that.",
    whatYouGet: [
      "A per-project NotebookLM brain pre-loaded with the latest prints, addendums, RFIs, spec book, and architectural set",
      "A daily-brief auto-report seeded from the sign-in sheet — who's on, what's next, what's blocked, what addendums dropped overnight",
      "A cross-trade overlay so the foreman can ask \"what does mechanical have running through wall G-12\" and get an answer",
      "A compliance agent that checks every room against the addendums and spec sections that apply to it",
      "A photo library of materials going in, tied to the room they belong to (foreman snaps it, the library files it)",
      "A spec-revision tracker so when sheet E-2.1 jumps from Rev 3 to Rev 4, the brain knows what changed",
      "Setup call with you + your foreman so it's wired into HIS workflow, not mine",
    ],
    workflow: [
      "Upload everything once: prints, addendums, RFIs, spec book, sign-in sheet template, material photos",
      "Every morning the foreman gets a brief — crew on site today, what's next, what addendum applies, what changed since yesterday",
      "On the floor, he asks: \"what jack style in room 402, at what height, and is the duct above it\" — gets an answer with the source page",
      "Apprentice asks the same question — he hands them the brain, says \"ask it.\" Same answer, same source, no re-explaining",
      "When the spec changes, swap the file. Every room-level answer updates instantly",
      "Weekly: a roll-up of every cross-trade conflict the compliance agent caught — your PM walks into the OAC meeting prepared",
    ],
    samplePrompts: [
      "What ceiling height is called out for room 302?",
      "Show me every addendum change that affects floor 4",
      "What is the mechanical contractor running through wall G-12 between gridlines 5 and 7?",
      "Which rooms have a spec for fire-rated penetrations?",
      "What's the latest revision of sheet E-2.1?",
      "What did RFI 14 change about the lighting in the corridor?",
      "Pull every spec section that mentions 'data cable' across the whole spec book",
    ],
    notForThis: [
      "Stamped engineering — this is a foreman's reference tool, not a design substitute",
      "Live multi-user editing on the same sheet at the same time (Google Workspace already handles that)",
      "AHJ inspection sign-off — that's still a human + a stamp + a permit",
    ],
    subscriptions: [
      {
        name: "NotebookLM Plus (Google AI Premium)",
        cost: "verify current pricing — Plus tier",
        why: "A live commercial project has more sources than the free tier comfortably holds. Plus gives you headroom for the whole spec book + every addendum + every trade's prints in one notebook.",
      },
      {
        name: "Google Sheets",
        cost: "free with Google account",
        why: "Where the daily brief, sign-in tracker, compliance log, and photo library live so your foreman + PM see the same numbers.",
      },
      {
        name: "Claude Pro (optional)",
        cost: "$20/mo",
        why: "Only if you want the compliance agent to do deeper cross-references across hundreds of pages at once. NotebookLM alone is enough for most.",
      },
    ],
    voiceProof:
      "Walk into every room knowing you're on the latest drawings, you know what's going in, you know the spec, you know the heights, you know what the other trades are doing. That's the job. This is the tool.",
    featured: true,
    stripeProductId: "prod_UWEh9F4HViQnpN",
    stripePriceId: "price_1TXCEmAlmNR4t7PpvzoNcYMG",
    stripeUrl: "https://buy.stripe.com/fZu9ASdib4WveLm7NN8Zq0h",
  },

  // ──────────────────────────────────────────────────────────────
  // LOW-VOLTAGE / DATA
  // ──────────────────────────────────────────────────────────────
  {
    id: "cabling-shop-closeout",
    slug: "cabling-shop-closeout-engine",
    name: "Cabling Shop Closeout Engine",
    trade: "data",
    tradeLabel: "Low-voltage / Data",
    priceLabel: "$799",
    priceNum: 799,
    setupDays: "set up in 4 business days",
    short:
      "Test results + labeling + rack elevations + warranty submittals + as-builts assembled into one branded closeout package. Stop losing the last 20% of every job.",
    who:
      "Cabling contractors, BICSI / RCDD shops, integrators who can't invoice until the closeout binder is signed off and don't have a tool that handles the final 20%.",
    problem:
      "Fluke's own survey found 83% of installers lose 15+ hours every month wrestling test results into a deliverable. You can't invoice until the binder hands over. Half your warranties go unsubmitted because CommScope wants one format, Panduit wants another, and nobody's tracking the 30-day deadline.",
    whatYouGet: [
      "A NotebookLM knowledge base pre-loaded with CommScope, Panduit, Belden, and Leviton warranty submission requirements (the brands your shop actually uses)",
      "A Google Sheets job tracker with columns for test status, labeling key, rack elevation file, warranty submittal deadline, and closeout sign-off",
      "Per-brand warranty deadline alerts at 21 / 14 / 7 days — so the 30-day submission window doesn't quietly close on you",
      "A Claude-powered closeout document generator that takes structured job inputs and outputs a branded PDF-ready package (test summary narrative, labeling key, rack elevations, warranty cover letter, as-built handoff)",
      "60-min setup call where we wire it for YOUR shop's brands + your standard closeout template",
    ],
    workflow: [
      "Drop test results (Fluke LinkWare export), photos, and labeling data into the job folder",
      "Sheet pulls the brand list off your BOM and shows the per-brand warranty deadline countdown",
      "When the job hits closeout: Claude assembles the package, your name on the cover, your customer's name on the deliverable",
      "Submit warranties to each manufacturer portal before the deadline — checklist tracks who's confirmed",
      "Hand the customer a single PDF, send the invoice, log the recovered hours",
    ],
    samplePrompts: [
      "Generate the closeout package for job 24-118: CommScope SYSTIMAX, 240 drops, 4 racks",
      "What does Panduit require in a Certification Plus warranty submission?",
      "Which jobs have warranty deadlines in the next 14 days?",
      "Pull the as-built rack elevation table for IDF-B from the labeling sheet",
      "Compare this test summary against the spec — flag any pulls outside Cat 6A tolerance",
    ],
    notForThis: [
      "Replacing your tester — Fluke / Wirewerks export stays; we ingest, we don't replace",
      "Live cable certification — those are the tester's signed CSV; we package them, we don't generate them",
      "Manufacturer portal auto-upload (each portal is its own login; we assemble the pack, you upload)",
    ],
    subscriptions: [
      {
        name: "Google Workspace",
        cost: "free tier works; Workspace if you need shared drives + alerts",
        why: "Sheets + Drive host the job folder, the warranty deadline tracker, and the closeout PDF pipeline.",
      },
      {
        name: "Claude Pro",
        cost: "$20/mo",
        why: "Drafts the closeout narrative + the warranty cover letters. Free tier works for occasional jobs; Pro for daily.",
      },
    ],
    voiceProof:
      "Fluke's own survey said 83% of installers lose 15+ hours a month on this. One recovered warranty submittal or one invoice sent a week earlier pays for the whole thing.",
    featured: true,
    stripeProductId: "prod_UWFerdjeDROMAS",
    stripePriceId: "price_1TXD9ZAlmNR4t7PpKhvsVqRh",
    stripeUrl: "https://buy.stripe.com/14AeVc91VcoXeLm8RR8Zq0u",
  },
  {
    id: "data-cut-sheet",
    slug: "data-cut-sheet-generator",
    name: "Data Cut Sheet Generator",
    trade: "data",
    tradeLabel: "Low-voltage / Data",
    priceLabel: "$499",
    priceNum: 499,
    setupDays: "set up in 2 business days",
    short:
      "Upload your prints. Chat with them. Get the print-number / pull-number cut sheet your installer can actually use.",
    who:
      "Cabling contractors, low-voltage shops, integrators running data jobs where the prints don't match the field and the cut sheet was made by someone who never pulled cable.",
    problem:
      "You're standing in a hallway with a print roll and a butt-set, trying to figure out what jack belongs to what number. Half the crew is asking you the same room over and over. The schedule on sheet T-3.2 has 412 drops. You need a real cut sheet that maps every drop to a real pull, today.",
    whatYouGet: [
      "A NotebookLM notebook pre-loaded with your low-voltage prints, T-series sheets, riser, and pathway plans",
      "A Google Sheet cut-sheet template with columns: Print#, Pull#, Type (CAT6A/CAT6/etc), Room, Floor, IDF, Termination, QC status",
      "A starter prompt library — the 15 most common cut-sheet questions, pre-tested against your prints",
      "A pulls-per-IDF rollup so your foreman knows what each rack is taking",
      "Scale-aware cable-length estimation against the drawing scale (scale + drop count + your standard run formula = spool order)",
      "A QR code your installer scans to pull the cut sheet on their phone",
      "30-min walk-through so your foreman runs it without me",
    ],
    workflow: [
      "Drop the architectural + low-voltage prints into your notebook",
      "Ask things like \"every data jack in room 402, by type\" or \"how many CAT6A pulls on the second floor\"",
      "For a cable estimate: scale + drop count + your standard run formula = your spool order",
      "Paste the answer rows into the linked Sheet — print# and pull# already paired, IDF column auto-fills from the room",
      "Print + label rolls, hand to the installer, your sheet syncs live as drops are pulled",
      "End of day: scan the QC column for any unfinished — that's tomorrow's punch list",
    ],
    samplePrompts: [
      "How many data drops on the 3rd floor by cable type?",
      "List every CAT6A pull longer than 200ft",
      "What IDF does room 405 home-run to?",
      "How many wall plates with two ports vs one port across the whole job?",
      "Count the symbols for AV jacks on sheet T-3.2",
      "Which rooms get a floor box instead of a wall jack?",
      "Estimate total cable footage for a 240-drop floor at 1/8\" scale, 80ft average home-run, 10% waste",
    ],
    notForThis: [
      "Live cable-test certifications — those come from your Fluke or your tester's CSV exports",
      "Manufacturer-specific part numbers (we ask, but the spec book is the source of truth)",
      "Material PO generation — this gives you the count, not the purchase order",
      "BIM coordination — we read PDFs, not Revit",
    ],
    subscriptions: [
      {
        name: "Google account (NotebookLM)",
        cost: "free tier covers most jobs",
        why: "Hosts the notebook your prints get uploaded to. Plus only if you're running multi-tower jobs and need higher source counts.",
      },
      {
        name: "Google Sheets",
        cost: "free with Google account",
        why: "Where the cut sheet itself lives. No software install, your crew already knows how to use it.",
      },
    ],
    voiceProof:
      "I ran data for years. The cut sheet is the difference between a clean install and a finger-pointing day. This is the one I wish I had.",
    stripeProductId: "prod_UWEhmVa9jA81fM",
    stripePriceId: "price_1TXCEpAlmNR4t7PpgEU1ZsAO",
    stripeUrl: "https://buy.stripe.com/fZu00ice79cL7iU1pp8Zq0i",
  },
  {
    id: "data-room-spec",
    slug: "room-by-room-jack-spec",
    name: "Room-by-Room Jack Spec",
    trade: "data",
    tradeLabel: "Low-voltage / Data",
    priceLabel: "$499",
    priceNum: 499,
    setupDays: "set up in 2 business days",
    short:
      "Ask the prints questions out loud. \"What style of data jack goes in room 402?\" Get an answer with the page number it came from.",
    who:
      "Foremen, installers, BIM coordinators — anyone tired of re-reading the addendum because the apprentice asked again on the radio.",
    problem:
      "The print is right. The addendum overrides the print. The RFI overrides the addendum. Your apprentice is asking what's in 402 and you're shuffling paper while standing on a ladder.",
    whatYouGet: [
      "A NotebookLM notebook pre-loaded with prints + addendums + RFIs + spec sections (answers always current)",
      "A query playbook — the 20 most common field questions, pre-tested against your prints",
      "Mounting-height + plate-color quick lookups (the apprentice's most-asked stuff)",
      "A spec-by-room rollup: pick the room, see every spec item that applies",
      "A QR code your crew scans on the truck or on the floor to land directly in the notebook",
      "30-min walk-through with you + your lead so the workflow sticks",
    ],
    workflow: [
      "Upload prints, addendums, RFIs, spec book — all of it — into one notebook",
      "Stand at the jobsite, ask out loud or type the question",
      "Get the answer with a citation back to the exact page",
      "Apprentice asks you the same thing — you hand them the QR code, they ask the notebook",
      "When the spec changes, swap the file. Your crew's answers update instantly",
    ],
    samplePrompts: [
      "What style of data jack goes in room 402?",
      "What's the mounting height for the wall plate in the corridor?",
      "Does room 215 get a single-gang or double-gang?",
      "Which rooms get the white plate vs the stainless one?",
      "What did the addendum change about the conference room jacks?",
      "What spec section covers the AV jacks in the auditorium?",
    ],
    notForThis: [
      "Per-jack manufacturer pricing — that's your distributor's job",
      "Live BIM coordination — we read PDFs, not Revit / Navisworks",
      "Field labeling — this answers the spec; the label still comes off your printer",
    ],
    subscriptions: [
      {
        name: "Google account (NotebookLM)",
        cost: "free tier covers most jobs",
        why: "Holds the source library. Plus is only needed if you exceed the source-count limit on a single job.",
      },
    ],
    voiceProof:
      "Standing on a ladder with one hand on the cable and one hand on the print isn't a system. This is.",
    stripeProductId: "prod_UWEhYArNzdnSk3",
    stripePriceId: "price_1TXCEsAlmNR4t7Ppnof3RNck",
    stripeUrl: "https://buy.stripe.com/00w7sKfqj9cL0Uwfgf8Zq0j",
  },

  // ──────────────────────────────────────────────────────────────
  // FIBER
  // ──────────────────────────────────────────────────────────────
  {
    id: "osp-permit-row-tracker",
    slug: "osp-permit-row-tracker",
    name: "OSP Permit & ROW Tracker",
    trade: "fiber",
    tradeLabel: "Fiber",
    priceLabel: "$999",
    priceNum: 999,
    setupDays: "set up in 4 business days",
    short:
      "One dashboard tracking every permit across every jurisdiction — status, deadline, missing docs, follow-up owner. Stop losing hundred-thousand-dollar projects to preventable paperwork delays.",
    who:
      "Small ISPs, OSP contractors, last-mile builders, permitting coordinators — anyone running a fiber build that crosses multiple AHJs and watches projects bleed cash on permit re-submissions.",
    problem:
      "Rural builds need seven sequential approvals: local, state, tribal, utility, environmental, DOT, sometimes federal. Every jurisdiction wants a slightly different stack. One missing doc kicks the application back two weeks. Industry teams treat permitting \"as an administrative afterthought\" and lose hundreds of thousands per project doing it.",
    whatYouGet: [
      "A Google Sheets dashboard tracking every active permit: jurisdiction, type, submission date, expected response, status, attached docs, follow-up owner",
      "A NotebookLM knowledge base pre-loaded with the published requirements for each jurisdiction in your build footprint",
      "Per-jurisdiction submittal checklists generated from that knowledge base",
      "A Claude-powered weekly status memo that goes out to the crew + the client — what's pending, what's stale, what's at risk",
      "Automated follow-up draft emails when a permit hasn't responded in N days (you confirm, you send)",
      "Setup call where we load YOUR specific build footprint (which counties, which utilities, which DOT regions)",
    ],
    workflow: [
      "Add a new permit — jurisdiction, type, scope — the sheet auto-pulls the per-jurisdiction submittal checklist",
      "Submit the application, log the date, attach the package",
      "Sheet tracks every milestone (review queue, RFI response, approval, fee paid, permit in hand)",
      "Weekly: Claude writes the status memo. You review, you send. Stakeholders never get blindsided",
      "If a permit goes stale: tool drafts the follow-up. You add the personal note, you send",
    ],
    samplePrompts: [
      "Which permits are stale by more than 21 days?",
      "What does Floyd County require for an aerial fiber permit?",
      "Pull every open permit on the Eastern circuit",
      "Draft this week's status memo for the client",
      "What docs are missing for permit application #87?",
    ],
    notForThis: [
      "GIS mapping of the route itself — that's VETRO or 3-GIS or your KMZ; we track the paperwork around it",
      "AHJ portal auto-filing — each portal is its own world; we assemble, you upload",
      "Environmental impact study work — that's a sub you hire, we track that the work got done and the report got submitted",
    ],
    subscriptions: [
      {
        name: "Google Workspace",
        cost: "Workspace recommended (~$6/user/mo)",
        why: "Sheets + Drive + Gmail-scheduled alerts. Workspace makes the multi-user permissions + automated emails actually reliable.",
      },
      {
        name: "Claude Pro",
        cost: "$20/mo",
        why: "Drafts the weekly memo + follow-up emails. Free tier works for slow weeks; Pro for active builds.",
      },
    ],
    voiceProof:
      "I've watched a fiber build lose two months because a state DOT permit was sitting in an inbox nobody owned. The work was ready, the crew was ready, the permit wasn't. That's the difference between a profitable project and one that bleeds cash.",
    stripeProductId: "prod_UWFewQVcSGoUIU",
    stripePriceId: "price_1TXD9eAlmNR4t7PpmqgSeiPw",
    stripeUrl: "https://buy.stripe.com/dRm9ASfqjcoXfPq0ll8Zq0v",
  },
  {
    id: "fiber-outage-tracker",
    slug: "fiber-outage-tracker",
    name: "Fiber Outage Tracker",
    trade: "fiber",
    tradeLabel: "Fiber",
    priceLabel: "$799",
    priceNum: 799,
    setupDays: "set up in 3 business days",
    short:
      "Time you got the call. Location. What you're splicing. Who's on the pole. One sheet, ready before the truck door closes.",
    who:
      "Outside-plant crews, last-mile ISPs, anyone running splice trucks who's tired of writing the call time on the back of a glove.",
    problem:
      "Phone rings at 2am. Where? What's down? How many counts? Who's responding? The clock is already running on the SLA and somebody's writing it on a napkin in the cab.",
    whatYouGet: [
      "A pre-built outage intake sheet — call time, location, fiber counts, splice details, ETA, restore time",
      "A response template that auto-times every stage (dispatch → on-site → splice → restore)",
      "Configurable for the count you're splicing (the 144 / 48 / drop pattern, or whatever your spread is)",
      "A printable field card so the splicer has it in their hand before they leave the truck",
      "SLA-clock countdown surface so dispatch + manager see how much rope they have",
      "Post-mortem summary auto-generated when the ticket closes (root cause, total downtime, splices completed)",
      "60-min setup call so dispatch + splicers + manager all wire into the same sheet with their actual roles",
    ],
    workflow: [
      "Dispatcher opens the sheet, fills the call time + location + counts",
      "Splicer gets a card on their phone with the routing pattern for that exact splice",
      "Every status change (dispatched, on-site, splice in, restored) auto-stamps the time",
      "Manager sees the whole thing in one view. Customer gets a clean restore-time number, not a story",
      "Ticket closes → post-mortem summary lands in the weekly roll-up your manager actually reads",
    ],
    samplePrompts: [
      "Status of all open outages this week",
      "Average dispatch-to-restore time last 30 days",
      "Which splicer has the longest cycle time?",
      "Show me the splice details for ticket #2401",
      "How many outages on the Eastern circuit this quarter?",
    ],
    notForThis: [
      "Customer-facing SLA enforcement — you still negotiate that with the carrier",
      "Auto-dispatch — we track and time-stamp, we don't pick who responds",
      "Network-side monitoring (this picks up after the call lands on your desk, not the alarm itself)",
    ],
    subscriptions: [
      {
        name: "Google Sheets + Forms",
        cost: "free with Google account",
        why: "The whole tracker runs on Sheets so your dispatcher and splicers don't need new software.",
      },
      {
        name: "NotebookLM (optional)",
        cost: "free tier",
        why: "If you want your splicer to ask as-built map questions on-site, drop the maps into a notebook.",
      },
    ],
    voiceProof:
      "I've seen the worst attempts at outage tracking. Sticky notes, group texts, '11pm call' written on a Solo cup. The clock doesn't care.",
    stripeProductId: "prod_UWEhvRjUpUIW2G",
    stripePriceId: "price_1TXCEvAlmNR4t7Pp9hmtaS2n",
    stripeUrl: "https://buy.stripe.com/dRm7sK1ztdt15aM8RR8Zq0k",
  },
  {
    id: "fiber-splice-map",
    slug: "fiber-splice-map-quick-sheet",
    name: "Fiber Splice Map Quick-Sheet",
    trade: "fiber",
    tradeLabel: "Fiber",
    priceLabel: "$599",
    priceNum: 599,
    setupDays: "set up in 3 business days",
    short:
      "Tube-by-tube, fiber-by-fiber splice routing on one printable sheet. Built for the exact splice in your hand.",
    who:
      "Splicers, OSP foremen, anyone who's ever looked at a splice case full of 144 + 48 + drop and wished the routing was already drawn.",
    problem:
      "You've got a splice case on the pole. A 144-count backbone, a 48-count lateral, a 12-count drop coming in. You need to know — right now — which six fibers of the blue tube of the 48 go to the new drop, which six stay on the 144, and exactly which two of those drop fibers map to which pair on the customer end.",
    whatYouGet: [
      "A configurable splice-map sheet that takes your tube colors, counts, and routing rules and produces a clean printable map",
      "A field-card variant the splicer keeps on their hip (e.g. \"green of 144 → blue of 48, first 6 only; fibers 1&2 → 11&12 on drop\")",
      "Color-coded tube-by-tube diagram you can mark up in the bucket",
      "A standards lookup card for TIA-598-C colors (so the apprentice stops asking)",
      "A common-patterns library: 144→48+drop, 96→24+drop, 12-to-12 straight, pre-loaded for your shop's typical splices",
      "60-min setup call to pre-load your most common splice patterns and your shop's naming conventions",
    ],
    workflow: [
      "Fill in: incoming count, outgoing count, drop count, tube colors involved",
      "Add the routing rules for this splice (which front-N or back-N fibers transfer)",
      "Generate the sheet — color-coded, tube-by-tube, with fiber numbers",
      "Print it, hand it to the splicer, or pull it up on the phone in the bucket",
      "Save the sheet to the job folder so the as-built map stays in sync",
    ],
    samplePrompts: [
      "Generate a map for: incoming 144 → outgoing 48 (front 6 only) + 12-count drop",
      "What's the TIA color for buffer tube 7?",
      "Print the sheet for splice case #14 at pole 802",
      "Show me the common pattern for a 96 → 24 + drop",
    ],
    notForThis: [
      "Loss budget calc — see the OTDR Trace Reader template for that",
      "OTDR file ingestion — also a separate template",
      "Permanent as-built mapping in a GIS — we feed it, GIS owns it",
    ],
    subscriptions: [
      {
        name: "Google Sheets",
        cost: "free with Google account",
        why: "Sheet itself runs in your existing Google workspace.",
      },
      {
        name: "Claude (optional)",
        cost: "free tier or $20/mo Pro",
        why: "Helpful for generating a written walk-through of an unusual splice. Not required day-to-day.",
      },
    ],
    voiceProof:
      "Green tube on the incoming 144 splices into the blue of the 48, but only the front 6. The other 6 stay on the 144. Fibers 1 and 2 of the 48 land on 11 and 12 of the drop. If you can draw that on a sheet, your apprentice can splice it.",
    stripeProductId: "prod_UWEhB59smJUvTr",
    stripePriceId: "price_1TXCEyAlmNR4t7Pp58eOuTZG",
    stripeUrl: "https://buy.stripe.com/4gMeVcgunagP8mYecb8Zq0l",
  },
  {
    id: "otdr-trace-reader",
    slug: "otdr-trace-reader",
    name: "OTDR Trace Reader",
    trade: "fiber",
    tradeLabel: "Fiber",
    priceLabel: "$599",
    priceNum: 599,
    setupDays: "set up in 3 business days",
    short:
      "Upload your OTDR traces. Get a plain-English event table — every splice loss, every connector, and where the break is.",
    who:
      "Outside-plant techs, splicers, last-mile ISP field crews — anyone who has to interpret a trace at 2am and call back the dispatcher with a real answer.",
    problem:
      "The OTDR exports a trace. The trace has events at 412m, 1240m, 1830m. One is a connector, two are splices, one is a possible bend. Which one is the fault? The free software is from 2011 and chokes on Bellcore SOR files larger than a few MB.",
    whatYouGet: [
      "A workflow that ingests SOR files (Bellcore standard) and outputs a clean event table",
      "Event-by-event interpretation in plain English — splice loss, connector loss, macrobend flag",
      "Distance + loss budget against your run spec — flags whether you're in or out of tolerance",
      "Fault-location callout if a reflection event is high enough to be a break",
      "Customer-facing summary PDF for the ticket close-out (clean, single page, signed)",
      "60-min setup call to load YOUR run spec + loss budget so the tolerance flags are calibrated for your network",
    ],
    workflow: [
      "Drop the SOR file (or a photo of the trace screen if that's all you have)",
      "Tool extracts the event table — distance, loss, type, reflection",
      "Compares against your loss budget and flags the issue",
      "Outputs the \"here's what's wrong, here's where\" summary for dispatch",
      "Customer summary PDF generates automatically when you mark the ticket closed",
    ],
    samplePrompts: [
      "What's the loss budget violation on this trace?",
      "Walk me through the events on this trace in plain English",
      "Estimate fault location based on the largest reflection",
      "Compare this trace to last month's baseline for the same run",
    ],
    notForThis: [
      "OTDR-side configuration or pulse-width tuning — that's still you and the instrument",
      "Permanent baseline storage at scale — pair with a network-monitoring platform if you need that",
      "iOLM-style multi-pulse analysis (single-trace SOR for now)",
    ],
    subscriptions: [
      {
        name: "Google account",
        cost: "free",
        why: "Hosts the event sheet + summary template.",
      },
      {
        name: "Claude Pro",
        cost: "$20/mo",
        why: "The trace interpretation step uses Claude. Free tier works for occasional traces; Pro for daily.",
      },
    ],
    voiceProof:
      "A splicer reading a trace at 2am with a flashlight isn't a system. A clean event table with the fault circled is.",
    stripeProductId: "prod_UWFABslbFUW9xz",
    stripePriceId: "price_1TXChCAlmNR4t7PpWrROoxQH",
    stripeUrl: "https://buy.stripe.com/fZueVcba34WvdHifgf8Zq0r",
  },

  // ──────────────────────────────────────────────────────────────
  // ELECTRICAL
  // ──────────────────────────────────────────────────────────────
  {
    id: "did-i-make-money",
    slug: "did-i-make-money",
    name: "\"Did I Make Money?\" — Post-Job Profit Debrief",
    trade: "electrical",
    tradeLabel: "Electrical",
    priceLabel: "$799",
    priceNum: 799,
    setupDays: "set up in 4 business days",
    short:
      "Job-by-job profit debrief sheet. Stop guessing which work types are killing your margin. Know after every job whether you made or lost — and why.",
    who:
      "Solo electricians, small shops (1–5 trucks), owners who close $100K–$1M and still aren't sure which job types are profitable.",
    problem:
      "Knowify documented it: \"most electrical company owners don't know their actual margins by work type and can't tell you if certain job types made money.\" One owner brought in $100K/yr working 100 hrs/week — $20/hr against the $29/hr industry average — and didn't know. ServiceTitan and Jobber track invoices. None of them debrief the job afterward.",
    whatYouGet: [
      "A Google Sheets job-costing workbook pre-loaded with electrical labor categories (rough, trim, service, panel, low-voltage, controls)",
      "Overhead allocation formulas (your overhead rate + labor burden + truck cost / billable hour)",
      "A Claude-powered debrief prompt that takes a job description + actual hours + material receipts and outputs a one-page \"where you made money / where you bled / what to quote differently next time\"",
      "Per-job-type margin trends — after 10 jobs, the sheet shows you which work types pay vs which leak",
      "Customer-facing one-pager (optional) you can use to defend higher pricing on the work types that prove out",
      "60-min setup call where we load YOUR overhead, YOUR labor rates, YOUR actual job mix",
    ],
    workflow: [
      "Log every job as it closes — actual hours by category, material receipts, customer name",
      "Tool runs the math: revenue − labor (burdened) − materials − overhead allocation = profit",
      "Claude writes the debrief: where the time went, where the waste was, what to quote differently",
      "After 10 jobs: pattern surfaces. \"Panel upgrades pay 38%. Service calls pay 11%. Maybe you don't want more service calls.\"",
      "End of quarter: per-job-type rollup. Decide which work to chase, which to walk away from",
    ],
    samplePrompts: [
      "Debrief job 24-118 — 200A service upgrade in Floyds Knobs, 14 hours actual vs 10 quoted",
      "Show me my margin by job type for Q1",
      "Which work type has my lowest realized hourly rate?",
      "Compare this quarter's panel-upgrade margin to last quarter",
    ],
    notForThis: [
      "Replacing QuickBooks — this is the debrief, your accounting still lives in QBO",
      "Live time-tracking during the job (use whatever you use — we ingest the totals)",
      "Customer billing — this looks at jobs after they close",
    ],
    subscriptions: [
      {
        name: "Google Sheets",
        cost: "free with Google account",
        why: "Where the job-cost workbook lives. You own the sheet — no SaaS lock-in on your numbers.",
      },
      {
        name: "Claude Pro",
        cost: "$20/mo",
        why: "Writes the per-job debrief narrative. Free tier works for occasional jobs; Pro if you debrief weekly.",
      },
    ],
    voiceProof:
      "If you're working 80 hours and don't know which 40 hours are paying you, the answer is: probably not the ones you think.",
    stripeProductId: "prod_UWFeZ1PFiY0Btn",
    stripePriceId: "price_1TXD9oAlmNR4t7PpdSyvkXo3",
    stripeUrl: "https://buy.stripe.com/aFa8wOce7bkTcDe2tt8Zq0x",
  },
  {
    id: "motor-wiring-walkthrough",
    slug: "motor-wiring-walkthrough",
    name: "Motor Wiring Walkthrough",
    trade: "electrical",
    tradeLabel: "Electrical",
    priceLabel: "$599",
    priceNum: 599,
    setupDays: "set up in 3 business days",
    short:
      "Upload the prints. Get a presentation-ready walkthrough of the motor wiring — wye / delta, lead numbers, control logic, the lot.",
    who:
      "Industrial / commercial electricians, plant maintenance, instructors, foremen who train apprentices on real jobs.",
    problem:
      "You're handing a kid a print for a wye-delta start and trying to explain which leads land where. The print is right, but reading it cold is a skill that takes years. You need the walk-through, in your voice, that you don't have time to make.",
    whatYouGet: [
      "A NotebookLM notebook pre-loaded with your prints + the motor's nameplate data + the OEM manual",
      "A presentation template that walks lead-by-lead through the wiring, with diagrams pulled from your print",
      "Common motor-config quick-reference cards (wye/delta, dual-voltage, reduced-voltage start, part-winding)",
      "A short audio overview so the apprentice can listen on the drive in",
      "A troubleshooting tree for the most common faults on that motor type (won't start, overheats, drops a phase)",
      "Print + screen versions so it works on a clipboard or a tablet on the floor",
    ],
    workflow: [
      "Drop the motor print, control schematic, and nameplate into the notebook",
      "Ask: \"walk through the wye-delta start sequence\" or \"why is T6 jumpered to T9\"",
      "Get an answer in plain English with the print page cited",
      "Hand it to your apprentice. They show up understanding it",
      "If the motor faults: pull up the troubleshooting tree, follow it, log what fixed it for next time",
    ],
    samplePrompts: [
      "Walk through the wye-delta start sequence for this motor",
      "What's T6 jumpered to in the dual-voltage low-voltage config?",
      "Why is the overload set at this current?",
      "Trace the control circuit for the local stop button",
      "What does the part-winding start contactor sequence look like?",
    ],
    notForThis: [
      "Live motor health monitoring — this is training and reference, not predictive maintenance",
      "PLC programming — we explain the schematic, we don't write ladder logic",
      "Vibration analysis or motor testing — those need physical instruments",
    ],
    subscriptions: [
      {
        name: "Google account (NotebookLM)",
        cost: "free tier covers most",
        why: "Where your prints live. Plus only needed for very large multi-motor jobs.",
      },
      {
        name: "Claude (optional)",
        cost: "free tier or $20/mo Pro",
        why: "For generating the slide content if you want it formal. Otherwise NotebookLM is enough.",
      },
    ],
    voiceProof:
      "I'd rather pay $599 once than re-explain wye-delta to every new hand for the next three years.",
    stripeProductId: "prod_UWEhacUej5DhkB",
    stripePriceId: "price_1TXCF1AlmNR4t7PpEETFNe0f",
    stripeUrl: "https://buy.stripe.com/eVqfZgfqjcoX7iUfgf8Zq0m",
  },

  // ──────────────────────────────────────────────────────────────
  // SECURITY / IP CAMERA
  // ──────────────────────────────────────────────────────────────
  {
    id: "camera-design-package",
    slug: "camera-system-design-package",
    name: "Camera System Design Package — Pro",
    trade: "security",
    tradeLabel: "Security / IP Camera",
    priceLabel: "$999",
    priceNum: 999,
    setupDays: "set up in 4 business days",
    short:
      "Customer-ready camera design package in under 10 minutes from a structured site walk. Storage estimate, PoE budget, coverage narrative, compliance flags — the 15 data points integrators usually miss on a quote.",
    who:
      "Security integrators, IP camera installers, low-voltage shops doing surveillance work — anyone tired of spending 30–60 minutes on a 1-page quote that still misses what the customer needed to see.",
    problem:
      "IPVM forum (the industry's actual benchmark) puts it bluntly: \"the average job is a 1-page quote with the model numbers obscured.\" Integrators who try to do it right spend 30–60 minutes on a 3-page proposal that still misses 15 data points. JVSG ($595/yr) gives you FOV overlays but no narrative. D-Tools gives you a BOM but no story.",
    whatYouGet: [
      "A NotebookLM notebook pre-loaded with the manufacturer spec sheets for the camera lines you actually sell (Axis, Hanwha, Hikvision, Dahua, etc)",
      "A Google Sheets site-walk intake form (per-camera location, coverage goal, mounting, IR distance, expected scene)",
      "A storage + bandwidth calculator that forces you to log a real 60-second field sample bandwidth reading — not a manufacturer guess. (IPVM community has been asking for this for years; nobody built it.)",
      "A PoE budget calculator that flags shared-budget switches + IR-LED startup-surge gotchas BEFORE you pull cable",
      "A Claude-powered design package generator: coverage narrative, camera-by-camera spec summary, PoE plan, storage projection, compliance flags (HIPAA / PCI / retention law)",
      "Customer-ready PDF output — your logo, your name, the customer's address",
      "60-min setup call where we wire it for YOUR camera lines + your switch standards",
    ],
    workflow: [
      "Run the site walk — fill the per-camera intake on your phone or tablet",
      "For the storage calc: capture a 60-second sample bandwidth reading on a representative camera. Tool projects from real data, not codec guesses",
      "Tool checks the PoE budget across each switch — flags any port that fails under steady-state OR startup-surge",
      "Claude assembles the design package — coverage narrative, spec summary, plan, compliance",
      "Send the PDF to the customer. Win the job because your proposal looks like nobody else's",
    ],
    samplePrompts: [
      "Generate the design package for the Walgreens at 3rd & Main — 8 cameras, mixed indoor/outdoor",
      "What's the PoE budget impact of adding 2 IR-illuminated cameras to this switch?",
      "Project 60-day storage for these 12 cameras at H.265 medium",
      "Does this design clear the HIPAA retention requirements for medical facilities?",
      "Compare an Axis P3265-LV vs a Hanwha XNV-8083R for this coverage goal",
    ],
    notForThis: [
      "Live VMS configuration — that's still Milestone/Genetec/etc on the head-end side",
      "Field-of-view rendering (use Hikvision/Axis design tools for the FOV cones; we plan around them)",
      "Compliance certification — we flag the requirements; an auditor still signs off",
    ],
    subscriptions: [
      {
        name: "Google Workspace",
        cost: "free tier works; Workspace for shared drives + email",
        why: "Sheets + Drive host the intake form, the storage calc, and the deliverable folder.",
      },
      {
        name: "Claude Pro",
        cost: "$20/mo",
        why: "Writes the design package narrative. Free tier covers occasional jobs; Pro for daily proposal flow.",
      },
    ],
    voiceProof:
      "The IPVM community literally asked IPVM to build a better storage calculator. Twice. Nobody did. The gap isn't math — it's that no tool makes you capture real-world bandwidth in the field. This one does.",
    featured: true,
    stripeProductId: "prod_UWFeDYRg95XqLp",
    stripePriceId: "price_1TXD9jAlmNR4t7PpCyy0npt5",
    stripeUrl: "https://buy.stripe.com/28E9AS3HBfB91YA9VV8Zq0w",
  },
];

export const formatTemplatePrice = (n: number) =>
  "$" + n.toLocaleString("en-US");

export const TEMPLATE_TRADES: { id: TemplateProduct["trade"]; label: string }[] = [
  { id: "project", label: "Project / Foreman" },
  { id: "data", label: "Low-voltage / Data" },
  { id: "fiber", label: "Fiber" },
  { id: "electrical", label: "Electrical" },
  { id: "security", label: "Security / IP Camera" },
];
