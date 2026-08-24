"use client";
import Link from "next/link";
import { useState } from "react";
import { SITE, CATEGORIAS } from "@/lib/config";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Barra superior */}
      <div className="bg-[#0a2240] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center">
          <span className="opacity-70">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <div className="flex gap-4 items-center">
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">Instagram</a>
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">Facebook</a>
            <a href={SITE.social.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-2 py-0.5 rounded text-xs hover:bg-green-700 transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Logo + nome */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#0a2240] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-lg leading-none">C</span>
          </div>
          <div>
            <div className="font-black text-xl text-[#0a2240] leading-tight tracking-tight">
              CumaruNews
            </div>
            <div className="text-xs text-gray-500 leading-tight">{SITE.tagline}</div>
          </div>
        </Link>

        {/* Botão mobile */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
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
      <nav className={`border-t border-gray-100 ${menuOpen ? "block" : "hidden md:block"}`}>
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
