import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/config";

// Gera o feed como rota estática no build — evita erros de fs em serverless
export const dynamic = "force-static";
export const revalidate = 300;

export async function GET() {
  try {
    const posts = getAllPosts().slice(0, 30);

    const items = posts
      .map((post) => {
        const url = `${SITE.url}/noticia/${post.slug}`;
        const pubDate = new Date(post.dataPublicacao).toUTCString();
        // Imagens externas (Unsplash) não usam enclosure pois precisam de length real
        const isExternal = post.imagemDestaque.startsWith("http");
        const enclosure = !isExternal && post.imagemDestaque
          ? `<enclosure url="${SITE.url}${post.imagemDestaque}" type="image/jpeg" length="0"/>`
          : "";
        return `
    <item>
      <title><![CDATA[${post.titulo}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.descricao}]]></description>
      <category><![CDATA[${post.categoria}]]></category>
      <author>${SITE.email} (${post.autor})</author>
      ${enclosure}
    </item>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${SITE.name}</title>
    <link>${SITE.url}</link>
    <description>${SITE.description}</description>
    <language>pt-br</language>
    <copyright>© ${new Date().getFullYear()} ${SITE.name}</copyright>
    <managingEditor>${SITE.email} (Francisco Gomes)</managingEditor>
    <webMaster>${SITE.email}</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>300</ttl>
    <atom:link href="${SITE.url}/api/rss" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE.url}/logo.svg</url>
      <title>${SITE.name}</title>
      <link>${SITE.url}</link>
    </image>
    ${items}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Erro ao gerar RSS:", error);
    return new Response("Erro ao gerar o feed RSS.", { status: 500 });
  }
}
