# Mercury Groups — Website

This repository contains the Mercury Groups front-end (Vite + React + TypeScript) used for the Mercury Groups Global Mobility site. The site includes services, fleet, logistics, and a small AI chat widget.

## Images and Remote Fit URLs

Images are stored in the `images/` folder for local assets and `public/images/` for placeholder SVGs. The app supports an optional mapping of local files to remote Unsplash "fit" URLs so the site can display high-quality Unsplash images with consistent cropping.

How it works in the app:

- There's a toggle `USE_REMOTE_IMAGES` in `App.tsx` (default: `false`).
- The `IMAGE_FIT_URLS` map in `App.tsx` maps local filenames to Unsplash fit URLs (for example: `https://images.unsplash.com/photo-<ID>?auto=format&fit=crop&w=800&q=80`).
- When `USE_REMOTE_IMAGES` is `true`, `getImageSrc()` returns the mapped Unsplash fit URL for a given local filename; otherwise the app uses the local asset.

This lets you easily switch between local assets (faster, offline-friendly) and remote Unsplash images (high-quality, replaceable) without changing markup throughout the app.

## Key Local Images

- `images/private jet.png` — used for Private Jet service
- `images/logitics and delivery .png` — used for Logistics hero
- `images/Toyota HiAce Luxury,png` — used for HiAce bus in fleet
- `images/Toyota Land Cruiser.png` — used for Land Cruiser in fleet

If you'd like me to replace local images with specific Unsplash IDs, I can enable them in `IMAGE_FIT_URLS` and switch the toggle for you.

## How to enable remote Unsplash fit URLs

1. Open `App.tsx` and set `USE_REMOTE_IMAGES` to `true`.
2. Update `IMAGE_FIT_URLS` with the chosen Unsplash image IDs (or direct CDN URLs) using the fit params:

```
https://images.unsplash.com/photo-<ID>?auto=format&fit=crop&w=800&q=80
```

3. Start the dev server:

```bash
npm run dev
```

4. Verify images load. If an Unsplash image 404s or you prefer a local asset, revert the mapping or set the toggle to `false`.

## Notes

- Filenames with spaces and punctuation are URL-encoded automatically by the code, but it's recommended to normalize filenames (no spaces, lowercase) if you plan to add many local images.
- Placeholder SVGs (in `public/images/`) are used as image `onError` fallbacks.

---

If you'd like, I can:

- Normalize `images/` filenames and update imports, or
- Choose Unsplash images and set them in `IMAGE_FIT_URLS`, then enable the toggle.

Tell me which option you prefer.
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ifH7oSGfcTgXHaUwYk28wpIVvFnPvmTk

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
