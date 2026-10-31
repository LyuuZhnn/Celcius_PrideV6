(function () {
  "use strict";

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function initials(name) {
    const clean = String(name || "").trim();
    return clean ? clean.charAt(0).toLocaleUpperCase("id-ID") : "?";
  }

  function renderMembers() {
    const list = document.getElementById("members-list");
    if (!list) return;

    const data = Array.isArray(window.CP_DATA?.members) ? window.CP_DATA.members : [];
    const categories = ["PC", "MOBI", "HP"];
    const counts = Object.fromEntries(categories.map((category) => [
      category,
      data.filter((member) => Array.isArray(member.devices) && member.devices.includes(category)).length
    ]));
    const uniqueCount = data.length;
    const search = document.getElementById("member-search");
    const countLabel = document.getElementById("member-results-count");
    const filterButtons = Array.from(document.querySelectorAll("[data-member-filter]"));
    let activeFilter = "all";

    const setText = (id, value) => {
      const node = document.getElementById(id);
      if (node) node.textContent = String(value);
    };

    setText("members-pc-count", counts.PC);
    setText("members-mobi-count", counts.MOBI);
    setText("members-hp-count", counts.HP);
    setText("members-total-count", uniqueCount);
    setText("members-heading-total", uniqueCount);
    setText("filter-count-all", uniqueCount);
    setText("filter-count-pc", counts.PC);
    setText("filter-count-mobi", counts.MOBI);
    setText("filter-count-hp", counts.HP);

    function cardMarkup(member) {
      const devices = Array.isArray(member.devices) ? member.devices : [];
      const tags = devices.length
        ? devices.map((device) => `<span class="member-category-tag ${escapeHTML(device.toLowerCase())}">${escapeHTML(device)}</span>`).join("")
        : `<span class="member-category-tag pc">PC</span>`;
      return `<article class="member-card" data-member-id="${escapeHTML(member.id || member.name)}">
        <span class="member-avatar" aria-hidden="true">${escapeHTML(initials(member.name))}</span>
        <div class="member-info"><strong>${escapeHTML(member.name)}</strong><div class="member-tags">${tags}</div></div>
      </article>`;
    }

    function emptySearchMarkup() {
      return `<div class="empty-state"><span class="empty-state-icon">${window.CP_ICON ? window.CP_ICON("search-x") : ""}</span><h3>Anggota tidak ditemukan</h3><p>Coba nama lain atau ubah filter kategori untuk melihat hasil yang tersedia.</p></div>`;
    }

    function emptyPcMarkup() {
      return `<div class="empty-state category-empty"><span class="empty-state-icon">${window.CP_ICON ? window.CP_ICON("monitor") : ""}</span><h3>Belum ada nama anggota PC yang dicantumkan.</h3><p>Kategori PC tetap tersedia dan dapat diperbarui ketika daftar anggotanya diberikan.</p></div>`;
    }

    function getFilteredMembers(term) {
      let result = data.filter((member) => {
        const matchesCategory = activeFilter === "all" || (Array.isArray(member.devices) && member.devices.includes(activeFilter));
        const matchesSearch = String(member.name || "").toLocaleLowerCase("id-ID").includes(term);
        return matchesCategory && matchesSearch;
      });

      if (activeFilter !== "all") {
        result = result.sort((a, b) => {
          const orderA = Number(a.categoryOrder?.[activeFilter] ?? Number.MAX_SAFE_INTEGER);
          const orderB = Number(b.categoryOrder?.[activeFilter] ?? Number.MAX_SAFE_INTEGER);
          return orderA - orderB;
        });
      }
      return result;
    }

    function render() {
      const term = (search ? search.value : "").trim().toLocaleLowerCase("id-ID");
      const filtered = getFilteredMembers(term);

      if (countLabel) {
        if (activeFilter === "all") {
          countLabel.textContent = `Menampilkan ${filtered.length} dari ${uniqueCount} anggota unik`;
        } else {
          countLabel.textContent = `Menampilkan ${filtered.length} hasil pada kategori ${activeFilter}`;
        }
      }

      if (activeFilter === "PC") {
        list.innerHTML = emptyPcMarkup();
        return;
      }

      if (term && !filtered.length) {
        list.innerHTML = emptySearchMarkup();
        return;
      }

      list.innerHTML = `<div class="members-grid">${filtered.map(cardMarkup).join("")}</div>`;
    }

    if (search) search.addEventListener("input", render);
    filterButtons.forEach((button) => button.addEventListener("click", () => {
      activeFilter = button.dataset.memberFilter || "all";
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      render();
    }));

    render();
  }

  window.CP_INIT_MEMBERS = renderMembers;
})();
