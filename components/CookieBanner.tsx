"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cumarunews-cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cumarunews-cookie-consent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a2240] text-white p-4 z-[9999] shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p>
            Utilizamos cookies essenciais e tecnologias semelhantes de acordo com a nossa{" "}
            <Link href="/politica-de-privacidade" className="font-bold underline text-[#e63946]">
              Política de Privacidade
            </Link>{" "}
            e a LGPD, para melhorar a sua experiência neste portal. Ao continuar navegando, você concorda com estas condições.
          </p>
        </div>
        <button
          onClick={acceptCookies}
          className="bg-[#e63946] hover:bg-red-700 text-white font-bold py-2 px-6 rounded whitespace-nowrap transition-colors"
        >
          Aceitar e Fechar
        </button>
      </div>
    </div>
  );
}
