import type { MetadataRoute } from "next";
import { getProfile } from "@/data/profile";

export default function robots(): MetadataRoute.Robots {
  const { siteConfig } = getProfile("en");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.website}/sitemap.xml`,
  };
}
