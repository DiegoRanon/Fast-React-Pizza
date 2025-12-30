# Fast React Pizza

## Local dev

```bash
npm install
npm run dev
```

## Deploy to Vercel (Vite + React Router SPA)

This project is a client-side SPA using `react-router` (`createBrowserRouter`). The included `vercel.json` ensures deep links like `/menu` or `/order/123` work on refresh by rewriting unknown routes to `index.html`.

### Vercel settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Deploy

- Push to GitHub/GitLab/Bitbucket and import the repo in Vercel, or run `vercel` locally (optional).
