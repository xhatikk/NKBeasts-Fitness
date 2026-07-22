# NKBEASTS Premium V7 Modular

Professional static fitness website prepared for Cloudflare Pages.

## Project structure

- `index.html` — page structure
- `style.css` — complete black/gold responsive design
- `translations.js` — Albanian, German and English
- `app.js` — navigation, animations, workout modal and cookies
- `calculators.js` — BMI, TDEE, protein and water calculators
- `rss.js` — live fitness news from Google News RSS
- `radio.js` — NK Radio live player
- `data/workouts.json` — workout data for future expansion
- `assets/` — images, icons and logo folders
- `ads.txt` — Google AdSense publisher entry
- `manifest.webmanifest` — installable web app metadata
- `favicon.svg` — browser icon

## Upload to GitHub

1. Extract the ZIP.
2. Delete the old website files inside the repository.
3. Upload all files and folders from this package to the repository root.
4. Commit the changes.
5. Cloudflare Pages will deploy automatically.

## Cloudflare Pages settings

- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`

## RSS live news

`rss.js` requests Google News RSS and uses a public CORS proxy. If the proxy is temporarily unavailable, the website automatically displays built-in fallback news cards so the section never appears empty.

## Social links

Replace the `#` links in `index.html` with your real YouTube, Instagram, Facebook and TikTok links.
