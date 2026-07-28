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

| # | File | What it shows |
|---|------|----------------|
| 1-1 | `req1-identity-bind` | Off-campus: one-click link to CNKI University account |
| 1-2 | `req1-school-dashboard` | After linking: school dashboard with campus publications, theses, and trends |
| 2-1 | `req2-literature-settings` | Source Settings: limit answers to selected campus libraries |
| 3-1 | `req3-dual-column-trace` | Dual-column view: grounded answer with citations, linked campus sources |
| 3-2 | `req3-pdf-source-highlight` | Open a citation to jump to the exact highlighted passage in the PDF |
| 4-1 | `req4-entity-prompt-guide` | While typing, suggest campus authors, labs, and collections |
| 4-2 | `req4-scholar-portrait` | Select an author to open a campus scholar profile |
| 5-1 | `req5-ai-companion-reading` | AI reading workspace: summarize, ask on selection, save to dashboard |
