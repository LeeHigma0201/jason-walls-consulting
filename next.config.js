/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
        ],
      },
    ];
  },
};
