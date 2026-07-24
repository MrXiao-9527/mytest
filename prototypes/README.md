# CNKI AI Personalized Prototypes

High-fidelity UI prototypes for five campus personalization features.

Screens are built from a **shared HTML shell** (`js/shell.js` + `css/app.css`), so header and left nav stay identical across every page. PNGs in `images/` are captured from those pages.

## Shared chrome

- Logo: **CNKI** (black) + **AI** (blue)
- Header (right): Guide · Language (globe icon) · Account
- Left nav: Q&A · AI Reading · Intelligent Writing · Intelligent Agents · Deep Research · Bibliometric Analysis · Literature Review · Intelligent Translation · My Space
- Institution example: **CNKI University**

## Preview

```bash
python3 -m http.server 8080 --directory prototypes
```

Open `http://localhost:8080` for the gallery, or any file under `pages/`.

## Recapture screenshots

```bash
cd prototypes
node scripts/capture.mjs
```

## Screens

| Requirement | HTML | PNG |
|-------------|------|-----|
| 1. Identity & dashboard | `pages/req1-identity-bind.html` | `images/req1-identity-bind.png` |
| | `pages/req1-school-dashboard.html` | `images/req1-school-dashboard.png` |
| 2. Source settings | `pages/req2-literature-settings.html` | `images/req2-literature-settings.png` |
| 3. Source tracing | `pages/req3-dual-column-trace.html` | `images/req3-dual-column-trace.png` |
| | `pages/req3-pdf-source-highlight.html` | `images/req3-pdf-source-highlight.png` |
| 4. Entity guidance | `pages/req4-entity-prompt-guide.html` | `images/req4-entity-prompt-guide.png` |
| | `pages/req4-scholar-portrait.html` | `images/req4-scholar-portrait.png` |
| 5. AI reading | `pages/req5-ai-companion-reading.html` | `images/req5-ai-companion-reading.png` |
