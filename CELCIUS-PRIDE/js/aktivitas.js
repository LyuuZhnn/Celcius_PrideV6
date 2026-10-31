(function () {
  "use strict";

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
    });
  }

  function formatDate(dateValue) {
    if (!dateValue) return { day: "--", month: "TBD", full: "Tanggal belum ditentukan" };
    const parsed = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return { day: "--", month: "TBD", full: escapeHTML(dateValue) };
    return {
      day: new Intl.DateTimeFormat("id-ID", { day: "2-digit" }).format(parsed),
      month: new Intl.DateTimeFormat("id-ID", { month: "short" }).format(parsed).toUpperCase(),
      full: new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(parsed)
    };
  }

  function statusClass(status) {
    if (status === "Berlangsung") return "ongoing";
    if (status === "Selesai") return "done";
    return "upcoming";
  }

  function emptyState(icon, title, description) {
    return `<div class="empty-state"><span class="empty-state-icon">${window.CP_ICON ? window.CP_ICON(icon) : ""}</span><h3>${escapeHTML(title)}</h3><p>${escapeHTML(description)}</p></div>`;
  }

  function renderActivities() {
    const target = document.getElementById("activity-list");
    if (!target) return;
    const activities = (window.CP_DATA && Array.isArray(window.CP_DATA.activities)) ? window.CP_DATA.activities : [];
    if (!activities.length) {
      target.innerHTML = emptyState("calendar-days", "Belum ada aktivitas yang tersedia", "Jadwal aktivitas akan muncul setelah data resmi ditambahkan ke data/aktivitas.js.");
      return;
    }
    const sorted = [...activities].sort((a, b) => String(a.date || "9999").localeCompare(String(b.date || "9999")));
    target.innerHTML = sorted.map((item) => {
      const date = formatDate(item.date);
      const category = item.category || "Lainnya";
      const status = item.status || "Akan Datang";
      const timeMarkup = item.time ? `<span>${window.CP_ICON ? window.CP_ICON("clock-3") : ""}${escapeHTML(item.time)}</span>` : "";
      return `<article class="activity-card">
        <div class="activity-date-box"><strong>${escapeHTML(date.day)}</strong><span>${escapeHTML(date.month)}</span></div>
        <div class="activity-card-content"><div class="activity-card-top"><span class="category-badge">${escapeHTML(category)}</span><span class="status-badge ${statusClass(status)}">${escapeHTML(status)}</span></div>
        <h3>${escapeHTML(item.title || "Aktivitas tanpa judul")}</h3><p>${escapeHTML(item.description || "Belum ada keterangan aktivitas.")}</p>
        <div class="activity-meta"><span>${window.CP_ICON ? window.CP_ICON("calendar-days") : ""}${escapeHTML(date.full)}</span>${timeMarkup}</div></div>
      </article>`;
    }).join("");
  }

  function renderAnnouncements() {
    const target = document.getElementById("announcement-list");
    if (!target) return;
    const announcements = (window.CP_DATA && Array.isArray(window.CP_DATA.announcements)) ? window.CP_DATA.announcements : [];
    if (!announcements.length) {
      target.innerHTML = emptyState("megaphone", "Belum ada pengumuman", "Belum ada pengumuman resmi yang ditambahkan. Informasi akan tampil di sini setelah data/pengumuman.js diperbarui.");
      return;
    }
    const sorted = [...announcements].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
    target.innerHTML = sorted.map((item) => {
      const date = formatDate(item.date);
      const important = Boolean(item.important);
      return `<article class="announcement-card ${important ? "important" : ""}">
        <span class="announcement-card-mark">${window.CP_ICON ? window.CP_ICON(important ? "bell-ring" : "megaphone") : ""}</span>
        <div class="announcement-card-content"><div class="announcement-card-top"><span class="category-badge">${escapeHTML(item.category || "Informasi")}</span>${important ? `<span class="status-badge" style="color:#e8b45a;border-color:rgba(232,180,90,.22)">PENTING</span>` : ""}</div>
        <h3>${escapeHTML(item.title || "Pengumuman")}</h3><p>${escapeHTML(item.content || "")}</p><div class="activity-meta"><span>${window.CP_ICON ? window.CP_ICON("calendar-days") : ""}${escapeHTML(date.full)}</span></div></div>
      </article>`;
    }).join("");
  }

  function renderRules() {
    const target = document.getElementById("rules-list");
    if (!target) return;
    const rules = (window.CP_DATA && Array.isArray(window.CP_DATA.rules)) ? window.CP_DATA.rules : [];
    if (!rules.length) {
      target.innerHTML = emptyState("shield-check", "Peraturan belum tersedia", "Tambahkan peraturan resmi di data/peraturan.js.");
      return;
    }
    target.innerHTML = rules.map((rule, index) => `<details class="rule-item" ${index === 0 ? "open" : ""}>
      <summary><span class="rule-number">${String(index + 1).padStart(2, "0")}</span><strong>${escapeHTML(rule.title || `Aturan ${index + 1}`)}</strong>${rule.draft ? `<span class="draft-badge">DRAFT</span>` : ""}<span class="rule-chevron">${window.CP_ICON ? window.CP_ICON("chevron-down") : ""}</span></summary>
      <p class="rule-description">${escapeHTML(rule.description || "Konten belum tersedia.")}</p></details>`).join("");
  }

  window.CP_INIT_ACTIVITIES = renderActivities;
  window.CP_INIT_ANNOUNCEMENTS = renderAnnouncements;
  window.CP_INIT_RULES = renderRules;
})();
