/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "evchargeright.com" },
      { protocol: "https", hostname: "zombiewells.com" },
      { protocol: "https", hostname: "**.mzstatic.com" },
    ],
  },
  async redirects() {
    // Old "doors" from the 2026-05 site. Keep inbound links alive.
    return [
      { source: "/book", destination: "/contact", permanent: true },
      { source: "/trades", destination: "/services", permanent: true },
      { source: "/templates", destination: "/services", permanent: true },
      { source: "/templates/:slug", destination: "/services", permanent: true },
      { source: "/story", destination: "/about", permanent: true },
      { source: "/lab", destination: "/process", permanent: true },
      { source: "/concepts", destination: "/process", permanent: true },
      { source: "/thanks", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          // No script-src yet: the pages carry inline scripts without nonces. Framing, base and form targets are locked.
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
        ],
      },
    ];
  },
};
