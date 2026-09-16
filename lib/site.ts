/**
 * Canonical origin for metadata, sitemap, and robots.
 * Vercel injects the production domain at build time, so this stays correct
 * even if the project's domain changes later.
 */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
