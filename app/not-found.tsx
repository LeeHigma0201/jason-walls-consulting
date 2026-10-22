import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page is not here. The services, the work and the home page are.",
  alternates: { canonical: null },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap narrow">
        <div className="stack-lg">
          <div className="stack">
            <p className="kicker">404</p>
            <h1 className="display h1">I could not find that page.</h1>
            <p className="lede">The link may be old, or I may have moved it. These are the places most people are looking for.</p>
          </div>
          <div className="actions">
            <Link href="/services" className="btn btn-primary btn-lg">See the prices</Link>
            <Link href="/work" className="btn btn-ghost btn-lg">See the work</Link>
            <Link href="/" className="btn btn-ghost btn-lg">Back to the home page</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
