import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                pathname: "/t/p/w500/**",
            },
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                pathname: "/t/p/w780/**",
            },

            {
                protocol: "https",
                hostname: "image.tmdb.org",
                pathname: "/t/p/w1280/**",
            },
        ],
        deviceSizes: [640, 750, 828, 1080],
    },
};

export default nextConfig;
