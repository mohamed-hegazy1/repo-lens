# Repo Lens

A public GitHub repository explorer. Enter a GitHub username to load public repositories, filter loaded results by name/description and language, and load further pages.

## What it really does

- Calls GitHub's public REST API, no token or login required.
- Separates idle, loading, ready and error states.
- Cancels outdated requests with AbortController and a generation guard.
- Shows meaningful 404, rate-limit and network errors with a retry action.
- Uses the Link response header for pagination, deduplicates repository IDs.
- Accepts only https github.com destinations from API data and renders descriptions as text, not HTML.
- Shows the fetched time. Numbers are a snapshot, not a continuous live feed.

Searches are sent to GitHub. GitHub rate limits apply, including shared-IP limits. Only public data is returned. Language and text filters apply to loaded pages, not the user's entire account until all pages are loaded. Dates display the date portion of GitHub's UTC timestamp. Not affiliated with GitHub.

## Verification

Automated browser tests use explicit mock responses for stable assertions. A separate manual browser run queried the actual public API for mohamed-hegazy1 and displayed its three public repositories on November 23, 2026. Test fixtures are not shipped in the production interface.

## Source map

- App.jsx: request lifecycle, cancellation, loading/error UI, filters and cards
- model.js: username validation, API URL builder, response normalization, safe links
- model.test.js: pure-function checks
- app.spec.js: mocked loading/filter/pagination/error/cancel tests and mobile layouts
- EXPLAIN-AR.md: Arabic explanation and practice

API documentation: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user

## Run and test

Use Node.js 22.12+ or a supported newer release.

```sh
npm ci
npm run dev
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

To use an installed Chrome for browser tests, set CHROME_PATH to its executable path. The app is a static React/Vite frontend. The relative Vite base supports hosting under a project subdirectory. No server, secrets or environment variables are needed.

## Learning and authorship

Prepared with AI assistance as a portfolio learning project. This is not client work, employment history or evidence of independent authorship. Review the Arabic walkthrough, run the code and implement the practice tasks before presenting it in an interview. Keep real commit dates. Source is marked UNLICENSED pending the owner's license choice.

## Repository layout

Readable source is at the repository root. Open `/app.html` on the Vite dev server for source development. `index.html` is the self-contained prebuilt GitHub Pages entry. `npm run build` builds `app.html` and its assets into `dist/`; to deploy that output, rename `dist/app.html` to `dist/index.html` and publish the complete `dist/` folder. The committed prebuilt entry is separate, so editing source alone does not update the deployed page.
