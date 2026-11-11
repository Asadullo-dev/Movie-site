# KinoUz — Online-Filmkatalog

**Sprachen:** [English](README.md) · [O'zbekcha](README.uz.md) · [Deutsch](README.de.md)

KinoUz ist eine Webanwendung, die einen Filmkatalog mit Suche, Favoriten und Videowiedergabe anzeigt. Das Projekt wurde als JavaScript-Kursprojekt erstellt.

**Autor:** Asadullo Mirhamidullayev

---

## Funktionen

- Lädt die Filmliste dynamisch vom Server (über JSON Server)
- Suche nach Titel in Echtzeit
- Bereich „Beliebte Filme“ (Bewertung 8.0 und höher)
- Bereich „Alle Filme“
- Schaltfläche „Alle anzeigen / Schließen“ für jeden Bereich (standardmäßig 4 Karten)
- Filme zu Favoriten hinzufügen (❤️ / 🤍)
- Video-Player-Fenster (Modal):
  - YouTube-Links (`youtu.be`, `youtube.com/watch`, `/embed/`, `/shorts/`)
  - Direkte Videodateien: `.mp4`, `.webm`, `.ogg`
  - HLS-Streams: `.m3u8` (über hls.js)
  - Andere Links öffnen sich in einem neuen Tab
- Admin-Bereich: Filme hinzufügen, bearbeiten und löschen
- Animationen (AOS-Bibliothek)

---

## Technologien

| Bereich | Technologie |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Datenbank | `db.json` (JSON Server) |
| API | JSON Server (REST) |
| Animation | AOS 2.3.1 |
| Video (HLS) | hls.js 1.5.8 |
| Entwicklungsserver | VS Code Live Server (Port 5501) |

---

## Projektstruktur

```
Exam-js/
├── .vscode/
│   └── settings.json   # Port für Live Server (5501)
├── index.html          # Hauptseite (Katalog)
├── script.js           # Logik der Hauptseite
├── style.css           # Styles der Hauptseite
├── admin.html          # Admin-Bereich
├── admin.js            # Logik des Admin-Bereichs
├── admin.css           # Styles des Admin-Bereichs
└── db.json             # Filmdatenbank
```

---

## Installation und Start

### 1. Voraussetzungen

- [Node.js](https://nodejs.org/) (inklusive npm)
- VS Code mit der Erweiterung **Live Server** (optional, zum Ausliefern statischer Dateien)

### 2. JSON Server installieren

```bash
npm install -g json-server
```

### 3. Datenserver starten

Im Projektordner:

```bash
json-server --watch db.json --port 3000
```

Der Server läuft unter `http://localhost:3000/movies`.

### 4. Frontend öffnen

Eine der folgenden Möglichkeiten nutzen:

- In VS Code auf `index.html` rechtsklicken → **Open with Live Server** (`http://127.0.0.1:5501`)
- Oder den Projektordner mit einem beliebigen statischen Dateiserver öffnen

> **Wichtig:** JSON Server (Port 3000) muss zuerst laufen, sonst werden keine Filme geladen.

---

## Datenmodell

Jeder Film in `db.json` besitzt folgende Felder:

| Feld | Typ | Beschreibung |
|---|---|---|
| `id` | string / number | Eindeutige Kennung |
| `title` | string | Filmtitel |
| `year` | number | Erscheinungsjahr |
| `genre` | string | Genre |
| `rating` | number | Bewertung (z. B. `8.5`) |
| `img` | string | URL des Posterbildes |
| `video` | string | Video-URL (YouTube, `.mp4`, `.m3u8` oder andere) |

**Beispiel:**

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

## Admin-Bereich

Adresse: `admin.html` (auch über die Schaltfläche **Admin** auf der Hauptseite erreichbar).

- **Passwort:** `1234`
- Film hinzufügen: Formular ausfüllen und auf **Hinzufügen** klicken
- Bearbeiten: in der Liste auf **Bearbeiten** klicken → Formular wird gefüllt → **Speichern**
- Löschen: Schaltfläche **Löschen** (Bestätigung erforderlich)
- **Neu laden:** lädt die Liste erneut vom Server

---

## API-Endpunkte (JSON Server)

| Methode | Pfad | Zweck |
|---|---|---|
| GET | `/movies` | Alle Filme abrufen |
| POST | `/movies` | Neuen Film hinzufügen |
| PUT | `/movies/:id` | Film vollständig aktualisieren |
| DELETE | `/movies/:id` | Film löschen |

---

## Bekannte Einschränkungen

- Das Admin-Passwort wird im Frontend im Klartext geprüft — das ist keine echte Sicherheit.
- Die `API`-URL ist fest als `http://localhost:3000/movies` hinterlegt.
- `index.html` bindet AOS und `script.js` doppelt ein, was unnötige Anfragen verursacht.
- `index.html` enthält ein Element `likedBox`, das nicht verwendet wird.
- Favoriten werden nur im Arbeitsspeicher gehalten — sie gehen beim Neuladen der Seite verloren.
- Einige Video- und Poster-Links hängen von externen Seiten ab und können mit der Zeit ausfallen.

---

## Geplante Erweiterungen

- [ ] Favoriten im `localStorage` speichern
- [ ] Doppelte Skript-Einbindungen entfernen
- [ ] Admin-Authentifizierung auf den Server verlagern
- [ ] Genre-Filter hinzufügen
- [ ] Mobile Darstellung verbessern

---

## Lizenz

Dieses Projekt wurde zu Lernzwecken erstellt. Nutzungsbedingungen werden mit dem Autor vereinbart.

---

**Autor:** Asadullo Mirhamidullayev
