import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const branch = process.env.PROFILE_README_REF ||
  process.env.GITHUB_HEAD_REF ||
  process.env.GITHUB_REF_NAME ||
  'main';
const encodedRef = branch.split('/').map(encodeURIComponent).join('/');
const target = process.env.PROFILE_README_URL ||
  'https://github.com/HelioConde/HelioConde/blob/' + encodedRef + '/README.md';
const outputDir = new URL('../artifacts/readme-qa/', import.meta.url).pathname;
const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];
const report = {
  checkedAt: new Date().toISOString(),
  ref: branch,
  url: target,
  viewports: [],
};
let browser;
let failed = false;

await mkdir(outputDir, { recursive: true });

try {
  browser = await chromium.launch({ headless: true });
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push('pageerror: ' + error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push('console: ' + message.text());
    });
    page.on('response', (response) => {
      if (response.status() >= 400) {
        errors.push('http ' + response.status() + ': ' + response.url());
      }
    });
    const item = { ...viewport, screenshot: viewport.name + '.png', errors };
    report.viewports.push(item);

    try {
      const response = await page.goto(target, {
        waitUntil: 'domcontentloaded',
        timeout: 45000,
      });
      item.httpStatus = response?.status() ?? null;
      if (!response?.ok()) throw new Error('HTTP ' + item.httpStatus);

      const article = page.locator('article.markdown-body, .markdown-body').first();
      await article.waitFor({ state: 'visible', timeout: 25000 });
      // A interface do GitHub hidrata e substitui nós depois do DOMContentLoaded.
      // Não role um elemento que pode ser desmontado; aguarde conteúdo estável.
      await page.waitForFunction(() => {
        const current = document.querySelector('article.markdown-body') ||
          document.querySelector('.markdown-body');
        return current && current.textContent.includes('Ofertamática');
      }, undefined, { timeout: 25000 });
      await page.waitForTimeout(900);
      // Role até o fim para disparar o lazy-loading das prévias do GitHub.
      await page.evaluate(async () => {
        const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const step = Math.max(500, window.innerHeight);
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await pause(75);
        }
        window.scrollTo(0, 0);
      });
      await page.waitForFunction(() => {
        const images = [...document.querySelectorAll('.markdown-body img')];
        return images.length >= 11 && images.every((image) => image.complete);
      }, undefined, { timeout: 20000 });
      await page.locator('body').evaluate(async () => {
        if (document.fonts?.ready) await document.fonts.ready;
      });
      item.metrics = await article.evaluate((root) => ({
        clientWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
        headings: root.querySelectorAll('h1, h2, h3').length,
        images: root.querySelectorAll('img').length,
        projectPreviews: [...root.querySelectorAll('img')]
          .filter((image) => image.getAttribute('width') === '48%' &&
            image.src.includes('/img/projects/')).length,
        gamePreviews: [...root.querySelectorAll('img')]
          .filter((image) => image.getAttribute('width') === '680' &&
            (/slimekeepers-menu\.png|redream\.jpg/.test(image.src))).length,
        brokenLoadedImages: [...root.querySelectorAll('img')]
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
      }));
      item.horizontalOverflow = item.metrics.scrollWidth > item.metrics.clientWidth + 8;
      if (item.metrics.projectPreviews !== 6) {
        failed = true;
        console.error('Galeria incompleta em ' + viewport.name + ': ' + item.metrics.projectPreviews + '/6');
      }
      if (item.metrics.gamePreviews !== 2) {
        failed = true;
        console.error('Imagens dos jogos incompletas em ' + viewport.name + ': ' + item.metrics.gamePreviews + '/2');
      }

      await page.screenshot({
        path: join(outputDir, item.screenshot),
        fullPage: true,
        animations: 'disabled',
      });

      if (item.horizontalOverflow) {
        failed = true;
        console.error('Overflow no README em ' + viewport.name + ': ' +
          item.metrics.scrollWidth + '/' + item.metrics.clientWidth);
      }
      if (item.metrics.brokenLoadedImages.length) {
        failed = true;
        console.error('Imagens quebradas em ' + viewport.name + ': ' +
          item.metrics.brokenLoadedImages.join(', '));
      }
      console.log('Captura feita: ' + viewport.name + ' (' + viewport.width + 'px)');
    } catch (error) {
      item.failure = String(error);
      failed = true;
      console.error('Falha em ' + viewport.name + ': ' + error);
    } finally {
      await context.close();
    }
  }
} catch (error) {
  report.fatal = String(error);
  failed = true;
  console.error(error);
} finally {
  await browser?.close();
  await writeFile(join(outputDir, 'report.json'), JSON.stringify(report, null, 2) + '\n');
}

if (failed) process.exitCode = 1;
