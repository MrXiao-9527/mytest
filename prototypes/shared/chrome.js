(function () {
  const ICONS = {
    qa: '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-3a8 8 0 1 1 18-8z"/></svg>',
    reading: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v15H6.5A2.5 2.5 0 0 0 4 19.5z"/></svg>',
    writing: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    agents: '<svg viewBox="0 0 24 24"><rect x="5" y="8" width="14" height="10" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>',
    research: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>',
    biblio: '<svg viewBox="0 0 24 24"><path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-7"/><path d="M22 19V3"/></svg>',
    review: '<svg viewBox="0 0 24 24"><path d="M8 6h12"/><path d="M8 12h12"/><path d="M8 18h12"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>',
    translate: '<svg viewBox="0 0 24 24"><path d="M5 8h8"/><path d="M9 8c0 5-2 8-6 10"/><path d="M7 12c2 2 4 3 7 3"/><path d="m14 20 4-10 4 10"/><path d="M15.5 16h5"/></svg>',
    space: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/></svg>',
    globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>'
  };

  const NAV = [
    ["qa", "Q&A"],
    ["reading", "AI Reading"],
    ["writing", "Intelligent Writing"],
    ["agents", "Intelligent Agents"],
    ["research", "Deep Research"],
    ["biblio", "Bibliometric Analysis"],
    ["review", "Literature Review"],
    ["translate", "Intelligent Translation"],
    ["space", "My Space"]
  ];

  function mount() {
    const active = document.body.dataset.active || "qa";
    const app = document.createElement("div");
    app.className = "app";

    const header = document.createElement("header");
    header.className = "header";
    header.innerHTML = `
      <div class="logo"><span class="cnki">CNKI</span><span class="ai">AI</span></div>
      <div class="header-actions">
        <a class="guide" href="#">Guide</a>
        <span class="lang" title="Language" aria-label="Language">${ICONS.globe}</span>
        <a class="account" href="#"><span class="avatar">U</span><span>Account</span></a>
      </div>
    `;

    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";
    const ul = document.createElement("ul");
    ul.className = "nav";
    NAV.forEach(([key, label]) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      if (key === active) a.className = "active";
      a.innerHTML = `${ICONS[key]}<span>${label}</span>`;
      li.appendChild(a);
      ul.appendChild(li);
    });
    sidebar.appendChild(ul);

    const main = document.createElement("main");
    main.className = "main";
    const slot = document.getElementById("screen");
    if (slot) {
      slot.hidden = false;
      slot.classList.add("screen");
      main.appendChild(slot);
    }

    app.appendChild(header);
    app.appendChild(sidebar);
    app.appendChild(main);
    document.body.prepend(app);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
