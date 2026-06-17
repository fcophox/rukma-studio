import type { MetadataRoute } from "next";
import { cms } from "@/lib/cms";

const BASE_URL = "https://rukma.studio";

// Service slugs — keep in sync with dictionaries
const serviceSlugs = [
  "diseno-y-estrategia-de-experiencia",
  "prototipado-mvp-y-codificacion",
  "brand-experience-e-identidad",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Contenido del CMS (locale por defecto 'es'). Si falla, no rompe el sitemap.
  let blogPages: MetadataRoute.Sitemap = [];
  let casePages: MetadataRoute.Sitemap = [];
  try {
    const [posts, cases] = await Promise.all([
      cms.articles.list({ category: "blog" }),
      cms.articles.list({ category: "casos" }),
    ]);

    blogPages = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));

    casePages = cases.map((c) => ({
      url: `${BASE_URL}/casos/${c.slug}`,
      lastModified: c.published_at ? new Date(c.published_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Sin credenciales / sin conexión: devuelve solo las páginas estáticas.
  }

  return [...staticPages, ...servicePages, ...blogPages, ...casePages];
}
