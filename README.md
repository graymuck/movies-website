# Movies Website

Movies Website is a React and Vite project for movie discovery. The repository includes the application scaffold and an Appwrite helper that records movie searches and returns the five most-searched entries.

## Repository status

The HTML entry page expects `src/main.jsx` and `public/favicon.svg`. Both files are missing from the current repository. Restore the original React source and referenced assets before running or building the website.

## Development

Use Node.js 22.12 or later. Clone the repository and install the locked dependencies.

```sh
git clone https://github.com/graymuck/movies-website.git
cd movies-website
npm ci
```

Once the React source is present, use these commands from the repository root.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run lint` | Check the JavaScript source with Oxlint |
| `npm run build` | Generate the production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Appwrite configuration

The [Appwrite helper](appwritte.js) uses the Appwrite Cloud endpoint. Set the following values in `.env.local` to connect it to your project.

| Variable | Value |
| --- | --- |
| `VITE_PROJECT_ID` | Appwrite project ID |
| `VITE_DATABASE_ID` | Database ID |
| `VITE_COLLECTION_ID` | Collection ID for search metrics |

The helper queries documents by `searchTerm`, increments `count`, and stores `movie_id` and `poster_url` for new entries. It builds poster URLs using TMDB's image CDN. Set collection permissions for the intended application users. Vite exposes `VITE_` variables to the browser, so keep server credentials out of these variables.

## Project files

| File | Purpose |
| --- | --- |
| [`index.html`](index.html) | HTML shell and React entry point reference |
| [`appwritte.js`](appwritte.js) | Search tracking and trending-movie queries |
| [`vite.config.js`](vite.config.js) | React and Tailwind CSS plugins |
| [`package.json`](package.json) | Development scripts and dependencies |
