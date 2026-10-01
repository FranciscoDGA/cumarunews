import { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/api/rss", "/api/sitemap-news"],
        disallow: "/api/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: [
      `${SITE.url}/sitemap.xml`,
      `${SITE.url}/api/sitemap-news`,
    ],
  };
}
