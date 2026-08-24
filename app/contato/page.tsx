"use client";
import { useState } from "react";
import { SITE } from "@/lib/config";


const ASSUNTOS = [
  "Envio de pauta",
  "Denúncia",
  "Direito de resposta",
  "Correção de matéria",
  "Publicidade",
  "Outro",
];

export default function ContatoPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    origem: "",
    mensagem: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://formsubmit.co/ajax/cumaru@cumarunews.com.br", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "📋 Origem": "Site CumaruNews — Página de Contato",
          "👤 Nome": form.nome,
          "📧 Email": form.email,
          "📱 Telefone": form.telefone || "Não informado",
          "📌 Assunto": form.assunto,
          "🔍 Como nos encontrou": form.origem || "Não informado",
          "💬 Mensagem": form.mensagem,
          _subject: `[CumaruNews] ${form.assunto} — ${form.nome}`,
          _captcha: "false",
          _template: "table",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ nome: "", email: "", telefone: "", assunto: "", origem: "", mensagem: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-[#0a2240] mb-2">Contato</h1>
      <div className="w-12 h-1 bg-[#e63946] mb-8 rounded" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informações */}
        <div className="space-y-5">
          {/* Redação */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-bold text-[#0a2240] mb-4 border-l-4 border-[#e63946] pl-3">
              Redação
            </h2>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:cumaru@cumarunews.com.br"
                className="flex gap-2 items-center text-gray-600 hover:text-[#e63946] transition-colors"
              >
                <span className="text-[#e63946] text-base">✉</span>
                cumaru@cumarunews.com.br
              </a>
              <a
                href={SITE.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center text-gray-600 hover:text-[#e63946] transition-colors"
              >
                <span className="text-base">📱</span>
                <span>(94) 98447-8168</span>
              </a>
              <p className="flex gap-2 items-start text-gray-600">
                <span className="text-base shrink-0">📍</span>
                <span>{SITE.address}</span>
              </p>
            </div>
          </div>

          {/* Envie sua pauta */}
          <div className="bg-[#0a2240] text-white rounded-xl p-5">
            <h2 className="font-bold mb-2">Envie sua pauta</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Tem uma denúncia, sugestão de pauta ou informação relevante para a
              comunidade? Fale com nossa redação pelo formulário ao lado ou pelo
              WhatsApp.
            </p>
            <a
              href={SITE.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <span>💬</span> WhatsApp
            </a>
          </div>

          {/* Direito de resposta */}
          <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-600 border border-gray-100">
            <p>
              <strong className="text-[#0a2240]">Direito de resposta e correções:</strong>{" "}
              Caso você seja citado em alguma de nossas reportagens e queira exercer o
              direito de resposta, ou tenha identificado um erro factual, entre em contato
              pelo formulário ou pelo e-mail{" "}
              <a
                href="mailto:cumaru@cumarunews.com.br"
                className="font-medium text-[#e63946] hover:underline"
              >
                cumaru@cumarunews.com.br
              </a>
              .
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8">
            <h2 className="font-bold text-[#0a2240] text-lg mb-6 border-l-4 border-[#e63946] pl-3">
              Envie uma mensagem
            </h2>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-4">
                  ✅
                </div>
                <h3 className="text-xl font-bold text-[#0a2240] mb-2">
                  Mensagem enviada!
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Recebemos seu contato. Nossa equipe retornará em breve para{" "}
                  <strong>{form.email || "o seu email"}</strong>.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-[#e63946] hover:underline font-semibold"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nome */}
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Seu nome <span className="text-[#e63946]">*</span>
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      value={form.nome}
                      onChange={handleChange}
                      placeholder="Francisco Gomes"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0a2240] focus:ring-2 focus:ring-[#0a2240]/10 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Seu e-mail <span className="text-[#e63946]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0a2240] focus:ring-2 focus:ring-[#0a2240]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Telefone + Como nos encontrou */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="telefone"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      WhatsApp / Telefone
                    </label>
                    <input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      value={form.telefone}
                      onChange={handleChange}
                      placeholder="(94) 9 0000-0000"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0a2240] focus:ring-2 focus:ring-[#0a2240]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="origem"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Como nos encontrou?
                    </label>
                    <select
                      id="origem"
                      name="origem"
                      value={form.origem}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0a2240] focus:ring-2 focus:ring-[#0a2240]/10 transition-all bg-white text-gray-700"
                    >
                      <option value="">Selecione...</option>
                      <option value="Google">Google</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="WhatsApp">WhatsApp / Indicação</option>
                      <option value="Jornal impresso">Jornal impresso</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>

                {/* Assunto */}
                <div>
                  <label
                    htmlFor="assunto"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Assunto <span className="text-[#e63946]">*</span>
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    required
                    value={form.assunto}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0a2240] focus:ring-2 focus:ring-[#0a2240]/10 transition-all bg-white text-gray-700"
                  >
                    <option value="" disabled>
                      Selecione um assunto...
                    </option>
                    {ASSUNTOS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mensagem */}
                <div>
                  <label
                    htmlFor="mensagem"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Mensagem <span className="text-[#e63946]">*</span>
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={6}
                    value={form.mensagem}
                    onChange={handleChange}
                    placeholder="Escreva sua mensagem aqui..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0a2240] focus:ring-2 focus:ring-[#0a2240]/10 transition-all resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {form.mensagem.length}/1000 caracteres
                  </p>
                </div>

                {/* Erro */}
                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                    Ocorreu um erro ao enviar. Tente novamente ou envie um e-mail
                    diretamente para{" "}
                    <a
                      href="mailto:cumaru@cumarunews.com.br"
                      className="font-semibold underline"
                    >
                      cumaru@cumarunews.com.br
                    </a>
                    .
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#e63946] hover:bg-red-700 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    "Enviar mensagem"
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Respondemos em até 2 dias úteis.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
