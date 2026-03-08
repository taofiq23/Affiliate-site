import type { MetadataRoute } from "next";
import { bestLists, categories, comparisons, guides, products, siteConfig } from "@/lib/content-store";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/collection",
    "/story",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclosure"
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8
    })),
    ...products.map((product) => ({
      url: `${siteConfig.url}/reviews/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9
    })),
    ...bestLists.map((page) => ({
      url: `${siteConfig.url}/best/${page.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85
    })),
    ...comparisons.map((page) => ({
      url: `${siteConfig.url}/compare/${page.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...guides.map((page) => ({
      url: `${siteConfig.url}/guides/${page.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85
    })),
    ...categories.map((page) => ({
      url: `${siteConfig.url}/category/${page.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.75
    }))
  ];
}
