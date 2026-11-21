export const DEFAULT_IMAGE_SRC = "/og-default.jpg";

export interface ImagemNoticia {
  src: string;
  temImagem: boolean;
  alt: string;
  legenda?: string;
  credito?: string;
  ilustrativa: boolean;
}

/**
 * Normaliza os metadados de imagem vindos do frontmatter Markdown.
 * - Mantém texto alternativo (alt) separado de legenda visível e crédito.
 * - Nunca inventa autoria, licença ou legenda a partir do texto alternativo.
 * - Quando não há imagem cadastrada, sinaliza `temImagem: false` e fornece fallback seguro.
 */
export function normalizarImagemNoticia(data: {
  imagemDestaque?: unknown;
  imagemAlt?: unknown;
  imagemLegenda?: unknown;
  imagemCredito?: unknown;
  imagemIlustrativa?: unknown;
  titulo?: unknown;
}): ImagemNoticia {
  const rawSrc =
    typeof data.imagemDestaque === "string" ? data.imagemDestaque.trim() : "";
  const temImagem = Boolean(rawSrc && rawSrc !== DEFAULT_IMAGE_SRC);
  const src = temImagem ? rawSrc : DEFAULT_IMAGE_SRC;

  const rawAlt =
    typeof data.imagemAlt === "string" ? data.imagemAlt.trim() : "";
  const titulo = typeof data.titulo === "string" ? data.titulo.trim() : "";
  const alt = rawAlt || (temImagem ? titulo || "Imagem da notícia" : "CumaruNews");

  const legenda =
    typeof data.imagemLegenda === "string" && data.imagemLegenda.trim()
      ? data.imagemLegenda.trim()
      : undefined;

  const credito =
    typeof data.imagemCredito === "string" && data.imagemCredito.trim()
      ? data.imagemCredito.trim()
      : undefined;

  const ilustrativa = data.imagemIlustrativa === true;

  return {
    src,
    temImagem,
    alt,
    legenda,
    credito,
    ilustrativa,
  };
}

/**
 * Indica se deve ser exibida legenda/crédito visível (<figcaption>).
 * Nunca transforma `alt` automaticamente em legenda visível.
 */
export function deveExibirLegenda(imagem: ImagemNoticia): boolean {
  return Boolean(imagem.ilustrativa || imagem.legenda || imagem.credito);
}
