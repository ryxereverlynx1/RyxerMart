import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.ryxer.site";
  const defaultLogo = `${baseUrl}/images/logo.png`;

  // Fetch all active service packages from database with resilient fallback
  let services: { slug: string; updatedAt: Date; thumbnail?: string | null }[] = [];
  try {
    services = await db.service.findMany({
      where: { active: true },
      select: { slug: true, updatedAt: true, thumbnail: true },
    });
  } catch (err) {
    console.warn("Could not query services for sitemap during build:", err);
    services = [
      { slug: "starter-website", updatedAt: new Date(), thumbnail: null },
      { slug: "royal-website", updatedAt: new Date(), thumbnail: null },
      { slug: "ecommerce-starter", updatedAt: new Date(), thumbnail: null },
      { slug: "ecommerce-premium", updatedAt: new Date(), thumbnail: null },
    ];
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
      images: [defaultLogo],
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      images: [defaultLogo],
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      images: [defaultLogo],
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [defaultLogo],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
      images: [defaultLogo],
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => {
    const imageUrl = s.thumbnail
      ? s.thumbnail.startsWith("http")
        ? s.thumbnail
        : `${baseUrl}${s.thumbnail}`
      : defaultLogo;

    return {
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "weekly",
      priority: 0.85,
      images: [imageUrl],
    };
  });

  return [...staticRoutes, ...serviceRoutes];
}
