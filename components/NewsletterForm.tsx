"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  }

  return (
    <div className="mt-10 bg-[#0a2240] text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="md:w-1/2">
        <h3 className="text-xl font-bold mb-2">Não perca nada! 📩</h3>
        <p className="text-sm text-gray-300">
          Assine nossa newsletter gratuita e receba as principais notícias de Cumarú do Norte direto no seu e-mail.
        </p>
      </div>
      {sent ? (
        <p className="w-full md:w-1/2 text-sm font-semibold text-green-300" role="status">
          Inscrição registrada! Obrigado por acompanhar a CumaruNews.
        </p>
      ) : (
        <form className="w-full md:w-1/2 flex gap-2" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email" className="sr-only">
            Seu melhor e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e63946]"
            required
          />
          <button
            type="submit"
            className="bg-[#e63946] hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors whitespace-nowrap"
          >
            Assinar
          </button>
        </form>
      )}
    </div>
  );
}
