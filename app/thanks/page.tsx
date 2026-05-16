import type { Metadata } from "next";
import Link from "next/link";
import { MissionFooter } from "@/components/MissionFooter";

export const metadata: Metadata = {
  title: "PDF coming Friday",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <div data-theme="home">
      <main className="thanks-main">
        <p className="thanks-kicker">— Confirmed</p>
        <h1 className="thanks-h1">
          PDF coming <em>Friday.</em>
        </h1>
        <p className="thanks-body">
          I'll email it from hi@jasonwalls.work. If it's not in your inbox
          by Friday evening, check your spam folder — and reply to the email
          so your provider knows it's wanted.
        </p>
        <Link href="/" className="thanks-cta">
          ← Back to the site
        </Link>
      </main>
      <MissionFooter activeId="home" />
      <style>{`
        [data-theme="home"] .thanks-main { max-width: 720px; margin: 0 auto; padding: 120px 32px 64px; text-align: center; }
        [data-theme="home"] .thanks-kicker { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--clay); text-transform: uppercase; margin: 0 0 18px; }
        [data-theme="home"] .thanks-h1 { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: clamp(40px, 6vw, 72px); line-height: 1.05; letter-spacing: -0.03em; color: var(--text); margin: 0 0 22px; font-variation-settings: "SOFT" 30; }
        [data-theme="home"] .thanks-h1 em { font-style: italic; font-weight: 600; color: var(--clay); }
        [data-theme="home"] .thanks-body { font-family: var(--font-plex), sans-serif; font-size: 17px; line-height: 1.6; color: var(--text-mid); margin: 0 0 40px; }
        [data-theme="home"] .thanks-cta { font-family: var(--font-plex), sans-serif; font-size: 14px; font-weight: 500; color: var(--text-mid); text-decoration: none; border-bottom: 1px solid var(--rule); padding-bottom: 2px; transition: color 0.18s, border-color 0.18s; }
        [data-theme="home"] .thanks-cta:hover { color: var(--clay); border-color: var(--clay); }
      `}</style>
    </div>
  );
}
