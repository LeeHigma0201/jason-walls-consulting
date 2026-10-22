import { A, SIZE } from "@/lib/assets";
import type { WhyPhoto } from "@/components/home/Why";

// One set of words for every hero option, so Jason judges the design and the photo, not the copy.
export const HERO = {
  kicker: "Electrician, IBEW Local 369, Louisville, Kentucky",
  lede: "I’m Jason. I have two apps on the App Store and a web product that takes payments, and I build with a crew of AI agents I run from my phone.",
};

// The lockout photo Jason likes moves down to the Why section when a hero option takes the top.
export const LOCKOUT: WhyPhoto = {
  src: A.electrician,
  alt: "Jason Walls, an electrician in a hard hat and safety vest, holding a red lockout device and padlock in front of electrical panels.",
  w: SIZE.electrician.w,
  h: SIZE.electrician.h,
};
