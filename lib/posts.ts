import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { parseSiteDate, toSiteIsoString } from "@/lib/dates";
import { FonteNoticia, normalizarFontes } from "@/lib/fontes";
import { normalizarImagemNoticia } from "@/lib/imagens";

const CONTENT_DIR = path.join(process.cwd(), "content/noticias");

export interface Post {
  slug: string;
  titulo: string;
  descricao: string;
  categoria: string;
  autor: string;
  autorSlug: string;
  dataPublicacao: string;
  dataAtualizacao?: string;
  imagemDestaque: string;
  temImagem: boolean;
  imagemAlt: string;
  imagemLegenda?: string;
  imagemCredito?: string;
  imagemIlustrativa: boolean;
  tags: string[];
  fontes: FonteNoticia[];
  conteudo: string;
  destaque?: boolean;
}

// Configura marked para gerar HTML limpo
marked.setOptions({
  gfm: true,
  breaks: true,
});

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(".md", "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const imagem = normalizarImagemNoticia(data);

    return {
      slug,
      titulo: data.titulo || "",
      descricao: data.descricao || "",
      categoria: data.categoria || "cidades",
      autor: data.autor || "Redação CumaruNews",
      autorSlug: data.autorSlug || "redacao",
      dataPublicacao: toSiteIsoString(data.dataPublicacao || new Date()),
      dataAtualizacao: data.dataAtualizacao
        ? toSiteIsoString(data.dataAtualizacao)
        : undefined,
      imagemDestaque: imagem.src,
      temImagem: imagem.temImagem,
      imagemAlt: imagem.alt,
      imagemLegenda: imagem.legenda,
      imagemCredito: imagem.credito,
      imagemIlustrativa: imagem.ilustrativa,
      tags: data.tags || [],
      fontes: normalizarFontes(data.fontes),
      conteudo: marked(content) as string,
      destaque: data.destaque || false,
    } as Post;
  });

  return posts.sort(
    (a, b) =>
      parseSiteDate(b.dataPublicacao).getTime() -
      parseSiteDate(a.dataPublicacao).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategoria(categoria: string): Post[] {
  return getAllPosts().filter((p) => p.categoria === categoria);
}

export function getPostsDestaques(): Post[] {
  const all = getAllPosts();
  const destaques = all.filter((p) => p.destaque);
  return destaques.length >= 3 ? destaques : all.slice(0, 6);
}
