import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static output: deploys to Netlify as plain files, no server, no runtime cost.
  output: "export",
  images: { unoptimized: true },
  // Keep the repo to just the site — no generated agent instruction files.
  agentRules: false,
};

export default nextConfig;
