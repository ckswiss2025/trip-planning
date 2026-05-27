# 🌺 Hawaii Trip Planner

A collaborative family trip planner for a 3-week Hawaii vacation with 2 adults, a 4-year-old, and an 8-month-old.

## Features

- 🧳 **Packing List** — 12 categories, 100+ pre-populated items from travel blogs
- 🏷 **Bag Tracking** — Tag each item as Carry-on, Checked, or Gate Check
- 🛒 **Shopping Lists** — Buy Before You Go + Buy When You Arrive sections
- ✅ **Task Lists** — Pre-travel to-dos and home prep checklist
- 📝 **Notes** — Add notes to any item
- ✓ **Checkboxes** — Check off items as you pack
- 🔗 **Collaborative** — Syncs across devices in real time (via Claude.ai artifact storage, or localStorage in local dev)
- ♻️ **Reusable** — Reset and reuse for future trips

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- Persistent storage via `window.storage` (Claude.ai) or `localStorage` (local dev)

## Notes on Collaboration

When running inside Claude.ai, the app uses Anthropic's shared artifact storage API for real-time cross-device sync. When running locally or on GitHub Pages, it falls back to `localStorage` — edits persist per-browser but won't sync across devices without a backend.
