# Youth Trivia

A teaching project that demonstrates the difference between **plain static HTML** and **server-side rendering with SvelteKit**, using a small bilingual/trilingual database of youth slang (English, German, and Swiss German) as the example dataset.

The same content is rendered in two ways so learners can compare the approaches side-by-side:

- A pure HTML/CSS page served as a static asset
- A fully reactive Svelte 5 + SvelteKit page with SSR, hydration, live search, and dynamic GIFs from Giphy

Built with **Svelte 5 (runes-only)**, **SvelteKit 2**, **TypeScript**, **Vite**, **Vitest**, and **Playwright**.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Routes](#routes)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Deployment](#deployment)
- [Cursor integration](#cursor-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Side-by-side comparison of **static HTML** and **server-rendered Svelte** for the same content
- Trilingual slang database (English, German, Swiss German) defined in [`src/lib/trivia.ts`](src/lib/trivia.ts)
- Live, debounced **search box** with autocomplete on the Svelte version
- **Dynamic GIFs** fetched from the Giphy API via a SvelteKit server route
- Dedicated pages explaining the **architecture** and the **conceptual difference** between the two rendering approaches
- A **Debug Training** page intentionally seeded with UI and server-side bugs for practising debugging in Cursor
- Full unit, component, and end-to-end test suites
- GitHub Actions pipeline for lint/type-check, unit tests, e2e tests, and build artefacts

## Tech stack

| Area | Tooling |
|---|---|
| UI framework | Svelte 5 (runes only — no `$:`, no `export let`, no `<slot />`) |
| Meta framework | SvelteKit 2 |
| Language | TypeScript |
| Bundler | Vite 5 |
| Unit / component tests | Vitest + Testing Library + jsdom |
| E2E tests | Playwright |
| CI/CD | GitHub Actions |

## Project structure

```
.
├── .github/workflows/ci.yml      GitHub Actions pipeline
├── e2e/                          Playwright end-to-end tests
├── src/
│   ├── app.html                  HTML shell
│   ├── lib/
│   │   ├── components/           Reusable Svelte 5 components
│   │   └── trivia.ts             Slang database + types
│   ├── routes/
│   │   ├── +page.svelte          Landing page
│   │   ├── api/giphy/+server.ts  Giphy proxy endpoint
│   │   ├── architecture/         Architecture diagram page
│   │   ├── compare/              Side-by-side comparison
│   │   ├── debug-training/       Practice page with deliberate bugs
│   │   ├── difference/           Visual SSR vs static explainer
│   │   └── svelte/               Interactive SvelteKit version
│   └── tests/                    Vitest unit & component tests
├── static/
│   └── html/                     Pure static HTML/CSS version
├── DEPLOYMENT-GUIDE.md           Step-by-step deployment recipes
├── playwright.config.ts
├── svelte.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## Getting started

### Prerequisites

- **Node.js 20+** (the CI pipeline pins Node 20)
- **npm** (ships with Node)

### Installation

```bash
git clone https://github.com/<your-username>/youth-trivia.git
cd youth-trivia
npm install
```

### Run the dev server

```bash
npm run dev
```

The app will be available at <http://localhost:5173>.

### Production build

```bash
npm run build
npm run preview
```

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Run `svelte-kit sync` and `svelte-check` (TypeScript) |
| `npm run check:watch` | Same as `check`, in watch mode |
| `npm run test` / `npm run test:unit` | Run Vitest once |
| `npm run test:unit:watch` | Vitest in watch mode |
| `npm run test:coverage` | Vitest with V8 coverage report |
| `npm run test:e2e` | Run Playwright tests headlessly |
| `npm run test:e2e:ui` | Open the Playwright UI runner |
| `npm run test:e2e:headed` | Run Playwright in headed mode |
| `npm run test:all` | Unit tests followed by e2e tests |

## Routes

| Path | Description |
|---|---|
| `/` | Landing page with the two-version comparison |
| `/svelte` | Interactive SvelteKit version with search and dynamic GIFs |
| `/html/index.html` | Pure static HTML version (served from `static/`) |
| `/architecture` | Visual architecture overview |
| `/difference` | Beginner-friendly explainer of static vs SSR |
| `/compare` | Side-by-side comparison view |
| `/debug-training` | Practice page seeded with deliberate bugs |
| `/api/giphy?q=…` | Giphy proxy endpoint used by the Svelte version |

> **Note:** The Giphy API key in `src/routes/api/giphy/+server.ts` is the public Giphy beta key included for demo convenience. For any real deployment, replace it with your own key and load it from an environment variable.

## Testing

Unit and component tests live in `src/tests/` and run with **Vitest** + **@testing-library/svelte**:

```bash
npm run test:unit
npm run test:coverage
```

End-to-end tests live in `e2e/` and run with **Playwright** against a Vite preview build:

```bash
npx playwright install   # one-time, install browsers
npm run test:e2e
```

## CI/CD

The repository ships with a GitHub Actions workflow at [`.github/workflows/ci.yml`](.github/workflows/ci.yml) that runs on every push and pull request to `main`/`master`:

1. **Lint & type-check** — `npm run check`
2. **Unit & component tests** — `npm run test:coverage` (uploads coverage as an artefact)
3. **E2E tests** — Playwright across Chromium, Firefox, and WebKit
4. **Build** — `npm run build` (uploads `.svelte-kit/` and `build/` as artefacts)

A commented-out `deploy` job is included as a starting point for wiring up Vercel, Netlify, Cloudflare Pages, or any other host.

## Deployment

See [`DEPLOYMENT-GUIDE.md`](DEPLOYMENT-GUIDE.md) for two complete walkthroughs:

- **Modern CI/CD**: GitHub Actions + Vercel (recommended for SSR)
- **Traditional FTP**: static export deployed to classic web hosting

The project currently uses `@sveltejs/adapter-auto`, which picks an appropriate adapter for popular hosts automatically. Swap it for `@sveltejs/adapter-vercel`, `@sveltejs/adapter-static`, etc. as needed.

## Cursor integration

This project is set up to be developed with [Cursor](https://www.cursor.com/) and includes:

- A workspace rule (`.cursor/rules/svelte5-only.mdc`) that enforces **Svelte 5 runes-only** idioms — no `$:`, `export let`, `<slot />`, `on:event`, or `createEventDispatcher`
- A hook (`.cursor/hooks.json` + `.cursor/hooks/start-dev-server.sh`) that keeps a dev server running automatically after file edits

These files are committed so collaborators using Cursor get the same experience. Hook runtime artefacts (`.dev-server.pid`, `dev-server.log`) are gitignored.

## Contributing

1. Fork and clone the repo.
2. Create a feature branch: `git checkout -b feat/my-change`.
3. Run `npm run check` and `npm run test:all` before pushing.
4. Open a pull request against `main`.

When writing Svelte components, follow the **Svelte 5 runes-only** conventions described in `.cursor/rules/svelte5-only.mdc`.

## License

This project is provided as a teaching demo. Add a license file (e.g. MIT) before publishing if you want to make the licensing terms explicit.
