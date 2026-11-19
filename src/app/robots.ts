import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/content/facts";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/netlify-forms/"] },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
