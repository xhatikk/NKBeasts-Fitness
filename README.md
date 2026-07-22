# NKBEASTS Premium V10 — Organized Project

This version is organized into clear folders and is ready for Cloudflare Pages.

## Structure

```text
NKBEASTS/
├── index.html
├── style.css
├── ads.txt
├── favicon.svg
├── manifest.webmanifest
├── README.md
│
├── js/
│   ├── app.js
│   ├── translations.js
│   ├── calculators.js
│   ├── radio.js
│   ├── workouts.js
│   ├── rss.js
│   └── utils.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── logo/
│       └── favicon.svg
│
├── data/
│   ├── workouts.json
│   ├── nutrition.json
│   └── settings.json
│
└── functions/
    └── api/
        └── rss.js
```

## Important RSS files

There are two different RSS files:

- `js/rss.js` — displays the live news in the browser.
- `functions/api/rss.js` — Cloudflare Pages backend that safely fetches Google News RSS.

Both files are required.

## Upload to GitHub

1. Delete the old files inside the repository.
2. Upload all files and folders from this ZIP.
3. Make sure `functions/api/rss.js` is uploaded with the same folder structure.
4. Commit changes.
5. Cloudflare Pages will deploy automatically.

## Cloudflare Pages settings

- Framework preset: `None`
- Build command: empty
- Build output directory: `/`
