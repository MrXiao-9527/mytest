import { spawn } from "node:child_process";
import { mkdir, access, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "images");
const port = 8765;
const chrome = process.env.CHROME_PATH || "/opt/google/chrome/chrome";

const pages = [
  "req1-identity-bind",
  "req1-school-dashboard",
  "req2-literature-settings",
  "req3-dual-column-trace",
  "req3-pdf-source-highlight",
  "req4-entity-prompt-guide",
  "req4-scholar-portrait",
  "req5-ai-companion-reading"
];

async function waitForServer(url, attempts = 50) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`Server not ready: ${url}`);
}

async function getPuppeteer() {
  try {
    const require = createRequire(import.meta.url);
    return require("puppeteer-core");
  } catch {
    await new Promise((resolve, reject) => {
      const child = spawn("npm", ["install", "--no-save", "puppeteer-core@24.11.0"], {
        cwd: root,
        stdio: "inherit"
      });
      child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error("npm install failed"))));
    });
    const require = createRequire(import.meta.url);
    return require("puppeteer-core");
  }
}

await mkdir(outDir, { recursive: true });
const server = spawn("python3", ["-m", "http.server", String(port), "--directory", root], {
  stdio: ["ignore", "pipe", "pipe"]
});

try {
  await waitForServer(`http://127.0.0.1:${port}/pages/req1-identity-bind.html`);
  const puppeteer = await getPuppeteer();
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  for (const name of pages) {
    const url = `http://127.0.0.1:${port}/pages/${name}.html`;
    const out = path.join(outDir, `${name}.png`);
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector(".header .brand .ai", { timeout: 15000 });
    await page.waitForSelector(".sidebar .nav-item", { timeout: 15000 });
    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
    });
    await new Promise((r) => setTimeout(r, 200));
    await page.screenshot({ path: out, fullPage: false });
    await access(out);
    console.log(`captured ${name}.png`);
  }

  await browser.close();
} finally {
  server.kill("SIGTERM");
}
