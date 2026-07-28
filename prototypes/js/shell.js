(function () {
  const ICONS = {
    qa: '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    reading: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    writing: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    agents: '<svg viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="10" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>',
    research: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>',
    biblio: '<svg viewBox="0 0 24 24"><path d="M4 19V5"/><path d="M10 19V9"/><path d="M16 19V7"/><path d="M22 19V11"/></svg>',
    review: '<svg viewBox="0 0 24 24"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>',
    translate: '<svg viewBox="0 0 24 24"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2v3"/><path d="M18 22l4-9"/><path d="m14 13 4 9"/><path d="M14 18h8"/></svg>',
    space: '<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>'
  };

  const NAV = [
    { key: "qa", label: "Q&A", icon: "qa" },
    { key: "reading", label: "AI Reading", icon: "reading" },
    { key: "writing", label: "Intelligent Writing", icon: "writing" },
    { key: "agents", label: "Intelligent Agents", icon: "agents" },
    { key: "research", label: "Deep Research", icon: "research" },
    { key: "biblio", label: "Bibliometric Analysis", icon: "biblio" },
    { key: "review", label: "Literature Review", icon: "review" },
    { key: "translate", label: "Intelligent Translation", icon: "translate" },
    { key: "space", label: "My Space", icon: "space" }
  ];

  function renderShell() {
    const active = document.body.dataset.active || "qa";
    const root = document.getElementById("app");
    const page = document.getElementById("page");
    if (!root || !page) return;

    const navHtml = NAV.map((item) => {
      const cls = item.key === active ? "nav-item active" : "nav-item";
      return `<div class="${cls}">${ICONS[item.icon]}<span>${item.label}</span></div>`;
    }).join("");

    root.innerHTML = `
      <header class="header">
        <div class="brand"><span class="cnki">CNKI</span><span class="ai">AI</span></div>
        <div class="header-actions">
          <div class="item">Guide</div>
          <div class="item icon-btn" title="Language" aria-label="Language">${ICONS.globe}</div>
          <div class="item account"><span class="avatar">U</span><span>Account</span></div>
        </div>
      </header>
      <aside class="sidebar">${navHtml}</aside>
      <main class="main" id="main"></main>
    `;

    document.getElementById("main").appendChild(page);
    page.hidden = false;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderShell);
  } else {
    renderShell();
  }
})();
