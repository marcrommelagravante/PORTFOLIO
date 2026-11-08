import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  webpack: (config, { dev }) => {
    if (dev) {
      // Use memory cache during development to prevent OneDrive file-locking conflicts with Webpack pack files
      config.cache = {
        type: "memory",
      };
    }
    return config;
  },
};

export default nextConfig;
