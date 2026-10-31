(function () {
  "use strict";
  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }
  function renderOrganization() {
    const target = document.getElementById("organization-chart");
    if (!target) return;
    const roles = Array.isArray(window.CP_DATA?.roles) ? window.CP_DATA.roles : [];
    target.innerHTML = roles.map((role, index) => {
      const founder = role.role === "Founder";
      const tone = role.tone === "blue" ? "org-icon-blue" : role.tone === "violet" ? "org-icon-violet" : "";
      const connector = index ? `<div class="org-connector" aria-hidden="true"><span></span><i>${window.CP_ICON ? window.CP_ICON("chevron-down") : ""}</i></div>` : "";
      const pillTone = founder ? "role-pill-silver" : role.tone === "blue" ? "role-pill-blue" : "role-pill-violet";
      return `${connector}<article class="org-role-card ${founder ? "org-role-founder" : ""}">
        <div class="org-card-top"><span class="org-role-icon ${tone}" aria-hidden="true">${window.CP_ICON ? window.CP_ICON(role.icon) : ""}</span><span class="org-role-order">ROLE ${String(index + 1).padStart(2, "0")}</span></div>
        <p class="org-role-label">${escapeHTML(role.role).toUpperCase()}</p><h2>${escapeHTML(role.name)}</h2><p class="org-role-description">${escapeHTML(role.description)}</p>
        <div class="org-card-bottom"><span>CELCIUS PRIDE</span><span class="role-pill ${pillTone}">${escapeHTML(role.role).toUpperCase()}</span></div>
      </article>`;
    }).join("");
    if (!roles.length) target.innerHTML = `<div class="empty-state"><h3>Data organisasi belum tersedia</h3><p>Lengkapi data/organisasi.js.</p></div>`;
  }
  window.CP_INIT_ORGANIZATION = renderOrganization;
})();
