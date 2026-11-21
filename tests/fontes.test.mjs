import test from "node:test";
import assert from "node:assert/strict";
import {
  formatarDataFonte,
  formatarTipoFonte,
  normalizarFontes,
} from "../lib/fontes.ts";

test("matéria sem fontes cadastradas retorna lista vazia (não exibe seção vazia nem fontes falsas)", () => {
  assert.deepEqual(normalizarFontes(undefined), []);
  assert.deepEqual(normalizarFontes(null), []);
  assert.deepEqual(normalizarFontes([]), []);
  assert.deepEqual(normalizarFontes([{ nome: "   " }, { url: "https://exemplo.com" }]), []);
});

test("matéria com fontes completas preserva nome, url válida, data e tipo", () => {
  const fontes = normalizarFontes([
    {
      nome: "Diário Oficial — Decreto 083/2026",
      url: "https://pmcn.pa.gov.br/decreto-083-2026",
      data: "2026-09-30T11:12:44-03:00",
      tipo: "documento_oficial",
    },
    {
      nome: "Entrevista com a Secretaria Municipal de Obras",
      data: "2026-11-21",
      tipo: "entrevista",
    },
    {
      nome: "Comunicado oficial da Prefeitura",
      url: "https://pmcn.pa.gov.br/comunicado",
      tipo: "primaria",
    },
  ]);

  assert.equal(fontes.length, 3);
  assert.deepEqual(fontes[0], {
    nome: "Diário Oficial — Decreto 083/2026",
    url: "https://pmcn.pa.gov.br/decreto-083-2026",
    data: "2026-09-30T11:12:44-03:00",
    tipo: "documento_oficial",
  });
  assert.equal(formatarTipoFonte(fontes[0].tipo), "Documento oficial");
  assert.equal(formatarDataFonte(fontes[0].data), "30/09/2026");

  assert.equal(fontes[1].url, undefined);
  assert.equal(formatarTipoFonte(fontes[1].tipo), "Entrevista");
  assert.equal(formatarDataFonte(fontes[1].data), "21/11/2026");

  assert.equal(formatarTipoFonte(fontes[2].tipo), "Fonte primária");
});

test("rejeita URLs inválidas ou inseguras sem descartar o nome da fonte", () => {
  const fontes = normalizarFontes([
    { nome: "Boletim local", url: "javascript:alert(1)" },
    { nome: "Portal oficial", url: "nao-e-uma-url" },
  ]);

  assert.equal(fontes.length, 2);
  assert.equal(fontes[0].url, undefined);
  assert.equal(fontes[1].url, undefined);
});
