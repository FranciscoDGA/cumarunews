import { getPostsByCategoria, getAllPosts } from "@/lib/posts";
import { CATEGORIAS } from "@/lib/config";
import CardNoticia from "@/components/CardNoticia";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIAS.find((c) => c.slug === slug);
  if (!cat) return {};
  return { title: cat.label, description: `Notícias de ${cat.label} em Cumarú do Norte e região sul do Pará.` };
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORIAS.find((c) => c.slug === slug);
  if (!cat) notFound();
  const posts = getPostsByCategoria(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="inline-block px-3 py-1 rounded-full text-white text-sm font-bold mb-3"
          style={{ backgroundColor: cat.cor }}>
          Editoria
        </div>
        <h1 className="text-3xl font-black text-[#0a2240]">{cat.label}</h1>
        <p className="text-gray-500 mt-1">
          {posts.length} {posts.length === 1 ? "notícia publicada" : "notícias publicadas"} nesta editoria
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-500">
          <p>Nenhuma notícia publicada nesta editoria ainda.</p>
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
