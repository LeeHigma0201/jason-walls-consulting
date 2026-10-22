import { PAYMENT_TERMS } from "@/lib/offers";

// Short plain paragraphs on /services. The payment line is PAYMENT_TERMS verbatim. The $99 is Apple's
// own fee, paid to Apple, so it is plain text with no proposed marker. Server component.

export function PaymentFacts() {
  return (
    <div className="stack measure">
      <p style={{ margin: 0 }}>{PAYMENT_TERMS}</p>
      <p style={{ margin: 0 }}>On iOS jobs the Apple Developer account is in your name and costs $99 a year, paid to Apple.</p>
    </div>
  );
}

export function FixesFact() {
  return (
    <p className="measure" style={{ margin: 0 }}>
      The Business on Claude, MVP and iOS packages include 30 days of fixes after launch or approval.
    </p>
  );
}
