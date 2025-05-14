import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["cdn.dummyjson.com"],
  },
};

export default nextConfig;
