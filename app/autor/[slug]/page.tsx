import { getAllPosts } from "@/lib/posts";
import CardNoticia from "@/components/CardNoticia";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE } from "@/lib/config";

const AUTORES: Record<string, { nome: string; bio: string; cargo: string }> = {
  "redacao": {
    nome: "Redação CumaruNews",
    bio: "Conteúdos produzidos pela equipe de jornalistas do CumaruNews.",
    cargo: "Equipe Editorial",
  },
  "francisco-souza": {
    nome: "Francisco Souza",
    bio: "Editor-chefe do CumaruNews. Jornalista e empreendedor de mídia local no sul do Pará.",
    cargo: "Editor-chefe",
  },
};

export async function generateStaticParams() {
  return Object.keys(AUTORES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const autor = AUTORES[slug];
  if (!autor) return {};

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: autor.nome,
    jobTitle: autor.cargo,
    worksFor: { "@type": "NewsMediaOrganization", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/autor/${slug}`,
  };

  return {
    title: autor.nome,
    description: autor.bio,
    other: { "application/ld+json": JSON.stringify(personSchema) },
  };
}

export default async function AutorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const autor = AUTORES[slug];
  if (!autor) notFound();

  const posts = getAllPosts().filter((p) => p.autorSlug === slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-5 mb-10 p-6 bg-white rounded-xl border border-gray-100">
        <div className="w-16 h-16 bg-[#0a2240] rounded-full flex items-center justify-center text-white font-black text-2xl shrink-0">
          {autor.nome.charAt(0)}
        </div>
        <div>
          <p className="text-xs text-[#e63946] font-bold uppercase tracking-wider">{autor.cargo}</p>
          <h1 className="text-2xl font-black text-[#0a2240]">{autor.nome}</h1>
          <p className="text-gray-500 text-sm mt-1">{autor.bio}</p>
        </div>
      </div>

      <h2 className="text-lg font-bold text-[#0a2240] border-l-4 border-[#e63946] pl-3 mb-5">
        Artigos publicados ({posts.length})
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">Nenhum artigo publicado ainda.</p>
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
