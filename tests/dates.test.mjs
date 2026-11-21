import test from "node:test";
import assert from "node:assert/strict";
import {
  formatArticleDateTime,
  formatHeaderDate,
  formatRelativeTime,
  formatShortDate,
  parseSiteDate,
  toSiteIsoString,
} from "../lib/dates.ts";

test("datas com fuso explícito (-03:00) preservam horário sem aplicar fuso duas vezes", () => {
  const input = "2026-11-21T15:30:00-03:00";

  assert.equal(formatArticleDateTime(input), "21 de novembro de 2026, 15:30");
  assert.equal(formatShortDate(input), "21/11/2026");
  assert.equal(toSiteIsoString(input), "2026-11-21T15:30:00-03:00");
});

test("datas com fuso explícito em UTC (Z) são convertidas corretamente para America/Sao_Paulo", () => {
  const input = "2026-11-21T18:30:00Z";

  assert.equal(formatArticleDateTime(input), "21 de novembro de 2026, 15:30");
  assert.equal(toSiteIsoString(input), "2026-11-21T15:30:00-03:00");
});

test("datas sem fuso explícito são interpretadas em America/Sao_Paulo (-03:00)", () => {
  const dateTimeNoTz = "2026-11-21T16:10:00";
  const dateOnly = "2026-11-21";

  assert.equal(
    formatArticleDateTime(dateTimeNoTz),
    "21 de novembro de 2026, 16:10"
  );
  assert.equal(toSiteIsoString(dateTimeNoTz), "2026-11-21T16:10:00-03:00");

  assert.equal(formatArticleDateTime(dateOnly), "21 de novembro de 2026, 00:00");
  assert.equal(toSiteIsoString(dateOnly), "2026-11-21T00:00:00-03:00");
});

test("mudança de dia entre UTC e America/Sao_Paulo mantém data e hora locais corretas", () => {
  // 01:30 UTC do dia 22 corresponde a 22:30 do dia 21 em America/Sao_Paulo
  const lateNightUtc = "2026-11-22T01:30:00Z";
  assert.equal(
    formatArticleDateTime(lateNightUtc),
    "21 de novembro de 2026, 22:30"
  );
  assert.equal(formatShortDate(lateNightUtc), "21/11/2026");
  assert.equal(toSiteIsoString(lateNightUtc), "2026-11-21T22:30:00-03:00");
  assert.equal(formatHeaderDate(lateNightUtc), "sábado, 21 de novembro de 2026");

  // 03:00 UTC do dia 22 corresponde exatamente à meia-noite (00:00) do dia 22 em America/Sao_Paulo
  const midnightUtc = "2026-11-22T03:00:00Z";
  assert.equal(
    formatArticleDateTime(midnightUtc),
    "22 de novembro de 2026, 00:00"
  );
  assert.equal(toSiteIsoString(midnightUtc), "2026-11-22T00:00:00-03:00");
});

test("coerência entre horário visível, <time dateTime> e metadados ISO", () => {
  const input = "2026-11-21T22:45:00-03:00";
  const iso = toSiteIsoString(input);
  const visible = formatArticleDateTime(iso);

  assert.equal(iso, "2026-11-21T22:45:00-03:00");
  assert.equal(visible, "21 de novembro de 2026, 22:45");
  assert.equal(parseSiteDate(iso).getTime(), parseSiteDate(input).getTime());
});

test("exibição relativa ('há X minutos', 'há cerca de X horas', 'há 1 dia') funciona com fuso explícito e sem fuso", () => {
  const base = new Date("2026-11-21T18:35:00Z"); // 15:35 em America/Sao_Paulo

  assert.equal(
    formatRelativeTime("2026-11-21T15:30:00-03:00", base),
    "há 5 minutos"
  );
  assert.equal(
    formatRelativeTime("2026-11-21T15:30:00", base),
    "há 5 minutos"
  );
  assert.equal(
    formatRelativeTime("2026-11-21T13:35:00-03:00", base),
    "há cerca de 2 horas"
  );
  assert.equal(
    formatRelativeTime("2026-11-20T15:35:00-03:00", base),
    "há 1 dia"
  );
});
