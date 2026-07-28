import { spawn } from "node:child_process";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const screensDir = path.join(root, "screens");
const outDir = path.join(root, "images");
const artifactsDir = "/opt/cursor/artifacts/assets";

const screens = [
  "req1-identity-bind",
  "req1-school-dashboard",
  "req2-literature-settings",
  "req3-dual-column-trace",
  "req3-pdf-source-highlight",
  "req4-entity-prompt-guide",
  "req4-scholar-portrait",
  "req5-ai-companion-reading"
];

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const filePath = path.join(root, urlPath === "/" ? "index.html" : urlPath);
      if (!filePath.startsWith(root) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
      createReadStream(filePath).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

function runChrome(url, outFile) {
  return new Promise((resolve, reject) => {
    const args = [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      `--user-data-dir=/tmp/cnki-chrome-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      "--window-size=1440,900",
      `--screenshot=${outFile}`,
      "--default-background-color=FFFFFFFF",
      "--virtual-time-budget=8000",
      "--run-all-compositor-stages-before-draw",
      url
    ];
    const child = spawn("/opt/google/chrome/chrome", args, { stdio: ["ignore", "pipe", "pipe"] });
    let err = "";
    child.stderr.on("data", (d) => { err += d.toString(); });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`chrome exit ${code}: ${err}`));
    });
  });
}

const server = await startServer();
const { port } = server.address();
await mkdir(outDir, { recursive: true });
await mkdir(artifactsDir, { recursive: true });

for (const name of screens) {
  const url = `http://127.0.0.1:${port}/screens/${name}.html`;
  const outFile = path.join(outDir, `${name}.png`);
  console.log("capture", name);
  await runChrome(url, outFile);
  await copyFile(outFile, path.join(artifactsDir, `${name}.png`));
}

server.close();
console.log("done");
