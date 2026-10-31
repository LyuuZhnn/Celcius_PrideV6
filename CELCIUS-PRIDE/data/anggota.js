/* Satu-satunya sumber data anggota unik CELCIUS PRIDE.
   Urutan array adalah urutan filter Semua. categoryOrder menjaga urutan khusus per perangkat. */
window.CP_DATA = window.CP_DATA || {};
window.CP_DATA.members = [
  { id: "kzya", name: "kzya", devices: ["MOBI", "HP"], categoryOrder: { MOBI: 1, HP: 2 } },
  { id: "ramzyy", name: "ramzyy", devices: ["MOBI"], categoryOrder: { MOBI: 2 } },
  { id: "kin", name: "kin", devices: ["HP"], categoryOrder: { HP: 1 } },
  { id: "bilzz", name: "bilzz", devices: ["HP"], categoryOrder: { HP: 3 } },
  { id: "vicky", name: "vicky", devices: ["HP"], categoryOrder: { HP: 4 } },
  { id: "ramzy", name: "ramzy", devices: ["HP"], categoryOrder: { HP: 5 } },
  { id: "samoen", name: "samoen", devices: ["HP"], categoryOrder: { HP: 6 } },
  { id: "jsten", name: "jsten", devices: ["HP"], categoryOrder: { HP: 7 } },
  { id: "cero", name: "cero", devices: ["HP"], categoryOrder: { HP: 8 } },
  { id: "revv", name: "revv", devices: ["HP"], categoryOrder: { HP: 9 } },
  { id: "zen", name: "zen", devices: ["HP"], categoryOrder: { HP: 10 } },
  { id: "au", name: "au", devices: ["HP"], categoryOrder: { HP: 11 } },
  { id: "jiv", name: "jiv", devices: ["HP"], categoryOrder: { HP: 12 } },
  { id: "alzz", name: "alzz", devices: ["HP"], categoryOrder: { HP: 13 } },
  { id: "apel", name: "apel", devices: ["HP"], categoryOrder: { HP: 14 } },
  { id: "elo", name: "elo", devices: ["HP"], categoryOrder: { HP: 15 } }
];

/* Semua statistik kategori dihitung dari data anggota unik di atas. */
window.CP_DATA.memberCounts = {
  unique: window.CP_DATA.members.length,
  PC: window.CP_DATA.members.filter((member) => member.devices.includes("PC")).length,
  MOBI: window.CP_DATA.members.filter((member) => member.devices.includes("MOBI")).length,
  HP: window.CP_DATA.members.filter((member) => member.devices.includes("HP")).length
};
window.CP_DATA.categoryPlacementCount = ["PC", "MOBI", "HP"].reduce(
  (total, category) => total + window.CP_DATA.memberCounts[category], 0
);
