const SITE_TIME_ZONE = "America/Sao_Paulo";
const HAS_TIMEZONE_RE = /(?:[zZ]|[+-]\d{2}:?\d{2})$/;
const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;
const DATETIME_NO_TZ_RE = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?$/;

export type TipoFonte =
  | "primaria"
  | "entrevista"
  | "documento_oficial"
  | (string & {});

export interface FonteNoticia {
  nome: string;
  url?: string;
  data?: string;
  tipo?: TipoFonte;
}

const LABELS_TIPO_FONTE: Record<string, string> = {
  primaria: "Fonte primária",
  "fonte primaria": "Fonte primária",
  "fonte primária": "Fonte primária",
  entrevista: "Entrevista",
  documento_oficial: "Documento oficial",
  "documento oficial": "Documento oficial",
};

export function isValidHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function formatarTipoFonte(tipo?: string): string | undefined {
  if (!tipo) return undefined;
  const trimmed = tipo.trim();
  if (!trimmed) return undefined;
  return LABELS_TIPO_FONTE[trimmed.toLowerCase()] ?? trimmed;
}

export function formatarDataFonte(data?: string): string | undefined {
  if (!data) return undefined;
  const trimmed = data.trim();
  if (!trimmed) return undefined;

  // Se for ISO ou YYYY-MM-DD, formata em pt-BR no fuso America/Sao_Paulo
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    let normalized = trimmed;
    if (!HAS_TIMEZONE_RE.test(trimmed)) {
      if (DATE_ONLY_RE.test(trimmed)) {
        normalized = `${trimmed}T00:00:00-03:00`;
      } else if (DATETIME_NO_TZ_RE.test(trimmed)) {
        normalized = `${trimmed.replace(" ", "T")}-03:00`;
      }
    }
    const parsed = new Date(normalized);
    if (!Number.isNaN(parsed.getTime())) {
      return new Intl.DateTimeFormat("pt-BR", {
        timeZone: SITE_TIME_ZONE,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(parsed);
    }
  }
  return trimmed;
}

/**
 * Normaliza o array `fontes` vindo do frontmatter Markdown.
 * - Nunca gera fontes a partir do corpo do texto.
 * - Ignora entradas sem `nome` válido.
 * - Preserva apenas URLs http/https válidas.
 */
export function normalizarFontes(raw: unknown): FonteNoticia[] {
  if (!Array.isArray(raw)) return [];

  const result: FonteNoticia[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const nome = typeof record.nome === "string" ? record.nome.trim() : "";
    if (!nome) continue;

    const fonte: FonteNoticia = { nome };

    if (isValidHttpUrl(record.url)) {
      fonte.url = record.url.trim();
    }

    if (typeof record.data === "string" && record.data.trim()) {
      fonte.data = record.data.trim();
    } else if (record.data instanceof Date && !Number.isNaN(record.data.getTime())) {
      fonte.data = record.data.toISOString();
    }

    if (typeof record.tipo === "string" && record.tipo.trim()) {
      fonte.tipo = record.tipo.trim();
    }

    result.push(fonte);
  }

  return result;
}
