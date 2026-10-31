# CELCIUS PRIDE — One Circle. One Identity.

Website pusat informasi circle Free Fire **CELCIUS PRIDE** dengan desain premium monochrome, responsif, dan siap dipublikasikan melalui GitHub Pages.

## Isi website

- Beranda dengan wordmark **CELCIUS PRIDE** yang dipertahankan.
- Tentang Circle.
- Struktur Organisasi: Founder `??`, Pengurus `KIN RAMZY`, Kang OP Test `ELO KIN RAMZY`.
- Direktori anggota unik dengan filter Semua, PC, MOBI, dan HP serta pencarian nama.
- Halaman **LIST BABU CELCIUS PRIDE** dengan enam catatan match dan filter `(dis)`.
- Aktivitas, Pengumuman, dan Peraturan.
- Gabung Circle tanpa nomor, UID, atau tautan yang belum diberikan.
- Sidebar desktop, drawer mobile, pencarian, filter, accordion peraturan, dan tombol kembali ke atas.

## Data anggota final

Data anggota hanya disimpan satu kali pada `data/anggota.js`.

| Statistik | Jumlah |
|---|---:|
| Anggota unik | **16** |
| MOBI | **2** |
| HP | **15** |
| PC | **0** |
| Penempatan kategori | **17** |

`kzya` adalah satu anggota unik yang memiliki dua kategori perangkat: MOBI dan HP. Karena itu jumlah penempatan kategori adalah 17, tetapi jumlah anggota unik tetap 16. Filter Semua menampilkan 16 kartu, filter MOBI menampilkan 2 kartu, filter HP menampilkan 15 kartu, dan filter PC menampilkan empty state.

### Urutan anggota unik

`kzya`, `ramzyy`, `kin`, `bilzz`, `vicky`, `ramzy`, `samoen`, `jsten`, `cero`, `revv`, `zen`, `au`, `jiv`, `alzz`, `apel`, `elo`.

### Susunan organisasi

1. Founder — `??`
2. Pengurus — `KIN RAMZY`
3. Kang OP Test — `ELO KIN RAMZY`

### LIST BABU CELCIUS PRIDE

| No. | Nama | Skor | Keterangan |
|---:|---|---|---|
| 1 | MARGA 303 | [2-0] | — |
| 2 | NEXTPOINTER | [2-0] | — |
| 3 | BADUT MALAM ALL BASE | [2-0] | — |
| 4 | SP969 | [2-0] | — |
| 5 | flashly | [2-0] | (dis) |
| 6 | NEVERDIE | [2-0] | (dis) |

## Struktur folder

```text
CELCIUS-PRIDE/
├── index.html
├── pages/
│   ├── tentang.html
│   ├── struktur.html
│   ├── anggota.html
│   ├── list-babu.html
│   ├── aktivitas.html
│   ├── pengumuman.html
│   ├── peraturan.html
│   └── gabung.html
├── css/
│   ├── style.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── anggota.js
│   ├── organisasi.js
│   ├── list-babu.js
│   └── aktivitas.js
├── data/
│   ├── anggota.js
│   ├── organisasi.js
│   ├── list-babu.js
│   ├── aktivitas.js
│   ├── pengumuman.js
│   └── peraturan.js
├── assets/
│   ├── cp-logo.svg
│   └── favicon.svg
├── .nojekyll
└── README.md
```

## Mengubah data proyek

- Anggota dan kategori: edit `data/anggota.js`. Setiap anggota memiliki `id`, `name`, `devices`, dan `categoryOrder`. Statistik dan filter dihitung otomatis dari array `window.CP_DATA.members`.
- Struktur organisasi: edit `data/organisasi.js`. Founder saat ini sengaja ditulis `??`.
- List Babu: edit `data/list-babu.js`. Gunakan data yang telah dikonfirmasi.
- Aktivitas: edit `data/aktivitas.js` dan tambahkan kegiatan yang benar-benar ada.
- Pengumuman: edit `data/pengumuman.js` dan tambahkan pengumuman resmi.
- Peraturan: edit `data/peraturan.js`. Semua teks awal diberi status `DRAFT`, bukan aturan resmi.
- Kontak Gabung: lengkapi hanya dengan kontak resmi yang sudah dikonfirmasi.

Seluruh fitur berjalan di browser tanpa backend. Website GitHub Pages bersifat statis; perubahan data untuk semua pengunjung dilakukan dengan memperbarui file proyek lalu mengunggahnya ke GitHub.

## Upload ke GitHub Pages lewat Termux (Android)

1. Unduh `CELCIUS_PRIDE_FINAL.zip` ke folder **Download** Android.
2. Pastikan repositori GitHub bernama `CELCIUS-PRIDE` sudah dibuat. Repositori boleh berisi versi website lama; jika baru dibuat, biarkan kosong.
3. Ganti `USERNAME_GITHUB` pada URL di bawah dengan username GitHub milikmu, lalu tempel seluruh blok ke Termux. Cara ini meng-clone repositori dahulu, lalu menyalin versi final ke dalam repositori tersebut agar riwayat Git yang sudah ada tetap terjaga.

```bash
termux-setup-storage
pkg update -y
pkg install git unzip -y

git clone https://github.com/USERNAME_GITHUB/CELCIUS-PRIDE.git ~/CELCIUS-PRIDE-REPO
mkdir -p ~/CP_IMPORT
unzip -o ~/storage/downloads/CELCIUS_PRIDE_FINAL.zip -d ~/CP_IMPORT

cd ~/CELCIUS-PRIDE-REPO || exit
cp -rf ~/CP_IMPORT/CELCIUS-PRIDE/. .
git switch -C main
git add .
git commit -m "Update CELCIUS PRIDE website"
git push -u origin main
```

Jika Git meminta nama dan email untuk commit, isi dengan identitas Git milikmu. Untuk autentikasi GitHub, ikuti metode autentikasi resmi yang diminta Git. Jangan menaruh token atau password di source code.

### Aktifkan GitHub Pages

1. Buka repositori `CELCIUS-PRIDE` di GitHub.
2. Masuk ke **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/ (root)`, lalu tekan **Save**.
5. Buka alamat Pages yang ditampilkan GitHub. Format umumnya: `https://USERNAME_GITHUB.github.io/CELCIUS-PRIDE/`.

### Upload perubahan berikutnya

Setelah repositori berhasil di-clone, untuk mengunggah perubahan berikutnya cukup salin file terbaru ke folder proyek, lalu jalankan:

```bash
cd ~/CELCIUS-PRIDE-REPO
git add .
git commit -m "Update CELCIUS PRIDE website"
git push
```

## Catatan teknis

- Menggunakan HTML5, CSS3, Vanilla JavaScript, dan SVG lokal.
- Semua halaman memakai path relatif agar cocok dengan GitHub Pages berbasis nama repositori.
- Tidak ada panel admin palsu, autentikasi fiktif, backend, database, atau token rahasia.
- Website dapat dibuka langsung dari `index.html` atau di-host melalui GitHub Pages.
