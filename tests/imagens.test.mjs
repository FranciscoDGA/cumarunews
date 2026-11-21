import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_IMAGE_SRC,
  deveExibirLegenda,
  normalizarImagemNoticia,
} from "../lib/imagens.ts";

test("imagem com crédito, legenda e texto alternativo separados", () => {
  const img = normalizarImagemNoticia({
    imagemDestaque: "/artigos/parauapebas-parque-dos-ipes.jpg",
    imagemAlt: "Vista diurna de área arborizada com calçada",
    imagemLegenda: "Área revitalizada no município",
    imagemCredito: "Ascom Prefeitura",
    titulo: "Título da matéria",
  });

  assert.equal(img.temImagem, true);
  assert.equal(img.src, "/artigos/parauapebas-parque-dos-ipes.jpg");
  assert.equal(img.alt, "Vista diurna de área arborizada com calçada");
  assert.equal(img.legenda, "Área revitalizada no município");
  assert.equal(img.credito, "Ascom Prefeitura");
  assert.equal(img.ilustrativa, false);
  assert.equal(deveExibirLegenda(img), true);
});

test("imagem ilustrativa sinaliza condição explicitamente quando informada pelo editor", () => {
  const img = normalizarImagemNoticia({
    imagemDestaque: "/artigos/rodovia-entardecer.jpg",
    imagemAlt: "Trecho de rodovia no fim da tarde",
    imagemIlustrativa: true,
    imagemCredito: "Kevin Dooley (CC BY)",
  });

  assert.equal(img.temImagem, true);
  assert.equal(img.ilustrativa, true);
  assert.equal(img.credito, "Kevin Dooley (CC BY)");
  assert.equal(deveExibirLegenda(img), true);
});

test("texto alternativo não vira legenda visível automaticamente", () => {
  const img = normalizarImagemNoticia({
    imagemDestaque: "/artigos/canaa-avenida-minas-gerais.jpg",
    imagemAlt: "Via pavimentada com ciclovia",
  });

  assert.equal(img.temImagem, true);
  assert.equal(img.alt, "Via pavimentada com ciclovia");
  assert.equal(img.legenda, undefined);
  assert.equal(img.credito, undefined);
  assert.equal(img.ilustrativa, false);
  assert.equal(deveExibirLegenda(img), false);
});

test("notícia sem imagem usa alternativa visual segura e sinaliza temImagem=false", () => {
  const imgSemCampo = normalizarImagemNoticia({
    titulo: "Aviso de utilidade pública",
  });
  const imgPadrao = normalizarImagemNoticia({
    imagemDestaque: DEFAULT_IMAGE_SRC,
    titulo: "Aviso de utilidade pública",
  });

  assert.equal(imgSemCampo.temImagem, false);
  assert.equal(imgSemCampo.src, DEFAULT_IMAGE_SRC);
  assert.equal(imgSemCampo.alt, "CumaruNews");
  assert.equal(deveExibirLegenda(imgSemCampo), false);

  assert.equal(imgPadrao.temImagem, false);
  assert.equal(imgPadrao.src, DEFAULT_IMAGE_SRC);
});
