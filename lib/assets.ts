// Real assets only (TASTE: REAL). Photos are Jason's own; screens are the live App Store listings
// (iTunes lookup API, 2026-10-21). Local copies live in public/photos and public/screens.
// REMOTE_ASSETS=true serves the same files from hosts we already control, for previews that
// cannot carry binaries (the Vercel MCP inline deploy). Production uses the local files.
export const REMOTE_ASSETS = false;

const MZ = "https://is1-ssl.mzstatic.com/image/thumb";
const CR = "https://evchargeright.com/images/site";

const REMOTE = {
  electrician: `${CR}/jason-electrician.jpg`,
  hardhat: `${CR}/jason-hardhat.jpg`,
  homeEvening: `${CR}/home-evening.jpg`,
  blueprint: `${CR}/blueprint-texture.jpg`,
  // Not on evchargeright.com: the inline preview has to upload these two (see make_manifest).
  lift: "/photos/jason-lift.jpg",
  jobsite: "/photos/jason-jobsite.jpg",
  cr01: `${MZ}/PurpleSource211/v4/7d/c6/26/7dc62657-9dfb-f67d-9376-f44acf39711f/01_iphone67.png/800x1734bb.jpg`,
  cr02: `${MZ}/PurpleSource221/v4/b3/b6/fd/b3b6fd56-353e-b6ec-4220-9d53518bffe1/02_iphone67.png/800x1734bb.jpg`,
  cr03: `${MZ}/PurpleSource221/v4/f5/9d/b1/f59db1a5-8f90-ebf8-24f9-e7205eecd573/03_iphone67.png/800x1734bb.jpg`,
  br01: `${MZ}/PurpleSource211/v4/c7/76/a2/c776a253-3770-f49a-43cb-78e5c1c6da41/01-offset-hardware.png/800x1734bb.jpg`,
  br02: `${MZ}/PurpleSource211/v4/7a/8b/53/7a8b5325-d24b-889f-1c86-88c2dcbecf15/02-offset-marks.png/800x1734bb.jpg`,
  br03: `${MZ}/PurpleSource221/v4/23/52/b1/2352b11c-07e3-18ef-7550-8670c70affa4/03-ninety.png/800x1734bb.jpg`,
  crIcon: `${MZ}/Purple211/v4/90/e5/6c/90e56c35-c8a4-f397-66eb-58f16197dfe9/AppIcon-0-0-1x_U007epad-0-1-85-220.png/256x256bb.png`,
  brIcon: `${MZ}/Purple211/v4/7a/01/42/7a014266-4376-3424-5a54-e1f66daf97f2/AppIcon-0-0-1x_U007epad-0-1-85-220.png/256x256bb.png`,
};
const LOCAL: typeof REMOTE = {
  electrician: "/photos/jason-electrician.jpg",
  hardhat: "/photos/jason-hardhat.jpg",
  homeEvening: "/photos/home-evening.jpg",
  blueprint: "/photos/blueprint-texture.jpg",
  lift: "/photos/jason-lift.jpg",
  jobsite: "/photos/jason-jobsite.jpg",
  cr01: "/screens/cr-01.jpg",
  cr02: "/screens/cr-02.jpg",
  cr03: "/screens/cr-03.jpg",
  br01: "/screens/br-01.jpg",
  br02: "/screens/br-02.jpg",
  br03: "/screens/br-03.jpg",
  crIcon: "/screens/cr-icon.png",
  brIcon: "/screens/br-icon.png",
};
export const A = REMOTE_ASSETS ? REMOTE : LOCAL;

// Sizes (px) for next/image
export const SIZE = {
  electrician: { w: 800, h: 1779 },
  hardhat: { w: 800, h: 1067 },
  homeEvening: { w: 1600, h: 893 },
  lift: { w: 1200, h: 1600 },
  jobsite: { w: 1200, h: 1600 },
  screen: { w: 800, h: 1734 },
};

export const SCREENS = [
  { src: A.cr01, alt: "ChargeRight on iPhone: panel utilization gauge, 200A panel, 54A available, Ready for EV Charger" },
  { src: A.br01, alt: "BendRight on iPhone: offset bend, rise from strut to box knockout, 1 1/8 inch" },
  { src: A.cr02, alt: "ChargeRight on iPhone: the assessment step that asks for a photo of the electrical panel, showing a panel with the door open." },
  { src: A.br02, alt: "BendRight on iPhone: offset marks, 2 1/4 inches between marks, with the finished offset and the marks on the stick." },
  { src: A.cr03, alt: "ChargeRight on iPhone: the home questions screen with panel size, square footage, heating type and appliances." },
  { src: A.br03, alt: "BendRight on iPhone: the 90 degree stub-up screen with a 12 inch stub and a mark at 7 inches from the end." },
];

export const STORE = {
  chargeright: "https://apps.apple.com/us/app/chargeright/id6755695416",
  bendright: "https://apps.apple.com/us/app/bendright/id6779847124",
  chargerightWeb: "https://evchargeright.com",
  zombiewells: "https://zombiewells.com",
};
