import Image from "next/image";
import { A, STORE } from "@/lib/assets";
import { SITE } from "@/lib/site";
import { StoreBadge } from "@/components/ui/StoreBadge";

// "On the App Store, under my name". Store prices and versions are live facts, so no proposed marker.
export function AppStoreCard() {
  const apps = [
    { icon: A.crIcon, name: "ChargeRight", meta: "Free to download, version 4.0.1", href: STORE.chargeright },
    { icon: A.brIcon, name: "BendRight", meta: "$6.99, version 1.1", href: STORE.bendright },
  ];
  return (
    <div className="card sr" style={{ display: "grid", gap: 20 }}>
      <h2 className="display h3" style={{ margin: 0 }}>On the App Store, under my name</h2>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 16 }}>
        {apps.map((app) => (
          <li key={app.name} className="badge-row" style={{ gap: 14 }}>
            <Image src={app.icon} alt="" width={40} height={40} className="icon" style={{ width: 40, height: 40, borderRadius: 9 }} />
            <div style={{ minWidth: 0 }}>
              <a className="text-link" href={app.href} rel="noopener" style={{ fontWeight: 600 }}>{app.name}</a>
              <div className="mono" style={{ fontSize: 15, color: "var(--text-mid)" }}>{app.meta}</div>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <StoreBadge href={SITE.appStoreDeveloper} label="Jason Walls apps on the App Store" />
      </div>
    </div>
  );
}
