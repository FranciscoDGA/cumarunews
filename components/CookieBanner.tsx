"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "cumarunews-cookie-consent";
const CHANGE_EVENT = "cumarunews-cookie-consent-changed";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CHANGE_EVENT, onStoreChange);
}

function getSnapshot() {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "true" || value === "accepted" || value === "dismissed"
    ? value
    : "";
}

function getServerSnapshot() {
  return "server";
}

export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const saveChoice = (choice: "accepted" | "dismissed") => {
    localStorage.setItem(STORAGE_KEY, choice);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  if (consent !== "") return null;

  return (
    <div
      role="region"
      aria-label="Aviso de privacidade e armazenamento local"
      className="fixed bottom-0 left-0 right-0 bg-[#0a2240] text-white p-4 z-[9999] shadow-[0_-4px_10px_rgba(0,0,0,0.2)] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm leading-relaxed text-gray-100">
          <p>
            Este portal utiliza apenas armazenamento local essencial do navegador para
            lembrar esta preferência. Saiba mais em nossa{" "}
            <Link
              href="/politica-de-privacidade"
              className="font-bold underline text-[#ff6b76] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => saveChoice("accepted")}
            className="flex-1 sm:flex-none bg-[#e63946] hover:bg-red-700 text-white font-bold py-2 px-5 rounded whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={() => saveChoice("dismissed")}
            className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
