import type { MetadataRoute } from "next";
import { mockPosts } from "@/data/mockPosts";
import { mockCases } from "@/data/mockCases";

const BASE_URL = "https://rukma.studio";

// Service slugs — keep in sync with dictionaries
const serviceSlugs = [
  "diseno-y-estrategia-de-experiencia",
  "prototipado-mvp-y-codificacion",
  "brand-experience-e-identidad",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/casos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  // Service detail pages
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/servicios/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = mockPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Case study pages
  const casePages: MetadataRoute.Sitemap = mockCases.map((c) => ({
    url: `${BASE_URL}/casos/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...casePages];
}
