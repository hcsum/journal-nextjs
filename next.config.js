/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Forwarded-Proto",
            value: "https",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
