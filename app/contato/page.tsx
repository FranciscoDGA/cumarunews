import type { Metadata } from "next";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a redação do CumaruNews. Envie sua pauta, dica ou direito de resposta.",
};

export default function ContatoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-[#0a2240] mb-2">Contato</h1>
      <div className="w-12 h-1 bg-[#e63946] mb-8 rounded" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-bold text-[#0a2240] mb-4">Redação</h2>
          <div className="space-y-3 text-sm">
            <p className="flex gap-2 items-center text-gray-600">
              <span className="text-[#e63946]">✉</span>
              <a href={`mailto:${SITE.email}`} className="hover:text-[#e63946] transition-colors">{SITE.email}</a>
            </p>
            <p className="flex gap-2 items-center text-gray-600">
              <span className="text-[#e63946]">📱</span>
              <a href={SITE.social.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#e63946] transition-colors">
                WhatsApp da Redação
              </a>
            </p>
            <p className="flex gap-2 items-start text-gray-600">
              <span className="text-[#e63946]">📍</span>
              <span>{SITE.address}</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-bold text-[#0a2240] mb-4">Envie sua pauta</h2>
          <p className="text-sm text-gray-600 mb-3">
            Tem uma denúncia, sugestão de pauta ou informação relevante para a comunidade?
            Entre em contato com nossa redação.
          </p>
          <a
            href={`mailto:pautas@cumarunews.com.br`}
            className="inline-block bg-[#e63946] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            Enviar pauta
          </a>
        </div>
      </div>

      <div className="bg-[#0a2240]/5 rounded-xl p-6 text-sm text-gray-600">
        <p><strong>Direito de resposta e correções:</strong> Caso você seja citado em alguma de nossas reportagens e queira exercer o direito de resposta, ou tenha identificado um erro factual, entre em contato pelo e-mail <a href={`mailto:${SITE.email}`} className="font-medium text-[#e63946] hover:underline">{SITE.email}</a>.</p>
      </div>
    </div>
  );
}
