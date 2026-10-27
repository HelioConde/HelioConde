import { readFileSync } from 'node:fs';
import { exit } from 'node:process';

const markdown = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const errors = [];
const warnings = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

const headings = [...markdown.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((match) => ({
  depth: match[1].length,
  text: match[2].trim(),
}));
const sectionNames = headings.filter((heading) => heading.depth === 2).map((heading) => heading.text);
const required = [
  'Projetos em destaque',
  'Jogos em desenvolvimento',
  'Outros projetos',
  'Tecnologias',
];

check(markdown.length > 1500, 'README muito curto para o portfólio do perfil.');
check((markdown.match(/<h1\b/gi) || []).length === 1, 'É necessário exatamente um H1 no hero.');
check((markdown.match(/^#\s+/gm) || []).length === 0, 'Não duplique o H1 em Markdown.');
for (const section of required) {
  check(sectionNames.includes(section), 'Seção ausente: ' + section);
}
check(!/^\s*\|\s*---/m.test(markdown), 'Evite tabelas de layout; prefira seções ou details no mobile.');

const slugify = (value) => value
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^\p{L}\p{N}_\-\s]/gu, '')
  .trim()
  .replace(/\s+/g, '-');
const validSlugs = new Set(headings.map((heading) => slugify(heading.text)));
for (const [, anchor] of markdown.matchAll(/\]\(#([^)]+)\)/g)) {
  check(validSlugs.has(decodeURIComponent(anchor)), 'Âncora do sumário não encontrada: #' + anchor);
}

const images = [...markdown.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
check(images.length >= 1, 'Inclua ao menos uma imagem com função clara (badge ou captura).');
for (const tag of images) {
  const alt = tag.match(/\balt="([^"]*)"/i)?.[1];
  check(Boolean(alt?.trim()), 'Imagem sem alt descritivo: ' + tag.slice(0, 90));
  const width = tag.match(/\bwidth="(\d+)"/i)?.[1];
  if (width && Number(width) > 900) warnings.push('Imagem com largura maior que 900px: ' + tag.slice(0, 90));
}
check(!/!\[[^\]]*]\([^)]*\.gif(?:\?|#|\))/i.test(markdown), 'Remova GIFs automáticos: respeite movimento reduzido.');

const urls = [
  ...[...markdown.matchAll(/\]\(([^)\s]+)\)/g)].map((match) => match[1]),
  ...[...markdown.matchAll(/\bhref="([^"]+)"/g)].map((match) => match[1]),
  ...[...markdown.matchAll(/\bsrc="([^"]+)"/g)].map((match) => match[1]),
];
for (const url of urls) {
  if (url.startsWith('#')) continue;
  try {
    const parsed = new URL(url);
    check(parsed.protocol === 'https:', 'Recurso deve usar HTTPS: ' + url);
  } catch {
    errors.push('URL malformada: ' + url);
  }
}
check(urls.length >= 18, 'Links insuficientes: revise os projetos citados.');

const imageSources = [...images]
  .map((tag) => tag.match(/\bsrc="([^"]+)"/)?.[1] || '')
  .filter((src) => src.includes('/img/projects/'));
const expected = [
  'ofertamatica.jpg',
  'base-studio-pizzas.jpg',
  'playwitheliteitem.jpg',
  'slimekeepers-menu.png',
  'redream.jpg',
];
check(imageSources.length === 5, 'Cada projeto em destaque precisa de uma única imagem: são cinco projetos.');
check(new Set(imageSources).size === imageSources.length, 'Há imagens repetidas no perfil.');
for (const filename of expected) {
  check(imageSources.filter((src) => src.endsWith('/' + filename)).length === 1,
    'Imagem ausente ou duplicada: ' + filename);
}
for (const tag of images.filter((tag) => tag.includes('/img/projects/'))) {
  check(/\bwidth="680"/.test(tag), 'Padronizar imagens dos projetos em width=680.');
  check(/\balt="[^"]{30,}"/.test(tag), 'Uma prévia precisa de alt descritivo.');
}
check(!sectionNames.includes('Galeria de projetos'), 'A galeria separada não deve duplicar as imagens.');
check(!sectionNames.includes('O que eu construo'), 'Remover apresentação repetida.');
check(!sectionNames.includes('Sobre mim'), 'Evitar bio repetida no final.');
const games = markdown.split('## Jogos em desenvolvimento\n')[1]?.split('\n## Outros projetos')[0] || '';
for (const [name,filename] of [
  ['Slimekeepers: Lost Valley','slimekeepers-menu.png'],
  ['Re:Dream','redream.jpg']
]) {
  const heading = games.split('\n').find((line) => line.startsWith('### ') && line.includes(name));
  check(Boolean(heading && heading.includes('em desenvolvimento')), 'Título deve dizer em desenvolvimento: ' + name);
  if(!heading) continue;
  const nextStart = games.indexOf(heading) + heading.length;
  const end = games.indexOf('\n### ', nextStart);
  const block = games.slice(nextStart, end === -1 ? undefined : end);
  check(block.includes('/img/projects/'+filename), 'Imagem precisa acompanhar a descrição: ' + name);
  check(block.includes('https://github.com/HelioConde/'), 'Link para código ausente: ' + name);
}
check(games.includes('não é gameplay'), 'Identificar arte do menu de Slimekeepers.');
check(games.includes('pré-alfa pública'), 'Distinguir a pré-alfa de Re:Dream.');

for (const message of warnings) console.warn('AVISO: ' + message);
if (errors.length) {
  for (const message of errors) console.error('ERRO: ' + message);
  exit(1);
}
console.log('README QA aprovado: ' + sectionNames.length + ' seções, ' +
  images.length + ' imagens, ' + urls.length + ' links/recursos e ' +
  [...markdown.matchAll(/^###\s+/gm)].length + ' projetos destacados.');
