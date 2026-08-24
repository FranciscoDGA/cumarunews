import Link from "next/link";
import { SITE, CATEGORIAS } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-[#0a2240] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <span className="text-[#0a2240] font-black text-base leading-none">C</span>
              </div>
              <span className="font-black text-xl">CumaruNews</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {SITE.description}
            </p>
            <div className="flex gap-3">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded text-xs transition-colors">
                Instagram
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded text-xs transition-colors">
                Facebook
              </a>
              <a href={SITE.social.whatsapp} target="_blank" rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded text-xs transition-colors">
                WhatsApp
              </a>
            </div>
          </div>

          {/* Editorias */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-gray-300">Editorias</h3>
            <ul className="space-y-1.5">
              {CATEGORIAS.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categoria/${cat.slug}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-gray-300">Portal</h3>
            <ul className="space-y-1.5">
              <li><Link href="/quem-somos" className="text-gray-400 hover:text-white text-sm transition-colors">Quem Somos</Link></li>
              <li><Link href="/politica-editorial" className="text-gray-400 hover:text-white text-sm transition-colors">Política Editorial</Link></li>
              <li><Link href="/contato" className="text-gray-400 hover:text-white text-sm transition-colors">Contato</Link></li>
              <li><Link href="/politica-de-privacidade" className="text-gray-400 hover:text-white text-sm transition-colors">Privacidade (LGPD)</Link></li>
              <li>
                <a
                  href="/api/rss"
                  className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
                  </svg>
                  Feed RSS
                </a>
              </li>
            </ul>
            <div className="mt-4 text-xs space-y-1.5">
              <a
                href={`mailto:${SITE.email}`}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {SITE.email}
              </a>
              <a
                href={`https://wa.me/5594984478168`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} CumaruNews. Todos os direitos reservados.</p>
          <p>CNPJ: 24.824.190/0001-18 · {SITE.address}</p>
        </div>
      </div>
    </footer>
  );
}
