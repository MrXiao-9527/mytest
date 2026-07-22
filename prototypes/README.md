# CNKI AI Personalized Prototypes

High-fidelity UI mockups for five campus personalization features.

Design system:
- Logo: **CNKI** (black) + **AI** (blue)
- Header (right): Guide · Language · Account
- Left nav: Q&A · AI Reading · Intelligent Writing · Intelligent Agents · Deep Research · Bibliometric Analysis · Literature Review · Intelligent Translation · My Space
- Institution example: **CNKI University** (fictional data)
- Style: white/blue, light chrome, concise English

## Preview

```bash
python3 -m http.server 8080 --directory prototypes
```

Open `http://localhost:8080`, or open `prototypes/index.html` directly.

## Screens

| Requirement | File | Notes |
|-------------|------|-------|
| 1. Identity & dashboard | `images/req1-identity-bind.png` | Off-campus institution link |
| | `images/req1-school-dashboard.png` | School Discovery Dashboard |
| 2. Source settings | `images/req2-literature-settings.png` | Scope answers to campus sources |
| 3. Source tracing | `images/req3-dual-column-trace.png` | Dual-column grounded answer |
| | `images/req3-pdf-source-highlight.png` | Exact PDF passage highlight |
| 4. Entity guidance | `images/req4-entity-prompt-guide.png` | Suggested entities |
| | `images/req4-scholar-portrait.png` | Scholar profile |
| 5. AI reading | `images/req5-ai-companion-reading.png` | Reading Assistant workspace |
