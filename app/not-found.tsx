import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-8xl font-black text-[#e63946] mb-4">404</p>
      <h1 className="text-2xl font-bold text-[#0a2240] mb-3">Página não encontrada</h1>
      <p className="text-gray-500 mb-8">Esta página não existe ou foi removida.</p>
      <Link href="/" className="bg-[#0a2240] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e63946] transition-colors">
        Voltar para o início
      </Link>
    </div>
  );
}
