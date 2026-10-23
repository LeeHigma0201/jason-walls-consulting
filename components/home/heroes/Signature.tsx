import Image from "next/image";
import Link from "next/link";
import { A } from "@/lib/assets";

// A small, real signature for the hero options that do not lead with the portrait: the hard hat
// photo at 40px and the name. Links to /about, where the full photo lives.
export function Signature({ sub = "electrician · Louisville, Kentucky" }: { sub?: string }) {
  return (
    <Link href="/about" className="hx-sig">
      <Image src={A.hardhat} alt="" width={40} height={40} className="hx-sig-img" />
      <span>
        <strong>Jason Walls</strong>
        <span className="mono">{sub}</span>
      </span>
    </Link>
  );
}
