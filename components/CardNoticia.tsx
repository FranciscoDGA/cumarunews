import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/posts";
import { CATEGORIAS } from "@/lib/config";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  post: Post;
  variant?: "horizontal" | "vertical" | "destaque";
}

export default function CardNoticia({ post, variant = "vertical" }: Props) {
  const cat = CATEGORIAS.find((c) => c.slug === post.categoria);
  const tempo = formatDistanceToNow(new Date(post.dataPublicacao), {
    addSuffix: true,
    locale: ptBR,
  });

  if (variant === "destaque") {
    return (
      <Link href={`/noticia/${post.slug}`} className="group block relative overflow-hidden rounded-xl aspect-[16/9] bg-gray-900">
        <Image
          src={post.imagemDestaque}
          alt={post.imagemAlt}
          fill
          className="object-cover opacity-70 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {cat && (
            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold text-white mb-2"
              style={{ backgroundColor: cat.cor }}>
              {cat.label}
            </span>
          )}
          <h2 className="text-white font-bold text-xl leading-snug line-clamp-3 group-hover:underline">
            {post.titulo}
          </h2>
          <p className="text-gray-300 text-sm mt-1">{tempo}</p>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/noticia/${post.slug}`} className="group flex gap-3 items-start">
        <div className="relative w-24 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <Image src={post.imagemDestaque} alt={post.imagemAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          {cat && (
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: cat.cor }}>
              {cat.label}
            </span>
          )}
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#e63946] transition-colors mt-0.5">
            {post.titulo}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{tempo}</p>
        </div>
      </Link>
    );
  }

  // vertical (padrão)
  return (
    <Link href={`/noticia/${post.slug}`} className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
        <Image
          src={post.imagemDestaque}
          alt={post.imagemAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        {cat && (
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: cat.cor }}>
            {cat.label}
          </span>
        )}
        <h3 className="font-bold text-gray-900 leading-snug line-clamp-3 mt-1 group-hover:text-[#e63946] transition-colors">
          {post.titulo}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-2">{post.descricao}</p>
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <span>{post.autor}</span>
          <span>{tempo}</span>
        </div>
      </div>
    </Link>
  );
}
