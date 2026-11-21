import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

export const SITE_TIME_ZONE = "America/Sao_Paulo";
const DEFAULT_OFFSET = "-03:00";

const HAS_TIMEZONE_RE = /(?:[zZ]|[+-]\d{2}:?\d{2})$/;
const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;
const DATETIME_NO_TZ_RE = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?$/;

/**
 * Converte uma string de data para Date sem aplicar o fuso duas vezes.
 * - Strings com fuso explícito (Z, +HH:MM, -HH:MM) são interpretadas diretamente.
 * - Strings sem fuso (YYYY-MM-DD ou YYYY-MM-DDTHH:mm[:ss]) são assumidas em America/Sao_Paulo (-03:00).
 */
export function parseSiteDate(input: string | Date): Date {
  if (input instanceof Date) {
    if (Number.isNaN(input.getTime())) {
      throw new Error("Data inválida");
    }
    return input;
  }

  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Data vazia");
  }

  let normalized = trimmed;
  if (!HAS_TIMEZONE_RE.test(trimmed)) {
    if (DATE_ONLY_RE.test(trimmed)) {
      normalized = `${trimmed}T00:00:00${DEFAULT_OFFSET}`;
    } else if (DATETIME_NO_TZ_RE.test(trimmed)) {
      normalized = `${trimmed.replace(" ", "T")}${DEFAULT_OFFSET}`;
    }
  }

  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Data inválida: "${input}"`);
  }
  return parsed;
}

function getPartsInSiteTimeZone(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: SITE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "longOffset",
  });

  const parts = formatter.formatToParts(date);
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const hour = pick("hour") === "24" ? "00" : pick("hour");
  const tzName = pick("timeZoneName"); // ex.: "GMT-03:00"
  const offsetMatch = tzName.match(/GMT([+-]\d{2}:\d{2})/);
  const offset = offsetMatch ? offsetMatch[1] : DEFAULT_OFFSET;

  return {
    year: pick("year"),
    month: pick("month"),
    day: pick("day"),
    hour,
    minute: pick("minute"),
    second: pick("second"),
    offset,
  };
}

/**
 * Retorna ISO 8601 coerente em America/Sao_Paulo (ex.: "2026-11-21T15:30:00-03:00")
 * para uso em <time dateTime>, Open Graph (article:published_time) e JSON-LD.
 */
export function toSiteIsoString(input: string | Date): string {
  const date = parseSiteDate(input);
  const p = getPartsInSiteTimeZone(date);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${p.offset}`;
}

/**
 * Formata data e hora completa para exibição na página da notícia em America/Sao_Paulo.
 * Ex.: "21 de novembro de 2026, 15:30"
 */
export function formatArticleDateTime(input: string | Date): string {
  const date = parseSiteDate(input);
  const datePart = new Intl.DateTimeFormat("pt-BR", {
    timeZone: SITE_TIME_ZONE,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("pt-BR", {
    timeZone: SITE_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `${datePart}, ${timePart}`;
}

/**
 * Formata data curta em America/Sao_Paulo. Ex.: "21/11/2026"
 */
export function formatShortDate(input: string | Date): string {
  const date = parseSiteDate(input);
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: SITE_TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

/**
 * Formata a data do cabeçalho em America/Sao_Paulo.
 * Ex.: "sábado, 21 de novembro de 2026"
 */
export function formatHeaderDate(input: string | Date = new Date()): string {
  const date = parseSiteDate(input);
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: SITE_TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Formata tempo relativo em pt-BR (ex.: "há 5 minutos", "há cerca de 2 horas").
 * Aceita baseDate opcional para testes determinísticos.
 */
export function formatRelativeTime(
  input: string | Date,
  baseDate: Date = new Date()
): string {
  const date = parseSiteDate(input);
  return formatDistance(date, baseDate, {
    addSuffix: true,
    locale: ptBR,
  });
}
