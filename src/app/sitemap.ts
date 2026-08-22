import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/profile";
import { getCaseStudyProjects } from "@/lib/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.website,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getCaseStudyProjects().map((project) => ({
      url: `${siteConfig.website}/realisations/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
