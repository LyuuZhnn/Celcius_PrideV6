(function () {
  "use strict";
  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }
  function renderListBabu() {
    const target = document.getElementById("babu-list");
    if (!target) return;
    const records = (window.CP_DATA && Array.isArray(window.CP_DATA.babuRecords)) ? window.CP_DATA.babuRecords : [];
    const search = document.getElementById("babu-search");
    const count = document.getElementById("babu-results-count");
    const total = document.getElementById("babu-total");
    const headingTotal = document.getElementById("babu-heading-total");
    const filters = [...document.querySelectorAll("[data-babu-filter]")];
    let active = "all";
    const setFilterCount = (key, value) => {
      const button = filters.find((item) => item.dataset.babuFilter === key);
      const badge = button?.querySelector("span");
      if (badge) badge.textContent = String(value);
    };
    if (total) total.innerHTML = `${String(records.length).padStart(2, "0")} <small>CATATAN</small>`;
    if (headingTotal) headingTotal.textContent = String(records.length).padStart(2, "0");
    setFilterCount("all", records.length);
    setFilterCount("dis", records.filter((record) => record.dis).length);
    function render() {
      const term = (search?.value || "").trim().toLocaleLowerCase("id-ID");
      const filtered = records.filter((record) => (active === "all" || (active === "dis" && record.dis)) && record.name.toLocaleLowerCase("id-ID").includes(term));
      if (count) count.textContent = `Menampilkan ${filtered.length} dari ${records.length} catatan`;
      if (!filtered.length) {
        target.innerHTML = `<div class="empty-state"><span class="empty-state-icon">${window.CP_ICON ? window.CP_ICON("search-x") : ""}</span><h3>Catatan tidak ditemukan</h3><p>Coba kata kunci lain atau ubah filter.</p></div>`;
        return;
      }
      target.innerHTML = filtered.map((record) => {
        const originalIndex = records.indexOf(record) + 1;
        return `<article class="babu-record"><span class="babu-record-index">${String(originalIndex).padStart(2, "0")}</span><div class="babu-record-name"><strong>${escapeHTML(record.name)}</strong><span>CELCIUS PRIDE / MATCH RECORD</span></div><div class="babu-record-tags"><span class="babu-score">${escapeHTML(record.score)}</span>${record.dis ? `<span class="babu-dis">(dis)</span>` : ""}</div></article>`;
      }).join("");
    }
    search?.addEventListener("input", render);
    filters.forEach((button) => button.addEventListener("click", () => {
      active = button.dataset.babuFilter || "all";
      filters.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      render();
    }));
    render();
  }
  window.CP_INIT_BABU = renderListBabu;
})();
