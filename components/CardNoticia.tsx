import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/posts";
import { CATEGORIAS } from "@/lib/config";
import { formatRelativeTime } from "@/lib/dates";

interface Props {
  post: Post;
  variant?: "horizontal" | "vertical" | "destaque";
}

export default function CardNoticia({ post, variant = "vertical" }: Props) {
  const cat = CATEGORIAS.find((c) => c.slug === post.categoria);
  const tempo = formatRelativeTime(post.dataPublicacao);

  if (variant === "destaque") {
    return (
      <Link
        href={`/noticia/${post.slug}`}
        className="group block relative overflow-hidden rounded-xl aspect-[16/9] bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e63946]"
      >
        <Image
          src={post.imagemDestaque}
          alt={post.imagemAlt}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover opacity-75 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          {cat && (
            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold text-white mb-2"
              style={{ backgroundColor: cat.cor }}>
              {cat.label}
            </span>
          )}
          <h2 className="text-white font-bold text-base sm:text-xl leading-snug line-clamp-3 break-words group-hover:underline">
            {post.titulo}
          </h2>
          <p className="text-gray-200 text-xs sm:text-sm mt-1">{tempo}</p>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/noticia/${post.slug}`}
        className="group flex gap-3 items-start rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e63946]"
      >
        <div className="relative w-24 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={post.imagemDestaque}
            alt={post.imagemAlt}
            fill
            sizes="96px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          {cat && (
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: cat.cor }}>
              {cat.label}
            </span>
          )}
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 break-words group-hover:text-[#e63946] transition-colors mt-0.5">
            {post.titulo}
          </h3>
          <p className="text-xs text-gray-600 mt-1">{tempo}</p>
        </div>
      </Link>
    );
  }

  // vertical (padrão)
  return (
    <Link
      href={`/noticia/${post.slug}`}
      className="group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e63946]"
    >
      <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden shrink-0">
        <Image
          src={post.imagemDestaque}
          alt={post.imagemAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {post.imagemIlustrativa && (
          <span className="absolute top-2 left-2 bg-[#0a2240]/85 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded">
            Foto ilustrativa
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        {cat && (
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: cat.cor }}>
            {cat.label}
          </span>
        )}
        <h3 className="font-bold text-base text-gray-900 leading-snug line-clamp-3 break-words mt-1 group-hover:text-[#e63946] transition-colors">
          {post.titulo}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-2">{post.descricao}</p>
        <div className="flex items-center justify-between mt-auto pt-3 text-xs text-gray-500">
          <span className="truncate pr-2">{post.autor}</span>
          <span className="shrink-0">{tempo}</span>
        </div>
      </div>
    </Link>
  );
}
