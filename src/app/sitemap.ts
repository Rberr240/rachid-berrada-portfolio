import type { MetadataRoute } from "next";
import { getProfile } from "@/data/profile";
import { getCaseStudyProjects } from "@/lib/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const en = getProfile("en");
  const fr = getProfile("fr");
  const base = en.siteConfig.website;

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/fr`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...getCaseStudyProjects(en.projects).map((project) => ({
      url: `${base}/realisations/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getCaseStudyProjects(fr.projects).map((project) => ({
      url: `${base}/fr/realisations/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
