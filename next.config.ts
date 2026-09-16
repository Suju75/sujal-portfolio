import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the repo to just the site — no generated agent instruction files.
  agentRules: false,
};

export default nextConfig;
