import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ["*"],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@designcombo/animations": path.resolve(
        __dirname,
        "packages/@designcombo/animations"
      ),
      "@designcombo/events": path.resolve(
        __dirname,
        "packages/@designcombo/events"
      ),
      "@designcombo/frames": path.resolve(
        __dirname,
        "packages/@designcombo/frames"
      ),
      "@designcombo/state": path.resolve(
        __dirname,
        "packages/@designcombo/state"
      ),
      "@designcombo/timeline": path.resolve(
        __dirname,
        "packages/@designcombo/timeline"
      ),
      "@designcombo/transitions": path.resolve(
        __dirname,
        "packages/@designcombo/transitions"
      ),
      "@designcombo/types": path.resolve(
        __dirname,
        "packages/@designcombo/types"
      ),
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
