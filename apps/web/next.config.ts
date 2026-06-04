import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.47", "localhost"],
  turbopack: {
    root: "../../",
  },
};

export default nextConfig;
