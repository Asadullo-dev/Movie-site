# KinoUz — Online Movie Catalog

**Languages:** [English](README.md) · [O'zbekcha](README.uz.md) · [Deutsch](README.de.md)

KinoUz is a web application that displays a movie catalog with search, favorites, and video playback. The project was created as a JavaScript course project.

**Author:** Asadullo Mirhamidullayev

---

## Features

- Dynamically loads the movie list from the server (via JSON Server)
- Real-time search by title
- "Popular movies" section (rating 8.0 and above)
- "All movies" section
- "Show all / Close" button for each section (4 cards shown by default)
- Add movies to favorites (❤️ / 🤍)
- Video player modal:
  - YouTube links (`youtu.be`, `youtube.com/watch`, `/embed/`, `/shorts/`)
  - Direct video files: `.mp4`, `.webm`, `.ogg`
  - HLS streams: `.m3u8` (via hls.js)
  - Other links open in a new tab
- Admin panel: add, edit, and delete movies
- Animations (AOS library)

---

## Technologies

| Part | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Database | `db.json` (JSON Server) |
| API | JSON Server (REST) |
| Animation | AOS 2.3.1 |
| Video (HLS) | hls.js 1.5.8 |
| Dev server | VS Code Live Server (port 5501) |

---

## Project Structure

```
Exam-js/
├── .vscode/
│   └── settings.json   # Live Server port (5501)
├── index.html          # Main page (catalog)
├── script.js           # Main page logic
├── style.css           # Main page styles
├── admin.html          # Admin panel
├── admin.js            # Admin panel logic
├── admin.css           # Admin panel styles
└── db.json             # Movie database
```

---

## Installation and Setup

### 1. Requirements

- [Node.js](https://nodejs.org/) (includes npm)
- VS Code with the **Live Server** extension (optional, for serving static files)

### 2. Install JSON Server

```bash
npm install -g json-server
```

### 3. Start the data server

In the project folder:

```bash
json-server --watch db.json --port 3000
```

The server runs at `http://localhost:3000/movies`.

### 4. Open the frontend

Do one of the following:

- In VS Code, right-click `index.html` → **Open with Live Server** (`http://127.0.0.1:5501`)
- Or open the project folder with any static file server

> **Important:** JSON Server (port 3000) must be running first, otherwise no movies will load.

---

## Data Model

Each movie in `db.json` has the following fields:

| Field | Type | Description |
|---|---|---|
| `id` | string / number | Unique identifier |
| `title` | string | Movie title |
| `year` | number | Release year |
| `genre` | string | Genre |
| `rating` | number | Rating (e.g. `8.5`) |
| `img` | string | Poster image URL |
| `video` | string | Video URL (YouTube, `.mp4`, `.m3u8`, or other) |

**Example:**

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

## Admin Panel

Location: `admin.html` (also accessible via the **Admin** button on the main page).

- **Password:** `1234`
- Add a movie: fill in the form and click **Add**
- Edit: click **Edit** in the list → the form is filled → click **Save**
- Delete: click **Delete** (a confirmation is required)
- **Reload:** fetches the list from the server again

---

## API Endpoints (JSON Server)

| Method | Path | Purpose |
|---|---|---|
| GET | `/movies` | Get all movies |
| POST | `/movies` | Add a new movie |
| PUT | `/movies/:id` | Fully update a movie |
| DELETE | `/movies/:id` | Delete a movie |

---

## Known Limitations

These come from the educational state of the project:

- The admin password is checked on the frontend in plain text — this is not real security.
- The `API` URL is hardcoded as `http://localhost:3000/movies`.
- `index.html` includes the AOS and `script.js` files twice, which causes unnecessary requests.
- `index.html` contains a `likedBox` element that is not used.
- Favorites are stored in memory only — they are lost when the page is reloaded.
- Some video and poster links depend on external sites and may stop working over time.

---

## Roadmap

- [ ] Store favorites in `localStorage`
- [ ] Remove the duplicate script includes
- [ ] Move admin authentication to the server
- [ ] Add genre filter
- [ ] Improve mobile responsiveness

---

## License

This project was created for educational purposes. Terms of use are to be agreed with the author.

---

**Author:** Asadullo Mirhamidullayev
