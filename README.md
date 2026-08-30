# 📝 Notes App

A clean, responsive notes application built with **React 19** and **Vite**. Create, edit, delete, search, and sort your notes — all saved automatically in your browser with no backend required.

---

## ✨ Features

- **Create & Edit Notes** — Write a title and content, then save or update with a single click
- **Delete Notes** — Remove any selected note instantly
- **Search** — Filter notes in real time by title or content
- **Sort** — Order notes by Newest, Oldest, or A–Z
- **Persistent Storage** — Notes are saved to `localStorage` and survive page refreshes
- **Responsive Design** — Collapsible sidebar for a smooth experience on tablets and phones

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI & state management |
| Vite 8 | Build tool & dev server |
| localStorage | Client-side data persistence |
| CSS (custom) | Styling & responsive layout |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/notes-app.git
   cd notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy.

---

## 📁 Project Structure

```
notes-app/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── pencil.png
├── src/
│   ├── assets/
│   │   └── hero.png
│   ├── Components/
│   │   ├── Notes.jsx       # Main notes component (all logic & UI)
│   │   └── Notes.css       # Component styles
│   ├── App.jsx             # Root component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎮 How to Use

| Action | How |
|--------|-----|
| Create a note | Click **+ New Note**, fill in the title and content, click **Save Note** |
| Edit a note | Click any note in the sidebar to load it, make changes, click **Update Note** |
| Delete a note | Select a note and click **🗑️ Delete Note** |
| Search notes | Type in the search box — results filter instantly |
| Sort notes | Use the dropdown to sort by Newest, Oldest, or A–Z |
| Mobile sidebar | Tap **☰** to open the sidebar, **✕** to close it |

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
