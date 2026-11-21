import { getPostsByCategoria } from "@/lib/posts";
import { CATEGORIAS, pageAlternates } from "@/lib/config";
import CardNoticia from "@/components/CardNoticia";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIAS.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: cat.label,
    description: `Notícias de ${cat.label} em Cumarú do Norte e região sul do Pará.`,
    alternates: pageAlternates(`/categoria/${slug}`),
  };
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORIAS.find((c) => c.slug === slug);
  if (!cat) notFound();
  const posts = getPostsByCategoria(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div
          className="inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-3"
          style={{ backgroundColor: cat.cor }}
        >
          Editoria
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0a2240]">{cat.label}</h1>
        <p className="text-gray-600 mt-1 text-sm">
          {posts.length === 0
            ? "Esta editoria ainda não recebeu publicações."
            : `${posts.length} ${posts.length === 1 ? "notícia publicada" : "notícias publicadas"} nesta editoria`}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 text-center max-w-2xl mx-auto">
          <p className="text-base font-bold text-[#0a2240]">
            Nenhuma publicação em {cat.label} no momento
          </p>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Novos conteúdos serão exibidos aqui assim que publicados pela redação.
            Você pode conferir as notícias mais recentes ou enviar um comunicado para a equipe.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-[#0a2240] text-white text-sm font-semibold hover:bg-[#133b6e] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e63946]"
            >
              Ver últimas notícias
            </Link>
            <Link
              href="/contato"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:border-[#e63946] hover:text-[#e63946] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e63946]"
            >
              Enviar pauta ou comunicado
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <CardNoticia key={post.slug} post={post} variant="vertical" />
          ))}
        </div>
      )}
    </div>
  );
}
