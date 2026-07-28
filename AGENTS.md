# AGENTS.md

## Cursor Cloud specific instructions

This repository is a set of **static HTML/CSS/vanilla-JS UI prototypes** (CNKI AI campus
personalization mockups) under `prototypes/`. There is **no build step, no package manifest,
and no automated test/lint suite**.

### Running the app (dev)
Serve the prototypes as static files (see `prototypes/README.md`):

```bash
python3 -m http.server 8080 --directory prototypes
```

- Gallery: `http://localhost:8080/`
- Individual screens: `http://localhost:8080/pages/<name>.html`

Pages share a common header/left-nav injected by `js/shell.js` + `css/app.css`, so the server
must be run from the `prototypes/` directory (relative asset paths). Google Fonts load from a
CDN; without internet, typography falls back to system fonts but pages still render.

### Lint / test / build
None exist. "Testing" means serving the files and browsing the gallery + prototype pages.

### Optional screenshot pipeline
`node prototypes/scripts/capture.mjs` regenerates PNGs in `prototypes/images/`. It self-installs
`puppeteer-core` via `npm install --no-save` on first run and uses Chrome at
`/opt/google/chrome/chrome` (override with `CHROME_PATH`). Not required for previewing.

### Branch note
The prototype content lives on feature branches (e.g. `cursor/personalized-prototypes-f359`),
not on `main`, which is only a stub README.
