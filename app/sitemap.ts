import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { SITE, CATEGORIAS } from "@/lib/config";

export const revalidate = 300;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const baseUrl = SITE.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    { url: `${baseUrl}/quem-somos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contato`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/politica-editorial`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/politica-de-privacidade`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIAS.map((cat) => ({
    url: `${baseUrl}/categoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/noticia/${post.slug}`,
    lastModified: new Date(post.dataAtualizacao || post.dataPublicacao),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
