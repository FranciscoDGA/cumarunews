import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política Editorial",
  description: "Conheça os princípios editoriais do CumaruNews — como apuramos, verificamos e publicamos notícias.",
};

export default function PoliticaEditorialPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-[#0a2240] mb-2">Política Editorial</h1>
      <div className="w-12 h-1 bg-[#e63946] mb-8 rounded" />

      <div className="prose prose-lg max-w-none prose-headings:text-[#0a2240]">
        <h2>1. Princípios fundamentais</h2>
        <p>
          O CumaruNews opera com base nos princípios de precisão, equidade, independência e
          responsabilidade. Toda publicação passa por verificação editorial antes de ser publicada.
        </p>

        <h2>2. Verificação de fontes</h2>
        <p>
          Toda notícia publicada no CumaruNews deve ter ao menos uma fonte identificada. Para fatos
          relevantes e de interesse público, buscamos sempre a confirmação de fontes primárias —
          órgãos públicos, autoridades ou envolvidos no fato.
        </p>

        <h2>3. Autoria e responsabilidade</h2>
        <p>
          Todos os artigos publicados identificam o autor responsável pelo conteúdo. Artigos de
          opinião são claramente sinalizados como tal e não representam a posição editorial do portal.
        </p>

        <h2>4. Conteúdo patrocinado</h2>
        <p>
          Conteúdo patrocinado, publieditoriais e anúncios são claramente identificados como
          "Publicidade" ou "Conteúdo Patrocinado", separados do conteúdo jornalístico.
        </p>

        <h2>5. Uso de inteligência artificial</h2>
        <p>
          O CumaruNews pode utilizar ferramentas de inteligência artificial como auxílio na
          produção de conteúdo. Todo conteúdo gerado com auxílio de IA é revisado, editado
          e validado por um jornalista ou editor humano antes da publicação.
        </p>

        <h2>6. Direito de resposta</h2>
        <p>
          Pessoas, organizações ou instituições citadas em reportagens têm direito de resposta.
          Entre em contato pela nossa página de contato.
        </p>

        <h2>7. Correções</h2>
        <p>
          Erros factuais são corrigidos com transparência. A correção é registrada no próprio
          artigo, indicando o que foi alterado e quando.
        </p>
      </div>
    </div>
  );
}
