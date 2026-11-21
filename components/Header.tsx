"use client";
import Link from "next/link";
import { useState } from "react";
import { SITE, CATEGORIAS } from "@/lib/config";
import { formatHeaderDate } from "@/lib/dates";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Barra superior */}
      <div className="bg-[#0a2240] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center gap-2">
          <span className="text-gray-200 truncate">{formatHeaderDate()}</span>
          <div className="flex gap-3 sm:gap-4 items-center shrink-0">
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="hidden sm:inline text-gray-200 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded">Instagram</a>
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="hidden sm:inline text-gray-200 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded">Facebook</a>
            <Link href="/contato" className="text-gray-200 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded">Contato</Link>
            <a href={SITE.social.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#e63946] text-white px-2.5 sm:px-3 py-0.5 rounded text-xs font-bold hover:bg-red-700 transition-colors flex items-center gap-1 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              📢 Envie sua Denúncia
            </a>
          </div>
        </div>
      </div>

      {/* Logo + nome */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0a2240] to-[#133b6e] flex items-center justify-center shadow-sm ring-1 ring-black/5 relative overflow-hidden group-hover:scale-[1.03] transition-transform">
            <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" aria-hidden="true">
              <path d="M9 12h30" stroke="#e63946" strokeWidth="3.2" strokeLinecap="round" />
              <text
                x="24"
                y="34"
                textAnchor="middle"
                fill="#ffffff"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="21"
                letterSpacing="-1"
              >
                CN
              </text>
              <circle cx="38" cy="12" r="2.8" fill="#ffffff" />
            </svg>
          </div>
          <div>
            <div className="flex items-baseline gap-0.5 font-black text-2xl leading-none tracking-tight">
              <span className="text-[#0a2240]">Cumaru</span>
              <span className="text-[#e63946]">News</span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 mt-0.5 tracking-wide">
              {SITE.tagline}
            </div>
          </div>
        </Link>

        {/* Botão mobile */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-700 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e63946]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu de editorias" : "Abrir menu de editorias"}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Nav categorias */}
      <nav
        id="main-nav"
        aria-label="Editorias do portal"
        className={`border-t border-gray-100 ${menuOpen ? "block" : "hidden md:block"}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex flex-col md:flex-row md:gap-0 overflow-x-auto">
            <li>
              <Link
                href="/"
                className="block px-3 py-2.5 text-sm font-semibold text-[#0a2240] hover:text-[#e63946] border-b-2 border-transparent hover:border-[#e63946] transition-colors whitespace-nowrap"
                onClick={() => setMenuOpen(false)}
              >
                Início
              </Link>
            </li>
            {CATEGORIAS.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#e63946] border-b-2 border-transparent hover:border-[#e63946] transition-colors whitespace-nowrap"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
