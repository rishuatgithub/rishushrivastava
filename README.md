# Rishu Shrivastava — Portfolio

Personal portfolio for Rishu Shrivastava, a London-based Senior Data & AI Architect specialising in enterprise data platforms, cloud architecture and product innovation.

**Website:** [www.rishushrivastava.com](https://www.rishushrivastava.com/)

The site helps recruiters and collaborators explore technical expertise, career experience, selected work and published articles, with direct links to email, LinkedIn, GitHub and meeting booking.

## Design and features

- Warm white and cream surfaces with navy typography and blue accents.
- Skills grouped into data architecture, AI engineering and platform delivery.
- Career timeline, project highlights, and expandable certifications and training.
- Responsive navigation, keyboard focus indicators and a skip-to-content link.
- Print styling for printing the portfolio or saving it as a PDF through the browser.
- Custom SVG monogram favicon.

## Technology

React 19, TypeScript, Vite 6, Tailwind CSS 4 and Lucide React icons. The current portfolio is a static frontend and does not require an API key or backend service.

## Run locally

Use Node.js 20 and npm, matching the deployment workflow.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The development server binds to all network interfaces as configured in `package.json`.

No `.env.local` file or Gemini API key is needed for the current page.

## Validate and preview

```sh
# Type-check TypeScript (the script is named lint)
npm run lint

# Build the production site into dist/
npm run build

# Serve the production build locally
npm run preview
```

Use the local URL printed by Vite for the production preview. The build command does not run TypeScript checking, so run both checks before publishing.

## Update the portfolio

| File | What to edit |
| --- | --- |
| `src/App.tsx` | Page structure, introduction, highlight metrics, contact email and booking link |
| `src/data.ts` | Profile links, experience, skills, certifications and articles |
| `src/index.css` | Colours, typography, responsive layout and print styles |
| `public/favicon.svg` | Navy-and-cream RS favicon |
| `index.html` | Page title, description, browser theme colour, favicon reference and Google Analytics configuration |
| `docs/content-review.md` | Content corrections and facts awaiting owner confirmation |
| `.github/workflows/deploy.yml` | GitHub Pages build and deployment workflow |

Some profile copy and metrics appear directly in `src/App.tsx`; keep them consistent with `src/data.ts` and the metadata in `index.html`. Verify credential names, earned dates, employment details and project metrics before publishing. An earned date does not establish that a certification is still current.

The active page is composed in `src/App.tsx`. Components retained in `src/components/` are from earlier layouts and are not currently rendered by that page.

## Deployment

The GitHub Actions workflow runs on pushes to `master`. It installs dependencies with `npm ci`, builds the site, and publishes `dist/` to the `gh-pages` branch. Configure GitHub Pages to serve from the root of that branch.

To publish manually using the configured Git remote and suitable repository permissions:

```sh
npm run deploy
```

The `predeploy` script builds the site before `gh-pages` publishes it.

Vite uses `base: '/'`, suitable for the custom domain or a root-level GitHub Pages site. For hosting under a repository subpath, update the base path and check root-relative asset references, including the favicon. The `homepage` field alone does not configure Vite asset paths.

The custom domain and DNS must be configured in GitHub Pages and with the domain provider. There is currently no `public/CNAME` file; add one containing the configured domain if you need the build output to preserve it across branch deployments.

## External services

The page loads Google Fonts, a GitHub-hosted profile image and Google Analytics. Contact and social links open email, LinkedIn, GitHub, Calendly and external article sites. The current page does not submit a contact form or embed a booking calendar.
