# DDO Happy

A playful full-stack web experience built as a surprise interactive story for a sister. The app combines a React front end with an Express API and optional MongoDB persistence, so visitor sessions, choices, and interactions can be tracked during the experience.

## Overview

This project presents a multi-step, animated greeting flow where the user enters a name, makes choices, and moves through a custom story experience. The frontend handles the interactive UI, while the backend records session information and interaction data in either MongoDB or an in-memory fallback when the database is unavailable.

## Tech Stack

- React 19 + Vite
- Express.js
- MongoDB + Mongoose
- Tailwind CSS
- Vercel-ready serverless API entry point

## Features

- Animated, multi-page story experience
- Name-based personalization in the UI
- Visitor session registration and interaction logging
- MongoDB storage with graceful memory fallback
- Health-check endpoint for backend diagnostics
- Local development and production build support

## Project Structure

- `src/` — React app and UI logic
- `backend/` — Express server and visitor API routes
- `backend/models/Visitor.js` — Mongo schema for tracking visitors
- `backend/routes/visitor.js` — Session and interaction endpoints
- `api/index.js` — Vercel-compatible serverless Express app
- `public/` — static assets
- `.env.example` — environment template

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   copy .env.example .env
   ```

   Or rename `.env.example` to `.env` manually.

3. Add your database settings:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   PORT=5000
   ```

   If `MONGODB_URI` is not set, the app still runs in memory-safe fallback mode.

## Running the App

### Frontend

```bash
npm run dev
```

### Backend

```bash
npm run server
```

The backend runs on port `5000` by default.

## Available Scripts

```bash
npm run dev      # start the Vite frontend
npm run server   # start the Express backend
npm run start    # same as server
npm run build    # build the production frontend bundle
npm run lint     # run Oxlint checks
npm run preview  # preview the production build locally
```

## API Endpoints

- `GET /api/health` — health check
- `POST /api/visitor/session` — create or initialize a visitor session
- `POST /api/visitor/interaction` — log page actions and selected options

## Deployment

This project is designed to work in a Vercel environment as well as local development. The Vercel-compatible entry point is in `api/index.js`, while the local Express server is in `backend/server.js`.

## Notes

- The frontend uses the current browser origin to determine where the app is running and registers the Vercel URL when needed.
- Visitor interaction data is saved to MongoDB when available; otherwise the app falls back to an in-memory store for the session.

## License

This project is for personal use and is not published as a general-purpose package.
