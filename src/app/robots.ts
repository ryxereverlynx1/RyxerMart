import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.APP_URL || "https://ryxermart.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/", "/checkout", "/order-success/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
