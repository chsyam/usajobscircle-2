# usajobscircle

A multi-page job portal recreating https://usajobscircle.com/ — built with Next.js 16 (App Router, JavaScript), React 19 and lucide-react.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

Open http://localhost:3000.

**Demo accounts** (mock auth only): `candidate@demo.test` / `employer@demo.test`, password `Demo@1234`.
New registrations are activated with code `123456` on `/account-activation`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Structure

```
app/                 routes (App Router)
  (public)/          listing, detail, packages and content pages
  (auth)/            sign-in, sign-up, forgot-password, account-activation
  (dashboard)/dashboard/{candidate,employer}/   role-based dashboards
components/          layout, common, home, jobs, employers, candidates, pricing, blog, dashboard, auth, sections
data/                mock data (jobs, employers, candidates, packages, faqs, testimonials, blog posts, demo users)
services/            data access layer (mock now, REST/MySQL later via NEXT_PUBLIC_API_URL)
hooks/               useAuth, useForm, useUrlFilters, useJobs, useUserData, useDebounce, useNow
lib/                 constants, utils, validations, formatters, metadata, localStore
styles/              global CSS partials (base, components, pages) imported by app/globals.css
```

Dashboards live under `/dashboard/candidate` and `/dashboard/employer` so they don't collide with the public `/candidate/[slug]` and `/employer/[slug]` profile routes.

## Connecting a backend

Set `NEXT_PUBLIC_API_URL` and each service function will call the API instead of the mock data (see `services/apiClient.js`). Expected endpoints mirror the service names, e.g. `GET /jobs`, `GET /jobs/:slug`, `POST /auth/sign-in`.

See `PROJECT_PROGRESS.md` for the page/component checklist.
