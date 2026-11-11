# KinoUz — Onlayn kinolar katalogi

**Tillar:** [English](README.md) · [O'zbekcha](README.uz.md) · [Deutsch](README.de.md)

KinoUz — kinolar katalogini ko'rsatuvchi, qidiruv, sevimlilarga qo'shish va video
ijro etish imkoniyatiga ega veb-ilova. Loyiha JavaScript kursi uchun yaratilgan.

**Yaratuvchi:** Asadullo Mirhamidullayev

---

## Asosiy imkoniyatlar

- Kinolar ro'yxatini serverdan (JSON Server orqali) dinamik yuklash
- Nom bo'yicha real vaqtda qidiruv
- "Mashhur kinolar" bo'limi (reyting 8.0 va undan yuqori)
- "Barcha kinolar" bo'limi
- Har bir bo'lim uchun "Hammasini ko'rish / Yopish" tugmasi (dastlab 4 ta karta ko'rsatiladi)
- Sevimlilarga qo'shish (❤️ / 🤍)
- Video ijro etish oynasi (modal):
  - YouTube havolalari (`youtu.be`, `youtube.com/watch`, `/embed/`, `/shorts/`)
  - To'g'ridan-to'g'ri fayllar: `.mp4`, `.webm`, `.ogg`
  - HLS oqimlari: `.m3u8` (hls.js orqali)
  - Boshqa havolalar yangi oynada ochiladi
- Admin panel: kino qo'shish, tahrirlash, o'chirish
- Animatsiyalar (AOS kutubxonasi)

---

## Texnologiyalar

| Qism | Texnologiya |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Ma'lumotlar bazasi | `db.json` (JSON Server) |
| API | JSON Server (REST) |
| Animatsiya | AOS 2.3.1 |
| Video (HLS) | hls.js 1.5.8 |
| Dev server | VS Code Live Server (port 5501) |

---

## Loyiha tuzilmasi

```
Exam-js/
├── .vscode/
│   └── settings.json   # Live Server porti (5501)
├── index.html          # Asosiy sahifa (katalog)
├── script.js           # Asosiy sahifa mantiqi
├── style.css           # Asosiy sahifa uslublari
├── admin.html          # Admin panel
├── admin.js            # Admin panel mantiqi
├── admin.css           # Admin panel uslublari
└── db.json             # Kinolar ma'lumotlar bazasi
```

---

## O'rnatish va ishga tushirish

### 1. Talablar

- [Node.js](https://nodejs.org/) (npm bilan birga)
- VS Code va **Live Server** kengaytmasi (ixtiyoriy, statik fayllar uchun)

### 2. JSON Server ni o'rnatish

```bash
npm install -g json-server
```

### 3. Ma'lumotlar serverini ishga tushirish

Loyiha papkasida:

```bash
json-server --watch db.json --port 3000
```

Server `http://localhost:3000/movies` manzilida ishlaydi.

### 4. Frontendni ochish

Quyidagilardan birini bajaring:

- VS Code da `index.html` faylini o'ng tugma → **Open with Live Server** (`http://127.0.0.1:5501`)
- Yoki istalgan statik server orqali loyiha papkasini oching

> **Muhim:** Avval JSON Server (3000-port) ishlab turishi kerak, aks holda kinolar yuklanmaydi.

---

## Ma'lumotlar modeli

`db.json` ichidagi har bir kino quyidagi maydonlarga ega:

| Maydon | Turi | Tavsif |
|---|---|---|
| `id` | string / number | Noyob identifikator |
| `title` | string | Kino nomi |
| `year` | number | Chiqarilgan yili |
| `genre` | string | Janri |
| `rating` | number | Reyting (masalan, `8.5`) |
| `img` | string | Poster rasmi havolasi |
| `video` | string | Video havolasi (YouTube, `.mp4`, `.m3u8` yoki boshqa) |

**Misol:**

```json
{
  "id": "7",
  "title": "Sehrli o'rmon",
  "year": 2023,
  "genre": "Multfilm",
  "rating": 8.1,
  "img": "https://picsum.photos/seed/kino7/300/450",
  "video": "https://www.w3schools.com/html/mov_bbb.mp4"
}
```

---

## Admin panel

Manzil: `admin.html` (asosiy sahifadagi **Admin** tugmasi orqali ham kirish mumkin).

- **Parol:** `1234`
- Yangi kino qo'shish: formani to'ldirib, **Qo'shish** tugmasini bosing
- Tahrirlash: ro'yxatdagi **Tahrirlash** tugmasi → forma to'ldiriladi → **Saqlash**
- O'chirish: **O'chirish** tugmasi (tasdiqlash so'raladi)
- **Qayta yuklash:** ro'yxatni serverdan qayta oladi

---

## API endpointlari (JSON Server)

| Metod | Manzil | Vazifa |
|---|---|---|
| GET | `/movies` | Barcha kinolarni olish |
| POST | `/movies` | Yangi kino qo'shish |
| PUT | `/movies/:id` | Kinoni to'liq yangilash |
| DELETE | `/movies/:id` | Kinoni o'chirish |

---

## Ma'lum cheklovlar

- Admin parol frontendda, ochiq holda tekshiriladi — bu haqiqiy xavfsizlik emas.
- `API` manzili `http://localhost:3000/movies` ga qattiq yozilgan.
- `index.html` da AOS va `script.js` fayllari ikki marta ulangan; bu keraksiz so'rovlarga olib keladi.
- `index.html` da `likedBox` elementi bor, lekin u ishlatilmaydi.
- Sevimlilar faqat xotirada saqlanadi — sahifa yangilanganda yo'qoladi.
- Ayrim video va poster havolalari tashqi saytlarga bog'liq va vaqt o'tishi bilan ishlamay qolishi mumkin.

---

## Kelajakdagi rejalar

- [ ] Sevimlilarni `localStorage` da saqlash
- [ ] Ikki marta ulangan skriptlarni tozalash
- [ ] Admin autentifikatsiyasini serverga ko'chirish
- [ ] Janr bo'yicha filtr qo'shish
- [ ] Mobil moslashuvchanlikni yaxshilash

---

## Litsenziya

Bu loyiha o'quv maqsadida yaratilgan. Foydalanish shartlari muallif bilan kelishilgan holda belgilanadi.

---

**Muallif:** Asadullo Mirhamidullayev
