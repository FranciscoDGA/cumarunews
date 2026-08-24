import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { SITE, CATEGORIAS } from "@/lib/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import CardNoticia from "@/components/CardNoticia";

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

  const allPosts = getAllPosts();
  // Pega 3 notícias recentes da mesma categoria (ou gerais, se não tiver) exclíundo a atual
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.categoria === post.categoria)
    .slice(0, 3);
  
  if (relatedPosts.length < 3) {
    const extraPosts = allPosts.filter(p => p.slug !== post.slug && p.categoria !== post.categoria).slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...extraPosts);
  }

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
  const shareUrl = `${SITE.url}/noticia/${post.slug}`;
  const encodedTitle = encodeURIComponent(post.titulo);

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

        {/* Meta do artigo e Botões de Compartilhamento */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-4">
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
          
          {/* Share buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Compartilhe:</span>
            <a href={`https://api.whatsapp.com/send?text=${encodedTitle} - ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors" aria-label="Compartilhar no WhatsApp">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors" aria-label="Compartilhar no Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="bg-sky-500 hover:bg-sky-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors" aria-label="Compartilhar no Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
          </div>
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

        {/* Espaço para Anúncio (Simulação) */}
        <div className="my-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <span className="text-gray-400 font-medium text-sm mb-1">Espaço Publicitário</span>
          <p className="text-gray-500 text-sm">Anuncie aqui e seja visto por milhares de pessoas em Cumarú do Norte.</p>
          <a href={`https://wa.me/5594984478168`} target="_blank" rel="noopener noreferrer" className="mt-3 text-[#e63946] font-bold text-sm hover:underline">
            Fale com a Redação
          </a>
        </div>

        {/* Conteúdo */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-[#0a2240] prose-headings:font-bold prose-a:text-[#e63946] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-blockquote:border-l-4 prose-blockquote:border-[#e63946] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-strong:text-[#0a2240]"
          dangerouslySetInnerHTML={{ __html: post.conteudo }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">Tags relacionadas:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full cursor-default">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter (Captura de email) */}
        <div className="mt-10 bg-[#0a2240] text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="md:w-1/2">
            <h3 className="text-xl font-bold mb-2">Não perca nada! 📩</h3>
            <p className="text-sm text-gray-300">
              Assine nossa newsletter gratuita e receba as principais notícias de Cumarú do Norte direto no seu e-mail.
            </p>
          </div>
          <form className="w-full md:w-1/2 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="w-full px-4 py-2.5 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e63946]"
              required
            />
            <button type="submit" className="bg-[#e63946] hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors whitespace-nowrap">
              Assinar
            </button>
          </form>
        </div>

        {/* Aviso editorial */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl text-sm text-gray-600 border border-gray-100">
          <strong>Nota editorial:</strong> Esta reportagem foi produzida com base em apuração e fontes identificadas no texto. 
          Viu algo de errado ou quer enviar uma denúncia? <Link href="/contato" className="text-[#e63946] font-semibold hover:underline">Fale com a gente</Link>.
        </div>

        {/* Seção Leia Também */}
        <div className="mt-16 pt-8 border-t-2 border-gray-100">
          <h2 className="text-2xl font-black text-[#0a2240] mb-6 border-l-4 border-[#e63946] pl-3">
            Leia Também
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <CardNoticia key={relatedPost.slug} post={relatedPost} variant="vertical" />
            ))}
          </div>
        </div>

      </article>
    </>
  );
}
