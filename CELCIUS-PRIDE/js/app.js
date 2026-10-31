(function () {
  "use strict";

  const ICONS = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.3"/><rect x="14" y="3" width="7" height="7" rx="1.3"/><rect x="3" y="14" width="7" height="7" rx="1.3"/><rect x="14" y="14" width="7" height="7" rx="1.3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    network: '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="2.5" y="16" width="6" height="5" rx="1"/><rect x="15.5" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M5.5 16v-3h13v3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    'monitor-smartphone': '<rect x="2.5" y="3" width="14" height="13" rx="2"/><path d="M7 20h5M9.5 16v4"/><rect x="16" y="10" width="5.5" height="11" rx="1.4"/><path d="M18 18.2h1.5"/>',
    monitor: '<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8M12 16v5"/>',
    smartphone: '<rect x="6" y="2" width="12" height="20" rx="2.2"/><path d="M10 5h4M11 18.5h2"/>',
    'git-branch': '<circle cx="6" cy="3" r="2"/><circle cx="6" cy="21" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 5v14M18 8a6 6 0 0 1-6 6H6"/>',
    'messages-square': '<path d="M21 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-5.5A7.5 7.5 0 1 1 21 11.5Z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>',
    'git-merge': '<circle cx="6" cy="3" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="21" r="2"/><path d="M6 5v14M18 8a6 6 0 0 1-6 6H6"/>',
    'file-pen-line': '<path d="M12 20H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9l5 5v3"/><path d="M14 3v6h6M12 18.5l5.5-5.5a2.12 2.12 0 0 1 3 3L15 21l-4 1z"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    'calendar-days': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/>',
    'calendar-check-2': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m3 5-3 3-2-2"/>',
    megaphone: '<path d="m3 11 18-5v12L3 13z"/><path d="M11 15.2 13 21H8l-1.5-7.2M21 10v4"/>',
    'bell-ring': '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/><path d="M2 8a10 10 0 0 1 2-4M22 8a10 10 0 0 0-2-4"/>',
    'shield-check': '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    'user-round-plus': '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M19 8v6M16 11h6"/>',
    'user-plus': '<path d="M15 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M16 11h6"/>',
    crown: '<path d="m2 7 5 4 5-7 5 7 5-4-2 13H4L2 7Z"/><path d="M4 17h16"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    'search-x': '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4m-7-8 4 4m0-4-4 4"/>',
    'file-warning': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 12v4M12 19h.01"/>',
    'pencil-line': '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/><path d="m15 5 4 4"/>',
    'settings-2': '<path d="M20 7h-9M14 17H5M20 17h-2M5 7H3M8 7V3M16 17v4M14 7a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM6 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/>',
    'list-checks': '<path d="m3 6 2 2 4-4M3 12l2 2 4-4M13 6h8M13 12h8M3 18l2 2 4-4M13 18h8"/>',
    'lock-keyhole': '<rect x="3" y="10" width="18" height="11" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3M12 14v3"/>',
    'clock-3': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'external-link': '<path d="M15 3h6v6M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="m18 6-12 12M6 6l12 12"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>'
  };

  function icon(name, className) {
    const paths = ICONS[name] || ICONS.grid;
    return `<svg class="${className || ""}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
  }
  window.CP_ICON = icon;

  const ROUTES = {
    home: { path: "index.html", label: "Beranda", title: "Beranda", subtitle: "Ringkasan informasi CELCIUS PRIDE", icon: "grid" },
    tentang: { path: "pages/tentang.html", label: "Tentang Circle", title: "Tentang Circle", subtitle: "Identitas dan nilai komunitas", icon: "info" },
    struktur: { path: "pages/struktur.html", label: "Struktur Organisasi", title: "Struktur Organisasi", subtitle: "Susunan jabatan circle", icon: "network" },
    anggota: { path: "pages/anggota.html", label: "Anggota", title: "Anggota", subtitle: "Direktori PC, MOBI, dan HP", icon: "users" },
    babu: { path: "pages/list-babu.html", label: "LIST BABU", title: "LIST BABU", subtitle: "Catatan match CELCIUS PRIDE", icon: "list-checks" },
    aktivitas: { path: "pages/aktivitas.html", label: "Aktivitas", title: "Aktivitas", subtitle: "Kegiatan dan momen circle", icon: "calendar-days" },
    pengumuman: { path: "pages/pengumuman.html", label: "Pengumuman", title: "Pengumuman", subtitle: "Informasi resmi circle", icon: "megaphone" },
    peraturan: { path: "pages/peraturan.html", label: "Peraturan", title: "Peraturan", subtitle: "Panduan komunitas", icon: "shield-check" },
    gabung: { path: "pages/gabung.html", label: "Gabung Circle", title: "Gabung Circle", subtitle: "Informasi bergabung dengan CP", icon: "user-plus" }
  };

  function safeRouteURL(base, routeKey) {
    const route = ROUTES[routeKey];
    return route ? `${base}${route.path}` : `${base}index.html`;
  }

  function renderShell(app, contentHTML, pageKey, base) {
    const activeRoute = ROUTES[pageKey] || ROUTES.home;
    const navItems = Object.entries(ROUTES).map(([key, route]) => {
      const active = key === pageKey;
      return `<a class="nav-link" href="${safeRouteURL(base, key)}" data-route="${key}" ${active ? 'aria-current="page"' : ""}>
        ${icon(route.icon, "nav-icon")}<span class="nav-label">${route.label}</span><span class="nav-arrow" aria-hidden="true">↗</span>
      </a>`;
    }).join("");

    app.innerHTML = `
      <aside class="sidebar" id="sidebar" aria-label="Navigasi utama">
        <div class="sidebar-brand"><a class="brand-lockup" data-route="home" href="${safeRouteURL(base, "home")}" aria-label="CELCIUS PRIDE, beranda"><span class="brand-mark"><img src="${base}assets/cp-logo.svg" alt="" /></span><span class="brand-name"><strong>CELCIUS PRIDE</strong><small>FREE FIRE CIRCLE</small></span></a></div>
        <div class="sidebar-caption">MAIN MENU</div><nav class="sidebar-nav">${navItems}</nav>
        <div class="sidebar-spacer"></div>
        <div class="sidebar-bottom-card"><div class="sidebar-bottom-top">${icon("shield-check")}<span>ONE CIRCLE</span></div><p>One identity. Built on togetherness.</p></div>
        <div class="sidebar-footer"><span><strong>CP</strong> / COMMUNITY</span><span>v1.0</span></div>
      </aside>
      <button class="sidebar-overlay" id="sidebar-overlay" type="button" aria-label="Tutup navigasi"></button>
      <div class="app-frame">
        <header class="app-topbar">
          <div class="topbar-left"><button class="menu-toggle" id="menu-toggle" type="button" aria-label="Buka navigasi" aria-expanded="false" aria-controls="sidebar"><span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span></button><span class="topbar-divider" aria-hidden="true"></span><div class="topbar-context"><span class="topbar-label">CELCIUS PRIDE / COMMUNITY HUB</span><strong>${activeRoute.title}</strong><span>${activeRoute.subtitle}</span></div></div>
          <div class="topbar-right"><span class="topbar-status"><span class="status-dot"></span> Circle Overview</span><div class="brand-mark topbar-mark" aria-hidden="true"><img src="${base}assets/cp-logo.svg" alt="" /></div></div>
        </header>
        <main id="page-content" class="page-content">${contentHTML}</main>
        <footer class="app-footer"><a class="footer-brand" data-route="home" href="${safeRouteURL(base, "home")}"><span class="footer-mark"><img src="${base}assets/cp-logo.svg" alt="" /></span><span class="footer-brand-copy"><strong>CELCIUS PRIDE</strong><span>One Circle. One Identity.</span></span></a><nav class="footer-nav" aria-label="Navigasi footer"><a data-route="tentang" href="${safeRouteURL(base, "tentang")}">Tentang</a><a data-route="anggota" href="${safeRouteURL(base, "anggota")}">Anggota</a><a data-route="peraturan" href="${safeRouteURL(base, "peraturan")}">Peraturan</a><a data-route="gabung" href="${safeRouteURL(base, "gabung")}">Gabung Circle</a></nav><div class="footer-meta">© <span id="footer-year">${new Date().getFullYear()}</span> CELCIUS PRIDE<br>Pusat informasi circle</div></footer>
      </div><button class="back-to-top" id="back-to-top" type="button" aria-label="Kembali ke atas" title="Kembali ke atas">${icon("chevron-down")}</button>`;
  }

  function hydrateIcons() {
    document.querySelectorAll("[data-icon]").forEach((element) => {
      if (!element.children.length && !element.textContent.trim()) {
        element.innerHTML = icon(element.getAttribute("data-icon"), "");
      }
    });
  }

  function setRoutes(base) {
    document.querySelectorAll("[data-route]").forEach((element) => {
      const key = element.getAttribute("data-route");
      if (ROUTES[key]) element.setAttribute("href", safeRouteURL(base, key));
    });
  }

  function setupSidebar() {
    const toggle = document.getElementById("menu-toggle");
    const overlay = document.getElementById("sidebar-overlay");
    const sidebar = document.getElementById("sidebar");
    if (!toggle || !overlay || !sidebar) return;

    const mobileQuery = window.matchMedia("(max-width: 760px)");
    function isMobile() { return mobileQuery.matches; }
    function closeDrawer() {
      document.body.classList.remove("drawer-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", isMobile() ? "Buka navigasi" : (document.body.classList.contains("sidebar-collapsed") ? "Perluas sidebar" : "Perkecil sidebar"));
      if (isMobile()) {
        sidebar.inert = true;
        sidebar.setAttribute("aria-hidden", "true");
      } else {
        sidebar.inert = false;
        sidebar.removeAttribute("aria-hidden");
      }
    }
    function openDrawer() {
      document.body.classList.add("drawer-open");
      sidebar.inert = false;
      sidebar.removeAttribute("aria-hidden");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Tutup navigasi");
    }
    toggle.addEventListener("click", () => {
      if (isMobile()) {
        document.body.classList.contains("drawer-open") ? closeDrawer() : openDrawer();
      } else {
        document.body.classList.toggle("sidebar-collapsed");
        const collapsed = document.body.classList.contains("sidebar-collapsed");
        toggle.setAttribute("aria-label", collapsed ? "Perluas sidebar" : "Perkecil sidebar");
        toggle.setAttribute("aria-pressed", String(collapsed));
        toggle.setAttribute("title", collapsed ? "Perluas sidebar" : "Perkecil sidebar");
      }
    });
    overlay.addEventListener("click", closeDrawer);
    sidebar.querySelectorAll("a[data-route]").forEach((link) => link.addEventListener("click", () => {
      if (isMobile()) closeDrawer();
    }));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("drawer-open")) {
        closeDrawer();
        toggle.focus();
      }
    });
    mobileQuery.addEventListener?.("change", () => {
      closeDrawer();
      if (isMobile()) {
        document.body.classList.remove("sidebar-collapsed");
        toggle.removeAttribute("aria-pressed");
        toggle.setAttribute("aria-label", "Buka navigasi");
        toggle.removeAttribute("title");
      } else {
        toggle.setAttribute("aria-label", document.body.classList.contains("sidebar-collapsed") ? "Perluas sidebar" : "Perkecil sidebar");
      }
    });
    if (isMobile()) closeDrawer();
    else {
      sidebar.inert = false;
      sidebar.removeAttribute("aria-hidden");
      toggle.setAttribute("aria-label", "Perkecil sidebar");
    }
  }

  function updateHomeStats() {
    const members = Array.isArray(window.CP_DATA?.members) ? window.CP_DATA.members : [];
    const roles = Array.isArray(window.CP_DATA?.roles) ? window.CP_DATA.roles : [];
    const count = (category) => members.filter((member) => Array.isArray(member.devices) && member.devices.includes(category)).length;
    const values = {
      "stat-group": members.length,
      "stat-mobi": count("MOBI"),
      "stat-hp": count("HP"),
      "stat-pc": count("PC")
    };
    Object.entries(values).forEach(([id, value]) => {
      const node = document.getElementById(id);
      if (node) node.textContent = String(value);
    });

    const orgPreview = document.getElementById("home-org-preview");
    if (orgPreview) {
      orgPreview.innerHTML = roles.map((role, index) => {
        const safeRole = String(role.role || "").replace(/[&<>"']/g, "");
        const safeName = String(role.name || "").replace(/[&<>"']/g, "");
        const pillClass = index === 1 ? "role-pill-blue" : index === 2 ? "role-pill-violet" : "role-pill-silver";
        return `<div class="mini-org-item"><span class="mini-org-symbol">${String(index + 1).padStart(2, "0")}</span><div><strong>${safeRole}</strong><span>${safeName}</span></div><span class="role-pill ${pillClass}">${safeRole.toUpperCase()}</span></div>`;
      }).join("");
    }

    const preview = document.getElementById("home-member-preview");
    if (preview) {
      preview.innerHTML = members.slice(0, 8).map((member) => {
        const name = String(member.name || "");
        const initial = name.trim() ? name.trim().charAt(0).toLocaleUpperCase("id-ID") : "?";
        const safeName = name.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
        return `<div class="avatar-preview"><span class="avatar-preview-initial" aria-hidden="true">${initial}</span><span class="avatar-preview-name">${safeName}</span></div>`;
      }).join("");
    }
    const previewCount = document.getElementById("home-member-preview-count");
    if (previewCount) previewCount.textContent = `${members.length} anggota unik tercatat`;

    const babuPreview = document.getElementById("home-babu-preview");
    if (babuPreview) {
      const records = Array.isArray(window.CP_DATA?.babuRecords) ? window.CP_DATA.babuRecords : [];
      babuPreview.innerHTML = records.slice(0, 3).map((record) => {
        const safeName = String(record.name || "").replace(/[&<>"']/g, "");
        const safeScore = String(record.score || "").replace(/[&<>"']/g, "");
        return `<div class="home-babu-row"><span>${safeName}</span><strong>${safeScore}</strong></div>`;
      }).join("");
      const total = document.getElementById("home-babu-total");
      if (total) total.textContent = `${records.length} CATATAN`;
    }
  }

  function setupBackToTop() {
    const button = document.getElementById("back-to-top");
    if (!button) return;
    const update = () => button.classList.toggle("is-visible", window.scrollY > 360);
    window.addEventListener("scroll", update, { passive: true });
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
    update();
  }

  function boot() {
    const app = document.getElementById("app");
    if (!app) return;
    const pageKey = app.dataset.page || "home";
    const base = app.dataset.base || "./";
    const content = app.querySelector("#page-content");
    const contentHTML = content ? content.innerHTML : "";
    renderShell(app, contentHTML, pageKey, base);
    setRoutes(base);
    hydrateIcons();
    setupSidebar();
    updateHomeStats();
    if (window.CP_INIT_MEMBERS) window.CP_INIT_MEMBERS();
    if (window.CP_INIT_ORGANIZATION) window.CP_INIT_ORGANIZATION();
    if (window.CP_INIT_ACTIVITIES) window.CP_INIT_ACTIVITIES();
    if (window.CP_INIT_ANNOUNCEMENTS) window.CP_INIT_ANNOUNCEMENTS();
    if (window.CP_INIT_RULES) window.CP_INIT_RULES();
    if (window.CP_INIT_BABU) window.CP_INIT_BABU();
    setupBackToTop();
    const year = document.getElementById("footer-year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
