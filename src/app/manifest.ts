import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RyxerMart | Web Development & E-Commerce Solutions",
    short_name: "RyxerMart",
    description:
      "Modern, fast, mobile-friendly websites and e-commerce stores starting at ₹3,499 with 1 year free hosting and SSL included.",
    start_url: "/",
    display: "standalone",
    background_color: "#090D1A",
    theme_color: "#090D1A",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["business", "shopping", "productivity", "utilities"],
  };
}
