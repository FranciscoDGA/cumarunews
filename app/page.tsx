import { getAllPosts, getPostsDestaques, Post } from "@/lib/posts";
import CardNoticia from "@/components/CardNoticia";
import { SITE, CATEGORIAS, pageAlternates } from "@/lib/config";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: pageAlternates("/"),
};

function isNoticiaDeCumaru(post: Post): boolean {
  const texto = `${post.titulo} ${post.descricao} ${post.tags.join(" ")}`.toLowerCase();
  return texto.includes("cumaru") || texto.includes("cumarú");
}

export default function HomePage() {
  const destaques = getPostsDestaques();
  const todasNoticias = getAllPosts();

  const [principal, ...secundarias] = destaques;
  const heroSlugs = new Set(
    [principal, ...secundarias.slice(0, 2)].filter(Boolean).map((p) => p.slug)
  );

  // Destaca notícias de Cumarú do Norte sem repetir o que já está no topo
  const noticiasCumaru = todasNoticias
    .filter((p) => !heroSlugs.has(p.slug) && isNoticiaDeCumaru(p))
    .slice(0, 4);
  const cumaruSlugs = new Set(noticiasCumaru.map((p) => p.slug));

  // Demais notícias regionais e recentes, sem duplicar Hero nem bloco local
  const noticiasRegionais = todasNoticias
    .filter((p) => !heroSlugs.has(p.slug) && !cumaruSlugs.has(p.slug))
    .slice(0, 10);

  // Sidebar: 5 notícias recentes fora do Hero para reduzir repetição visual
  const maisRecentesSidebar = todasNoticias
    .filter((p) => !heroSlugs.has(p.slug))
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0a2240] border-l-4 border-[#e63946] pl-3 leading-tight">
          Notícias de Cumarú do Norte e região sul do Pará
        </h1>
        <Link
          href="/contato"
          className="self-start sm:self-auto text-xs font-bold text-[#0a2240] bg-white border border-gray-200 hover:border-[#e63946] hover:text-[#e63946] px-3 py-1.5 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e63946]"
        >
          Enviar pauta →
        </Link>
      </div>

      {/* DESTAQUE PRINCIPAL */}
      {destaques.length > 0 && (
        <section aria-label="Destaques principais" className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {principal && (
              <div className="lg:col-span-2">
                <CardNoticia post={principal} variant="destaque" />
              </div>
            )}
            <div className="flex flex-col gap-4">
              {secundarias.slice(0, 2).map((post) => (
                <CardNoticia key={post.slug} post={post} variant="destaque" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CORPO PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-10">
          {/* Bloco dedicado a Cumarú do Norte */}
          {noticiasCumaru.length > 0 && (
            <section aria-labelledby="heading-cumaru">
              <div className="flex items-center justify-between mb-4">
                <h2
                  id="heading-cumaru"
                  className="text-lg font-bold text-[#0a2240] border-l-4 border-[#e63946] pl-3"
                >
                  Em Cumarú do Norte
                </h2>
                <Link
                  href="/categoria/cidades"
                  className="text-xs font-semibold text-[#e63946] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e63946] rounded"
                >
                  Ver todas →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {noticiasCumaru.map((post) => (
                  <CardNoticia key={post.slug} post={post} variant="vertical" />
                ))}
              </div>
            </section>
          )}

          {/* Bloco regional e últimas notícias */}
          <section aria-labelledby="heading-ultimas">
            <div className="flex items-center justify-between mb-4">
              <h2
                id="heading-ultimas"
                className="text-lg font-bold text-[#0a2240] border-l-4 border-[#e63946] pl-3"
              >
                Sul do Pará e Últimas Notícias
              </h2>
            </div>

            {noticiasRegionais.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {noticiasRegionais.map((post) => (
                  <CardNoticia key={post.slug} post={post} variant="vertical" />
                ))}
              </div>
            ) : (
              todasNoticias.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-600">
                  <p className="text-lg font-medium">Nenhuma notícia publicada ainda.</p>
                  <p className="text-sm mt-1">
                    Adicione arquivos .md em <code>content/noticias/</code>
                  </p>
                </div>
              )
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6" aria-label="Navegação complementar">
          {/* Editorias */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-[#0a2240] mb-4 border-l-4 border-[#e63946] pl-3">
              Editorias
            </h3>
            <div className="space-y-1">
              {CATEGORIAS.map((cat) => {
                const count = todasNoticias.filter((p) => p.categoria === cat.slug).length;
                return (
                  <Link
                    key={cat.slug}
                    href={`/categoria/${cat.slug}`}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e63946]"
                  >
                    <span
                      className={`text-sm font-medium transition-colors ${
                        count > 0
                          ? "text-gray-700 group-hover:text-[#e63946]"
                          : "text-gray-500 group-hover:text-[#0a2240]"
                      }`}
                    >
                      {cat.label}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        count > 0
                          ? "bg-gray-100 text-gray-700 font-medium"
                          : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      {count > 0 ? count : "Sem notas"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mais recentes */}
          {maisRecentesSidebar.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-bold text-[#0a2240] mb-4 border-l-4 border-[#e63946] pl-3">
                Mais Recentes
              </h3>
              <div className="space-y-4">
                {maisRecentesSidebar.map((post, i) => (
                  <div key={post.slug} className="flex gap-3 items-start">
                    <span
                      className="text-2xl font-black text-gray-300 leading-none w-7 shrink-0 mt-0.5 select-none"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <CardNoticia post={post} variant="horizontal" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sobre o portal e envio de pauta */}
          <div className="bg-[#0a2240] text-white rounded-xl p-5">
            <h3 className="font-bold mb-2">Sobre o CumaruNews</h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              {SITE.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/quem-somos"
                className="text-sm font-semibold text-[#ff6b76] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
              >
                Saiba mais →
              </Link>
              <Link
                href="/contato"
                className="text-sm font-semibold text-white/90 hover:text-white underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
              >
                Fale com a Redação
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
