import type { Metadata } from "next";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Quem Somos",
  description: `Conheça o CumaruNews — portal de notícias hiperlocal de Cumarú do Norte, Pará.`,
};

export default function QuemSomosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-[#0a2240] mb-2">Quem Somos</h1>
      <div className="w-12 h-1 bg-[#e63946] mb-8 rounded" />

      <div className="prose prose-lg max-w-none prose-headings:text-[#0a2240]">
        <p>
          O <strong>CumaruNews</strong> é um portal de notícias hiperlocal dedicado a Cumarú do Norte
          e aos municípios do sul do Pará, incluindo Santana do Araguaia, Santa Maria das Barreiras,
          Pau D'Arco e região.
        </p>

        <h2>Nossa missão</h2>
        <p>
          Levar informação local de qualidade, rápida e verificada para os moradores de Cumarú do Norte
          e região. Acreditamos que o jornalismo hiperlocal é fundamental para a democracia e para o
          desenvolvimento das comunidades do interior do Pará.
        </p>

        <h2>Nossa equipe</h2>
        <p>
          O portal é mantido por jornalistas e colaboradores locais, com profundo conhecimento da
          realidade regional. Trabalhamos com rigor editorial, verificação de fontes e compromisso
          com a verdade.
        </p>

        <h2>Responsável editorial</h2>
        <p>
          <strong>Francisco Souza</strong> — Editor-chefe e responsável pelo portal.<br />
          Contato: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>

        <h2>Registro</h2>
        <p>
          CumaruNews é um veículo de comunicação registrado com CNPJ 00.000.000/0001-00,
          sediado em {SITE.address}.
        </p>

        <h2>Política de correções</h2>
        <p>
          O CumaruNews se compromete a corrigir prontamente qualquer erro factual identificado
          em nossas publicações. Correções são sinalizadas de forma transparente no próprio artigo
          com data e descrição da alteração realizada.
        </p>
      </div>
    </div>
  );
}
