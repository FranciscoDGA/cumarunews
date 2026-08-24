import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { SITE, CATEGORIAS } from "@/lib/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.titulo,
    description: post.descricao,
    openGraph: {
      title: post.titulo,
      description: post.descricao,
      type: "article",
      publishedTime: post.dataPublicacao,
      modifiedTime: post.dataAtualizacao,
      authors: [post.autor],
      images: [{ url: post.imagemDestaque, width: 1200, height: 630, alt: post.imagemAlt }],
    },
    twitter: { card: "summary_large_image", title: post.titulo, description: post.descricao },
  };
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = CATEGORIAS.find((c) => c.slug === post.categoria);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.titulo,
    description: post.descricao,
    image: [`${SITE.url}${post.imagemDestaque}`],
    datePublished: post.dataPublicacao,
    dateModified: post.dataAtualizacao || post.dataPublicacao,
    author: {
      "@type": "Person",
      name: post.autor,
      url: `${SITE.url}/autor/${post.autorSlug}`,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/noticia/${post.slug}` },
    articleSection: cat?.label || post.categoria,
    keywords: post.tags.join(", "),
    inLanguage: SITE.language,
    isAccessibleForFree: true,
  };

  const dataFormatada = format(new Date(post.dataPublicacao), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#e63946] transition-colors">Início</Link>
          <span>/</span>
          {cat && (
            <>
              <Link href={`/categoria/${cat.slug}`} className="hover:text-[#e63946] transition-colors">
                {cat.label}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-400 line-clamp-1">{post.titulo}</span>
        </nav>

        {/* Categoria badge */}
        {cat && (
          <Link href={`/categoria/${cat.slug}`}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
              style={{ backgroundColor: cat.cor }}>
              {cat.label}
            </span>
          </Link>
        )}

        {/* Título */}
        <h1 className="text-2xl md:text-4xl font-black text-[#0a2240] leading-tight mb-4">
          {post.titulo}
        </h1>

        {/* Descrição/chapéu */}
        <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-[#e63946] pl-4 mb-6">
          {post.descricao}
        </p>

        {/* Meta do artigo */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
          <Link href={`/autor/${post.autorSlug}`} className="flex items-center gap-2 hover:text-[#e63946] transition-colors">
            <div className="w-8 h-8 bg-[#0a2240] rounded-full flex items-center justify-center text-white font-bold text-xs">
              {post.autor.charAt(0)}
            </div>
            <span className="font-medium">{post.autor}</span>
          </Link>
          <time dateTime={post.dataPublicacao} className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {dataFormatada}
          </time>
          {post.dataAtualizacao && (
            <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded">
              Atualizado: {format(new Date(post.dataAtualizacao), "d/MM/yyyy", { locale: ptBR })}
            </span>
          )}
        </div>

        {/* Imagem destaque */}
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 mb-8">
          <Image
            src={post.imagemDestaque}
            alt={post.imagemAlt}
            fill
            className="object-cover"
            priority
          />
          {post.imagemAlt && (
            <figcaption className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-3 py-1.5">
              {post.imagemAlt}
            </figcaption>
          )}
        </div>

        {/* Conteúdo */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-[#0a2240] prose-headings:font-bold prose-a:text-[#e63946] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-blockquote:border-[#e63946] prose-strong:text-[#0a2240]"
          dangerouslySetInnerHTML={{ __html: post.conteudo }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-default">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Aviso editorial */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl text-sm text-blue-800 border border-blue-100">
          <strong>Nota editorial:</strong> Esta reportagem foi produzida pela equipe do CumaruNews com base em fontes identificadas no texto.
          Encontrou algum erro? <Link href="/contato" className="font-semibold underline">Entre em contato</Link>.
        </div>
      </article>
    </>
  );
}
