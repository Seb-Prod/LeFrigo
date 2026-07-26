import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.31", "localhost"],
  turbopack: {
    root: "../../",
  },
};

export default nextConfig;
