// import NextBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.tsx");

// const withBundleAnalyzer = NextBundleAnalyzer({
//   enabled: process.env["ANALYZE"] === "true"
// });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  bundlePagesRouterDependencies: true,
  async headers() {
    return [
      {
        source: "/framer-image/dim/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  }
};

export default (withNextIntl(nextConfig));
