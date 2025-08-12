# KIDNECT — Frontend (React + Vite)

Inclusive matching app UI for families; Supabase Auth + AI-assisted matching

![React](https://img.shields.io/badge/React-18-61DAFB)
![Vite](https://img.shields.io/badge/Vite-5-646CFF)
![Deploy](https://img.shields.io/badge/Vercel-live-success)

---

## Live / API / Backend

- **Live:** https://inclusive-matching-frontend2.vercel.app  
- **API:** https://inclusive-matching-backend.onrender.com  
- **Backend repo:** https://github.com/Viktoria2609/inclusive-matching-backend

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment](#environment)
- [Available Scripts](#available-scripts)
- [Routing & Auth](#routing--auth)
- [API Integration](#api-integration)
- [Styling & UI](#styling--ui)
- [Deployment (Vercel)](#deployment-vercel)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

KIDNECT is a lightweight React + Vite frontend that helps families create profiles, filter by
criteria, and discover inclusive matches. Authentication is powered by Supabase; matching UI
includes AI-assisted suggestions and quick “suggested message” interactions.

---

## Features

- Supabase Email/Password auth (sign up, login, reset)
- Profile creation & detail view
- Filters & Top-K AI matching (incl. same-city)
- Guarded routes via `ProtectedRoute`
- Suggested message helper
- Responsive UI with Tailwind

---

## Tech Stack

React 18 • Vite • React Router • Tailwind CSS • Supabase JS • Axios • ESLint

---

## Project Structure

```text
inclusive-matching-frontend
├── public/
│   └── vite.svg
├── src/
│   ├── app/
│   │   └── router/
│   │       ├── data.jsx
│   │       ├── index.jsx
│   │       └── ProtectedRoute.jsx
│   ├── components/
│   │   ├── match/
│   │   │   ├── AiCard.jsx
│   │   │   ├── AiControls.jsx
│   │   │   ├── AiModal.jsx
│   │   │   ├── AiRecommendations.jsx
│   │   │   └── FiltersModal.jsx
│   │   ├── profiles/
│   │   │   ├── form.jsx
│   │   │   ├── item.jsx
│   │   │   └── list.jsx
│   │   └── ui/
│   │       └── header.jsx
│   ├── toast/
│   │   ├── context.js
│   │   └── index.jsx
│   ├── hooks/
│   │   └── AuthContext.jsx
│   ├── lib/
│   │   ├── api.js
│   │   └── supabaseClient.js
│   ├── pages/
│   │   ├── create-profile.jsx
│   │   ├── login.jsx
│   │   ├── main.jsx
│   │   ├── match.jsx
│   │   ├── profile-detail.jsx
│   │   ├── reset-password.jsx
│   │   ├── signUp.jsx
│   │   └── welcome.jsx
│   ├── shared/
│   │   ├── assets/
│   │   │   ├── background.png
│   │   │   ├── welcome-illustration.png
│   │   │   └── welcome-illustration5.png
│   │   └── routes.js
│   ├── styles/
│   │   ├── fonts.css
│   │   └── global.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js:** 20.x (LTS)  
- **Package manager:** npm (or switch to pnpm/yarn accordingly)

### Setup

```bash
git clone https://github.com/Viktoria2609/inclusive-matching-frontend2
cd inclusive-matching-frontend2
npm install
npm run dev
```

The dev server will print a local URL (typically `http://localhost:5173`).

---

## Environment

Create a `.env` file in the project root:

```bash
# .env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
VITE_API_URL=https://inclusive-matching-backend.onrender.com
```

> Vite only exposes variables prefixed with `VITE_`. Rebuild after changing env.

---

## Available Scripts

```bash
npm run dev       # Start local development
npm run build     # Production build to dist/
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

---

## Routing & Auth

- Public routes:
  - `/` → Welcome
  - `/login` → Login
  - `/sign-up` → Sign Up
  - `/reset-password` → Reset Password

- Protected routes (via `src/app/router/ProtectedRoute.jsx`):
  - `/main` → Main
  - `/match` → Matching UI
  - `/profiles/new` → Create Profile
  - `/profiles/:id` → Profile Detail

**Auth flow (Supabase):**
Email/password sign-up and sign-in handled in pages under `src/pages`. Session state and
logout are provided via `src/hooks/AuthContext.jsx`.

---

## API Integration

- **Base URL:** `VITE_API_URL` (default: `https://inclusive-matching-backend.onrender.com`)
- **Client:** `src/lib/api.js` (wraps Axios/fetch)
- **Typical endpoints (examples — replace with your actual paths):**

| Purpose            | Method | Path                |
|--------------------|--------|---------------------|
| List profiles      | GET    | `/api/profiles`     |
| Create profile     | POST   | `/api/profiles`     |
| Get profile        | GET    | `/api/profiles/:id` |
| AI match Top-K     | POST   | `/api/match/topk`   |
| Suggested message  | POST   | `/api/match/suggest`|

> Ensure CORS on the backend allows the frontend origin (live and local dev).

---

## Styling & UI

- **Tailwind CSS** for utility-first styling
- **Global styles** in `src/styles/global.css`
- **Fonts** configured in `src/styles/fonts.css`
- Shared images live in `src/shared/assets/`

---

## Deployment (Vercel)

- **Build command:** `npm run build`  
- **Output directory:** `dist`  
- **Framework preset:** Vite  
- Add the three **Environment Variables** in Vercel Project Settings.

**SPA rewrite (already supported via `vercel.json`):**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## Troubleshooting

- **404 on refresh / deep links:** ensure the SPA rewrite above is active.
- **Blank page after deploy:** missing `VITE_*` env vars in Vercel; redeploy after setting them.
- **CORS errors:** add the frontend origin(s) to backend CORS allowlist.
- **Supabase auth not persisting:** check domain/cookie settings and `supabaseClient.js` config.
- **Wrong API base:** confirm `VITE_API_URL` matches your backend deployment.

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/short-name`
3. Commit: `git commit -m "feat: add <thing>"`
4. Push and open a Pull Request

---

## License

MIT (or update to your preferred license)
