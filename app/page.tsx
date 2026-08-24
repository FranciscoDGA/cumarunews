import { getAllPosts, getPostsDestaques } from "@/lib/posts";
import CardNoticia from "@/components/CardNoticia";
import { SITE, CATEGORIAS } from "@/lib/config";
import Link from "next/link";

export const revalidate = 60;

export default function HomePage() {
  const destaques = getPostsDestaques();
  const todasNoticias = getAllPosts();

  const [principal, ...secundarias] = destaques;
  const ultimasNoticias = todasNoticias.slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* DESTAQUE PRINCIPAL */}
      {destaques.length > 0 && (
        <section className="mb-8">
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
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#0a2240] border-l-4 border-[#e63946] pl-3">
              Últimas Notícias
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ultimasNoticias.map((post) => (
              <CardNoticia key={post.slug} post={post} variant="vertical" />
            ))}
          </div>

          {todasNoticias.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-500">
              <p className="text-lg font-medium">Nenhuma notícia publicada ainda.</p>
              <p className="text-sm mt-1">Adicione arquivos .md em <code>content/noticias/</code></p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
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
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#e63946] transition-colors">
                      {cat.label}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mais lidas */}
          {ultimasNoticias.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-bold text-[#0a2240] mb-4 border-l-4 border-[#e63946] pl-3">
                Mais Recentes
              </h3>
              <div className="space-y-4">
                {ultimasNoticias.slice(0, 5).map((post, i) => (
                  <div key={post.slug} className="flex gap-3 items-start">
                    <span className="text-2xl font-black text-gray-200 leading-none w-7 shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <CardNoticia post={post} variant="horizontal" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sobre o portal */}
          <div className="bg-[#0a2240] text-white rounded-xl p-5">
            <h3 className="font-bold mb-2">Sobre o CumaruNews</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {SITE.description}
            </p>
            <Link
              href="/quem-somos"
              className="inline-block mt-3 text-sm font-semibold text-[#e63946] hover:underline"
            >
              Saiba mais →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
