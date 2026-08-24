import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/config";

export const revalidate = 300;

export async function GET() {
  const posts = getAllPosts().slice(0, 1000);

  const items = posts
    .map((post) => {
      const pubDate = new Date(post.dataPublicacao).toISOString();
      return `
    <url>
      <loc>${SITE.url}/noticia/${post.slug}</loc>
      <news:news>
        <news:publication>
          <news:name>${SITE.name}</news:name>
          <news:language>${SITE.language}</news:language>
        </news:publication>
        <news:publication_date>${pubDate}</news:publication_date>
        <news:title><![CDATA[${post.titulo}]]></news:title>
        <news:keywords><![CDATA[${post.tags.join(", ")}]]></news:keywords>
      </news:news>
    </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${items}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
    },
  });
}
