# FenrinDash

A security scanning dashboard for managing penetration tests and viewing vulnerability findings. Built with React and Tailwind.

## Setup

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. From the login page, fill in any details and submit to reach the dashboard.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** for dev server and build
- **Tailwind CSS 4** for styling
- **React Router** for routing
- **lucide-react** for icons

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Known Limitations

- All data is mock — no real backend or API. Scans, findings, and logs come from `src/data/mockData.ts`.
- Social login buttons (Apple, Google, Meta) are UI only and don’t perform authentication.
- Login/signup doesn’t validate credentials; any valid form submission navigates to the dashboard.
- Scan progress and live console logs are simulated with timers, not real scan output.
- Filter and pagination on the dashboard are client-side only; the table uses the same mock dataset.
