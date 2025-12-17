import type { NextConfig } from "next";

const nextConfig: NextConfig = {
        reactStrictMode: false,
        allowedDevOrigins: ["*"],
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
