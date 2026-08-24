import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade (LGPD)",
  description:
    "Saiba como o CumaruNews coleta, usa, armazena e protege seus dados pessoais, em conformidade com a Lei 13.709/2018 (LGPD).",
};

export default function PrivacidadePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-[#0a2240] mb-2">
        Política de Privacidade
      </h1>
      <div className="w-12 h-1 bg-[#e63946] mb-3 rounded" />
      <p className="text-sm text-gray-500 mb-10">
        Última atualização: agosto de 2026 &nbsp;|&nbsp; Em conformidade com a{" "}
        <strong>Lei 13.709/2018 (LGPD)</strong> e demais normas aplicáveis.
      </p>

      {/* Sumário */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-10">
        <h2 className="font-bold text-[#0a2240] text-sm uppercase tracking-wider mb-3">
          Sumário
        </h2>
        <ol className="space-y-1 text-sm text-gray-600 list-decimal list-inside">
          <li><a href="#controlador" className="hover:text-[#e63946] transition-colors">Controlador dos dados</a></li>
          <li><a href="#dados-coletados" className="hover:text-[#e63946] transition-colors">Dados coletados</a></li>
          <li><a href="#finalidade" className="hover:text-[#e63946] transition-colors">Finalidade e base legal do tratamento</a></li>
          <li><a href="#cookies" className="hover:text-[#e63946] transition-colors">Cookies e tecnologias de rastreamento</a></li>
          <li><a href="#publicidade" className="hover:text-[#e63946] transition-colors">Publicidade e Google AdSense</a></li>
          <li><a href="#compartilhamento" className="hover:text-[#e63946] transition-colors">Compartilhamento de dados</a></li>
          <li><a href="#armazenamento" className="hover:text-[#e63946] transition-colors">Armazenamento e segurança</a></li>
          <li><a href="#retencao" className="hover:text-[#e63946] transition-colors">Retenção e exclusão dos dados</a></li>
          <li><a href="#direitos" className="hover:text-[#e63946] transition-colors">Seus direitos como titular (LGPD)</a></li>
          <li><a href="#menores" className="hover:text-[#e63946] transition-colors">Proteção de menores de idade</a></li>
          <li><a href="#links" className="hover:text-[#e63946] transition-colors">Links para sites externos</a></li>
          <li><a href="#alteracoes" className="hover:text-[#e63946] transition-colors">Alterações nesta política</a></li>
          <li><a href="#dpo" className="hover:text-[#e63946] transition-colors">Encarregado de dados (DPO)</a></li>
        </ol>
      </div>

      <div className="prose prose-lg max-w-none prose-headings:text-[#0a2240] prose-headings:font-bold prose-a:text-[#e63946] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0a2240]">

        {/* 1 */}
        <h2 id="controlador">1. Controlador dos dados</h2>
        <p>
          O responsável pelo tratamento dos seus dados pessoais é:
        </p>
        <div className="not-prose bg-blue-50 border border-blue-100 rounded-xl p-5 my-4 text-sm text-gray-700 space-y-1">
          <p><strong>Razão social:</strong> CumaruNews</p>
          <p><strong>CNPJ:</strong> 24.824.190/0001-18</p>
          <p><strong>Endereço:</strong> Cumarú do Norte – PA, CEP 68.398-000</p>
          <p><strong>E-mail:</strong>{" "}
            <a href="mailto:cumaru@cumarunews.com.br" className="text-[#e63946] hover:underline">
              cumaru@cumarunews.com.br
            </a>
          </p>
          <p><strong>Responsável editorial:</strong> Francisco Gomes</p>
        </div>
        <p>
          O CumaruNews é um portal de jornalismo hiperlocal dedicado a Cumarú do Norte
          e região sul do Pará. Todo o tratamento de dados descrito nesta política é
          realizado exclusivamente no contexto da operação do portal de notícias.
        </p>

        {/* 2 */}
        <h2 id="dados-coletados">2. Dados coletados</h2>
        <p>
          O CumaruNews coleta as seguintes categorias de dados, de forma automática ou
          mediante fornecimento voluntário pelo usuário:
        </p>
        <h3>2.1 Dados coletados automaticamente</h3>
        <ul>
          <li><strong>Endereço IP</strong> — para fins de segurança e análise de audiência.</li>
          <li><strong>Dados de navegação</strong> — páginas visitadas, tempo de permanência, cliques e origem do acesso (via Google Analytics).</li>
          <li><strong>Informações do dispositivo</strong> — tipo de navegador, sistema operacional, resolução de tela e idioma.</li>
          <li><strong>Cookies e identificadores</strong> — conforme descrito na seção 4 desta política.</li>
        </ul>
        <h3>2.2 Dados fornecidos voluntariamente</h3>
        <ul>
          <li><strong>Nome e e-mail</strong> — quando você preenche nosso formulário de contato.</li>
          <li><strong>Telefone/WhatsApp</strong> — quando informado voluntariamente no formulário.</li>
          <li><strong>Conteúdo da mensagem</strong> — quando você nos envia uma pauta, denúncia ou direito de resposta.</li>
        </ul>
        <p>
          <strong>Não coletamos</strong> dados sensíveis (como origem racial, convicções
          religiosas, dados de saúde ou biométricos) nem dados financeiros.
        </p>

        {/* 3 */}
        <h2 id="finalidade">3. Finalidade e base legal do tratamento</h2>
        <p>
          Tratamos seus dados pessoais para as finalidades e com as bases legais
          indicadas abaixo, conforme os artigos 7º e 11 da LGPD:
        </p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-[#0a2240] text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Finalidade</th>
                <th className="px-4 py-3 text-left font-semibold">Base legal (LGPD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Análise de audiência e melhoria do portal", "Legítimo interesse (art. 7º, IX)"],
                ["Exibição de publicidade contextual (AdSense)", "Consentimento (art. 7º, I)"],
                ["Atendimento ao formulário de contato", "Execução de contrato / legítimo interesse (art. 7º, V e IX)"],
                ["Segurança, prevenção a fraudes e abusos", "Legítimo interesse (art. 7º, IX)"],
                ["Cumprimento de obrigação legal", "Obrigação legal (art. 7º, II)"],
              ].map(([fin, base]) => (
                <tr key={fin} className="even:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{fin}</td>
                  <td className="px-4 py-3 text-gray-500">{base}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4 */}
        <h2 id="cookies">4. Cookies e tecnologias de rastreamento</h2>
        <p>
          Utilizamos cookies — pequenos arquivos de texto armazenados no seu navegador —
          para garantir o funcionamento do portal e melhorar sua experiência.
        </p>
        <h3>4.1 Tipos de cookies utilizados</h3>
        <ul>
          <li>
            <strong>Cookies essenciais:</strong> necessários para o funcionamento básico
            do site. Não podem ser desativados sem comprometer a navegação.
          </li>
          <li>
            <strong>Cookies analíticos (Google Analytics):</strong> coletam dados
            estatísticos de navegação de forma agregada e anônima, como número de
            visitantes, páginas mais acessadas e tempo de permanência.
          </li>
          <li>
            <strong>Cookies de publicidade (Google AdSense):</strong> utilizados para
            exibir anúncios relevantes com base em suas preferências e histórico de
            navegação.
          </li>
        </ul>
        <h3>4.2 Como gerenciar os cookies</h3>
        <p>
          Você pode configurar seu navegador para recusar, excluir ou ser notificado
          sobre cookies. Consulte as instruções do seu navegador:
        </p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/pt-BR/kb/cookies-informacoes-sites-colocam-no-computador" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
          <li><a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        </ul>
        <p>
          A desativação de cookies pode limitar algumas funcionalidades do portal.
        </p>

        {/* 5 */}
        <h2 id="publicidade">5. Publicidade e Google AdSense</h2>
        <p>
          O CumaruNews utiliza o serviço <strong>Google AdSense</strong> para exibir
          anúncios. Por meio desse serviço, o Google pode utilizar cookies para exibir
          anúncios baseados em visitas anteriores a este e a outros sites na internet.
        </p>
        <p>
          O Google é um parceiro de publicidade de terceiros que possui sua própria
          política de privacidade, disponível em:{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            policies.google.com/privacy
          </a>
          .
        </p>
        <p>
          Você pode optar por não receber publicidade personalizada do Google acessando:{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            adssettings.google.com
          </a>
          .
        </p>
        <p>
          <strong>Importante:</strong> o CumaruNews não tem acesso nem controle sobre
          os cookies utilizados pelos anunciantes terceiros e não é responsável pelas
          práticas de privacidade desses parceiros.
        </p>

        {/* 6 */}
        <h2 id="compartilhamento">6. Compartilhamento de dados</h2>
        <p>
          O CumaruNews <strong>não vende, aluga ou comercializa</strong> seus dados
          pessoais. Compartilhamos informações apenas nas seguintes situações:
        </p>
        <ul>
          <li>
            <strong>Prestadores de serviço:</strong> parceiros que auxiliam na operação
            do portal (ex.: Google Analytics, Google AdSense, serviço de formulário),
            que atuam como operadores e estão sujeitos a termos de proteção de dados.
          </li>
          <li>
            <strong>Obrigação legal:</strong> quando exigido por lei, ordem judicial ou
            autoridade competente.
          </li>
          <li>
            <strong>Proteção de direitos:</strong> quando necessário para proteger os
            direitos, a propriedade ou a segurança do CumaruNews, de nossos usuários ou
            de terceiros.
          </li>
        </ul>

        {/* 7 */}
        <h2 id="armazenamento">7. Armazenamento e segurança</h2>
        <p>
          Os dados tratados pelo CumaruNews são armazenados em servidores localizados
          no Brasil e/ou no exterior (servidores da Vercel e Google), com adoção de
          medidas técnicas e administrativas de segurança adequadas, incluindo:
        </p>
        <ul>
          <li>Conexão criptografada via HTTPS (TLS 1.2/1.3)</li>
          <li>Controle de acesso restrito a usuários autorizados</li>
          <li>Monitoramento de tentativas de acesso não autorizado</li>
          <li>Atualizações regulares de software e infraestrutura</li>
        </ul>
        <p>
          Apesar de nossos esforços, nenhum sistema de segurança é absolutamente
          infalível. Em caso de incidente de segurança que possa causar risco ou dano
          relevante aos titulares, comunicaremos a Autoridade Nacional de Proteção de
          Dados (ANPD) e os afetados conforme previsto na LGPD.
        </p>

        {/* 8 */}
        <h2 id="retencao">8. Retenção e exclusão dos dados</h2>
        <p>
          Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades
          para as quais foram coletados, ou conforme exigido por lei:
        </p>
        <ul>
          <li><strong>Dados de navegação (Analytics):</strong> até 26 meses, conforme configuração padrão do Google Analytics.</li>
          <li><strong>Dados do formulário de contato:</strong> até 2 anos após o último contato.</li>
          <li><strong>Dados para cumprimento de obrigação legal:</strong> pelo prazo exigido pela legislação aplicável.</li>
        </ul>
        <p>
          Após o término do prazo de retenção, os dados são excluídos ou anonimizados.
        </p>

        {/* 9 */}
        <h2 id="direitos">9. Seus direitos como titular (LGPD)</h2>
        <p>
          Nos termos dos artigos 17 a 22 da Lei 13.709/2018 (LGPD), você tem os
          seguintes direitos em relação aos seus dados pessoais:
        </p>
        <ul>
          <li><strong>Confirmação e acesso:</strong> saber se tratamos seus dados e obter cópia deles.</li>
          <li><strong>Correção:</strong> solicitar a atualização ou correção de dados incompletos, inexatos ou desatualizados.</li>
          <li><strong>Anonimização, bloqueio ou eliminação:</strong> de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD.</li>
          <li><strong>Portabilidade:</strong> obter seus dados em formato estruturado para transferência a outro fornecedor.</li>
          <li><strong>Eliminação:</strong> solicitar a exclusão dos dados tratados com base em consentimento.</li>
          <li><strong>Revogação do consentimento:</strong> retirar seu consentimento a qualquer momento, sem prejuízo de tratamentos realizados anteriormente.</li>
          <li><strong>Informação sobre compartilhamento:</strong> saber com quais entidades públicas ou privadas compartilhamos seus dados.</li>
          <li><strong>Oposição:</strong> se opor a tratamentos realizados com base em legítimo interesse.</li>
          <li><strong>Revisão de decisões automatizadas:</strong> solicitar revisão de decisões tomadas exclusivamente com base em tratamento automatizado.</li>
        </ul>
        <p>
          Para exercer qualquer um desses direitos, entre em contato conosco pelo
          e-mail{" "}
          <a href="mailto:cumaru@cumarunews.com.br">cumaru@cumarunews.com.br</a> ou
          pelo nosso{" "}
          <Link href="/contato">formulário de contato</Link>.
          Responderemos em até <strong>15 dias úteis</strong>.
        </p>

        {/* 10 */}
        <h2 id="menores">10. Proteção de menores de idade</h2>
        <p>
          O CumaruNews é um veículo de informação de interesse geral e não coleta
          intencionalmente dados pessoais de crianças menores de 13 anos. Caso
          identifiquemos que coletamos, por engano, dados de uma criança sem
          consentimento dos pais ou responsáveis, excluiremos essas informações
          imediatamente.
        </p>
        <p>
          Se você acredita que coletamos dados de um menor sem autorização adequada,
          entre em contato pelo e-mail{" "}
          <a href="mailto:cumaru@cumarunews.com.br">cumaru@cumarunews.com.br</a>.
        </p>

        {/* 11 */}
        <h2 id="links">11. Links para sites externos</h2>
        <p>
          Nosso portal pode conter links para sites de terceiros (fontes jornalísticas,
          órgãos públicos, redes sociais etc.). O CumaruNews não se responsabiliza pelas
          práticas de privacidade de sites externos. Recomendamos que você leia as
          políticas de privacidade de cada site que visitar.
        </p>

        {/* 12 */}
        <h2 id="alteracoes">12. Alterações nesta política</h2>
        <p>
          Esta Política de Privacidade pode ser atualizada periodicamente para refletir
          mudanças em nossas práticas, na legislação aplicável ou em nossos serviços.
          Quando houver alterações relevantes, publicaremos a nova versão nesta página
          com a data de atualização.
        </p>
        <p>
          Recomendamos que você revise esta página regularmente. O uso continuado do
          portal após a publicação de alterações constitui aceitação das novas condições.
        </p>

        {/* 13 */}
        <h2 id="dpo">13. Encarregado de dados (DPO)</h2>
        <p>
          Nos termos do artigo 41 da LGPD, o encarregado pelo tratamento de dados
          pessoais do CumaruNews é:
        </p>
        <div className="not-prose bg-[#0a2240]/5 border border-[#0a2240]/10 rounded-xl p-5 my-4 text-sm text-gray-700 space-y-1">
          <p><strong>Nome:</strong> Francisco Gomes</p>
          <p><strong>E-mail:</strong>{" "}
            <a href="mailto:cumaru@cumarunews.com.br" className="text-[#e63946] hover:underline">
              cumaru@cumarunews.com.br
            </a>
          </p>
          <p><strong>CNPJ:</strong> 24.824.190/0001-18</p>
          <p><strong>Endereço:</strong> Cumarú do Norte – PA, CEP 68.398-000</p>
        </div>
        <p>
          Você também pode entrar em contato com a{" "}
          <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">
            Autoridade Nacional de Proteção de Dados (ANPD)
          </a>{" "}
          caso considere que seus direitos foram violados.
        </p>
      </div>

      {/* Rodapé da política */}
      <div className="mt-12 pt-6 border-t border-gray-100 text-xs text-gray-400 text-center space-y-1">
        <p>© {new Date().getFullYear()} CumaruNews — CNPJ 24.824.190/0001-18 — Cumarú do Norte – PA, CEP 68.398-000</p>
        <p>
          Dúvidas?{" "}
          <Link href="/contato" className="text-[#e63946] hover:underline">
            Entre em contato
          </Link>
        </p>
      </div>
    </div>
  );
}
