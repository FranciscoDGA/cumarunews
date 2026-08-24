import type { Metadata } from "next";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Política de Privacidade (LGPD)",
  description: "Saiba como o CumaruNews coleta, usa e protege seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-[#0a2240] mb-2">Política de Privacidade</h1>
      <div className="w-12 h-1 bg-[#e63946] mb-2 rounded" />
      <p className="text-sm text-gray-500 mb-8">Última atualização: agosto de 2026 | Conforme Lei 13.709/2018 (LGPD)</p>

      <div className="prose prose-lg max-w-none prose-headings:text-[#0a2240]">
        <h2>1. Controlador dos dados</h2>
        <p>
          CumaruNews, CNPJ 00.000.000/0001-00, {SITE.address}. Contato: {SITE.email}.
        </p>

        <h2>2. Dados coletados</h2>
        <p>Coletamos dados de navegação (cookies, endereço IP, páginas visitadas) por meio do
          Google Analytics e Google AdSense para fins de análise de audiência e exibição de publicidade.</p>

        <h2>3. Finalidade do tratamento</h2>
        <ul>
          <li>Análise de audiência e melhoria do portal</li>
          <li>Exibição de publicidade contextual (Google AdSense)</li>
          <li>Segurança e prevenção de fraudes</li>
        </ul>

        <h2>4. Cookies</h2>
        <p>
          Utilizamos cookies próprios e de terceiros (Google). Você pode gerenciar suas preferências
          de cookies nas configurações do seu navegador.
        </p>

        <h2>5. Publicidade (Google AdSense)</h2>
        <p>
          Utilizamos o Google AdSense para exibir anúncios. O Google pode usar cookies para exibir
          anúncios baseados em visitas anteriores dos usuários a este e a outros sites. Saiba mais em
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"> políticas de privacidade do Google</a>.
        </p>

        <h2>6. Seus direitos (LGPD)</h2>
        <p>Você tem direito a: acesso, correção, eliminação, portabilidade e revogação do consentimento.
          Entre em contato pelo e-mail {SITE.email}.</p>

        <h2>7. Contato do DPO</h2>
        <p>Encarregado de dados: {SITE.email}</p>
      </div>
    </div>
  );
}
