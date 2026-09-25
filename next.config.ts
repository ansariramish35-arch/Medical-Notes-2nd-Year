import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Medical-Notes-2nd-Year",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
