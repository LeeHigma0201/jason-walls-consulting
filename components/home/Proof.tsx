import Link from "next/link";
import Image from "next/image";
import { A, STORE } from "@/lib/assets";
import { Phones } from "@/components/ui/Phones";
import { StoreBadge } from "@/components/ui/StoreBadge";

// Home section 2: two real apps, each with two real App Store screens. Alt text was written after
// opening each screen file. Store prices ($6.99, free) are live facts, so no proposed marker.
export function Proof() {
  return (
    <section className="section" aria-labelledby="proof-h">
      <div className="wrap stack-lg">
        <h2 id="proof-h" className="display h2 sr" style={{ margin: 0, maxWidth: "18ch" }}>
          Open both of these on your phone.
        </h2>
        <div className="grid-2">
          <article className="card sr" style={{ display: "grid", gap: 20, alignContent: "start" }}>
            <div className="badge-row">
              <Image src={A.crIcon} alt="" width={40} height={40} className="icon" style={{ width: 40, height: 40, borderRadius: 9 }} />
              <StoreBadge href={STORE.chargeright} label="ChargeRight on the App Store" />
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <h3 className="display h3" style={{ margin: 0 }}>ChargeRight</h3>
              <p className="mono" style={{ margin: 0, fontSize: 15, color: "var(--text-mid)" }}>Free to download, version 4.0.1</p>
              <p style={{ margin: 0, color: "var(--text-mid)" }}>
                A homeowner finds out whether the panel has room for an EV charger before paying for an upgrade. It is also live at{" "}
                <a className="text-link" href={STORE.chargerightWeb} rel="noopener">evchargeright.com</a>.
              </p>
            </div>
            <Phones
              screens={[
                { src: A.cr01, alt: "ChargeRight on iPhone: a panel utilization gauge at 52 percent for a 200A panel with 54A available, marked Ready for EV Charger." },
                { src: A.cr02, alt: "ChargeRight on iPhone: the assessment step that asks for a photo of the electrical panel with the door open." },
              ]}
            />
          </article>
          <article className="card sr" style={{ display: "grid", gap: 20, alignContent: "start", ["--d" as string]: "80ms" }}>
            <div className="badge-row">
              <Image src={A.brIcon} alt="" width={40} height={40} className="icon" style={{ width: 40, height: 40, borderRadius: 9 }} />
              <StoreBadge href={STORE.bendright} label="BendRight on the App Store" />
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <h3 className="display h3" style={{ margin: 0 }}>BendRight</h3>
              <p className="mono" style={{ margin: 0, fontSize: 15, color: "var(--text-mid)" }}>$6.99, version 1.1</p>
              <p style={{ margin: 0, color: "var(--text-mid)" }}>
                Offsets, saddles and kicks on your phone, with an AR measure and no account.
              </p>
            </div>
            <Phones
              screens={[
                { src: A.br01, alt: "BendRight on iPhone: an offset bend set to 30 degrees with a rise from strut to box knockout, giving a 1 1/8 inch offset." },
                { src: A.br02, alt: "BendRight on iPhone: the marks screen for the same offset, showing 2 1/4 inches between marks." },
              ]}
            />
          </article>
        </div>
        <div className="sr" style={{ display: "grid", gap: 0, justifyItems: "start" }}>
          <p style={{ margin: 0, color: "var(--text-mid)" }}>
            <a className="text-link" href="https://x.com/walls_jason1/status/2032052167578665458" rel="noopener">A ChargeRight post passed 890K views on X.</a>
          </p>
          <p style={{ margin: 0, color: "var(--text-mid)" }}>
            <Link className="text-link" href="/work">All the work</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
