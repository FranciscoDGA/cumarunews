#!/usr/bin/env node
/**
 * Radar de pautas do CumaruNews.
 *
 * Busca fontes públicas (prefeitura, câmara, Google News e veículos da região),
 * filtra por recência e RECORTE geográfico, remove o que já foi coberto e imprime
 * uma lista de pautas para apuração.
 *
 * Uso:
 *   npm run radar              -> pautas dos últimos 14 dias
 *   npm run radar -- --dias 30 -> janela de 30 dias
 *   npm run radar -- --json    -> saída JSON (para outras ferramentas)
 *
 * O script é somente leitura: ele NÃO publica nada.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const DIAS = (() => {
  const i = process.argv.indexOf("--dias");
  return i > -1 && Number(process.argv[i + 1]) ? Number(process.argv[i + 1]) : 14;
})();
const AS_JSON = process.argv.includes("--json");

const COBERTURA_DIR = path.join(process.cwd(), "content/noticias");

const FONTES = [
  {
    nome: "PMCN (prefeitura)",
    local: true,
    tipo: "rss",
    url: "https://pmcn.pa.gov.br/feed/",
  },
  {
    nome: "PMCN via wp-json",
    local: true,
    tipo: "wp",
    url: "https://pmcn.pa.gov.br/wp-json/wp/v2/posts?per_page=20&_fields=link,title,date",
  },
  {
    nome: "Câmara Municipal",
    local: true,
    tipo: "wp",
    url: "https://cmcumarudonorte.pa.gov.br/wp-json/wp/v2/posts?per_page=15&_fields=link,title,date",
  },
  {
    nome: "Google News: Cumarú do Norte",
    tipo: "rss",
    url: "https://news.google.com/rss/search?q=%22Cumar%C3%BA+do+Norte%22&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    nome: "Google News: sul do Pará",
    tipo: "rss",
    url: "https://news.google.com/rss/search?q=%22sul+do+Par%C3%A1%22&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    nome: "Gazeta Carajás",
    tipo: "rss",
    url: "https://gazetacarajas.com.br/feed/",
  },
];

const RECORTE = [
  "cumaru",
  "sul do pará",
  "santa maria das barreiras",
  "santana do araguaia",
  "brejo grande",
  "itupiranga",
  "redenção",
  "bannach",
  "pau d'arco",
  "pau d arco",
  "confredespa",
  "serra azul",
  "aldeia",
  "arraias do araguaia",
];

const decode = (s = "") =>
  s
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&#8211;|&ndash;/g, "-")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&([a-z]+);/gi, "")
    .replace(/\s+/g, " ")
    .trim();

const stripHtml = (s = "") => decode(s.replace(/<[^>]+>/g, " "));

const parseRss = (xml) => {
  const itens = [];
  for (const m of xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)) {
    const bloco = m[0];
    const pick = (tag) => {
      const r = bloco.match(
        new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i")
      );
      return r ? r[1] : "";
    };
    itens.push({
      titulo: stripHtml(pick("title")),
      url: decode(pick("link")).replace(/<[^>]+>/g, ""),
      data: decode(pick("pubDate")),
      resumo: stripHtml(pick("description")).slice(0, 200),
    });
  }
  return itens;
};

const parseWpJson = (json) => {
  const posts = JSON.parse(json);
  return posts.map((p) => ({
    titulo: stripHtml(p.title?.rendered || ""),
    url: p.link,
    data: p.date,
    resumo: "",
  }));
};

const normalizarUrl = (u) => {
  try {
    const url = new URL(u);
    url.hash = "";
    ["utm_source", "utm_medium", "utm_campaign", "gclid", "fbclid"].forEach(
      (p) => url.searchParams.delete(p)
    );
    return url.toString().replace(/\/$/, "");
  } catch {
    return u;
  }
};

const jaCobertos = () => {
  const urls = new Set();
  if (!fs.existsSync(COBERTURA_DIR)) return urls;
  for (const file of fs.readdirSync(COBERTURA_DIR)) {
    if (!file.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(COBERTURA_DIR, file), "utf-8");
    for (const m of raw.matchAll(/https?:\/\/[^\s)\]"']+/g)) {
      urls.add(normalizarUrl(m[0]));
    }
  }
  return urls;
};

const principal = async () => {
  const corte = Date.now() - DIAS * 864e5;
  const cobertos = jaCobertos();
  const vistas = new Map();
  const erros = [];

  for (const fonte of FONTES) {
    let texto = "";
    try {
      const res = await fetch(fonte.url, {
        headers: { "User-Agent": "CumaruNews-Radar/1.0 (pautas)" },
        signal: AbortSignal.timeout(20000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      texto = await res.text();
    } catch (e) {
      erros.push(`${fonte.nome}: ${e.message}`);
      continue;
    }

    let itens = [];
    try {
      itens = fonte.tipo === "rss" ? parseRss(texto) : parseWpJson(texto);
    } catch (e) {
      erros.push(`${fonte.nome}: falha ao interpretar (${e.message})`);
      continue;
    }

    for (const item of itens) {
      if (!item.url || !item.titulo) continue;
      const ts = Date.parse(item.data);
      if (Number.isFinite(ts) && ts < corte) continue;

      const relevante = fonte.local || RECORTE.some((k) => (item.titulo + " " + item.resumo).toLowerCase().includes(k));
      if (!relevante) continue;

      const chave = normalizarUrl(item.url);
      if (vistas.has(chave)) continue;
      vistas.set(chave, {
        ...item,
        url: chave,
        fonte: fonte.nome,
        data: Number.isFinite(ts) ? new Date(ts).toISOString() : item.data,
        coberto: cobertos.has(chave),
      });
    }
  }

  const pautas = [...vistas.values()].sort((a, b) =>
    String(b.data).localeCompare(String(a.data))
  );
  const abertas = pautas.filter((p) => !p.coberto);
  const cobertas = pautas.filter((p) => p.coberto);

  if (AS_JSON) {
    console.log(
      JSON.stringify(
        { janelaDias: DIAS, abertas, cobertas, erros },
        null,
        2
      )
    );
    return;
  }

  console.log(`\nRadar de pautas — últimos ${DIAS} dias`);
  console.log("=".repeat(72));
  console.log(`\nPAUTAS EM ABERTO (${abertas.length})\n`);
  for (const p of abertas) {
    const quando = String(p.data).slice(0, 10);
    console.log(`  [${quando}] ${p.titulo}`);
    console.log(`     ${p.url}`);
    console.log(`     fonte: ${p.fonte}\n`);
  }

  if (cobertas.length) {
    console.log(`JÁ COBERTAS NO PORTAL (${cobertas.length})\n`);
    for (const p of cobertas) console.log(`  - ${p.titulo}`);
    console.log("");
  }

  if (erros.length) {
    console.log("FONTES COM FALHA\n");
    for (const e of erros) console.log(`  ! ${e}`);
    console.log("");
  }

  console.log(
    `Resumo: ${abertas.length} pauta(s) em aberto, ${cobertas.length} já coberta(s).`
  );
  console.log(
    "Lembrete: nada é publicado automaticamente — apure e escreva o artigo manualmente.\n"
  );
};

principal().catch((e) => {
  console.error("Falha no radar:", e);
  process.exit(1);
});
