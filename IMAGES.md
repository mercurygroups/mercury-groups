# Images (local assets)

This file documents the image files in the `images/` folder, where they are used in the app, suggested alt text, recommended dimensions, and suggested Unsplash search URLs or fit-URL patterns you can use to replace them.

- **Location:** `images/` (project root: `mercury-website/images`)

---

## Files

- **`private jet.png`**
  - Used for: Private jet / "jets" service card in the services section.
  - Suggested alt: "Private jet interior or exterior"
  - Recommended size: 1200×800 (crop to 3:2)
  - Suggested Unsplash search: https://unsplash.com/s/photos/private-jet
  - Fit URL pattern (example usage): `https://images.unsplash.com/photo-<ID>?auto=format&fit=crop&w=1200&q=80`

- **`logitics and delivery .png`**
  - Used for: Logistics & Delivery service hero image (delivery rider)
  - Suggested alt: "Delivery rider on motorcycle"
  - Recommended size: 800×600 (or 1200×800 for large hero)
  - Suggested Unsplash search: https://unsplash.com/s/photos/delivery-rider
  - Fit URL pattern: `https://images.unsplash.com/photo-<ID>?auto=format&fit=crop&w=800&q=80`

- **`Toyota HiAce Luxury,png`**
  - Used for: Toyota HiAce (bus) in fleet
  - Suggested alt: "Toyota HiAce Luxury minibus"
  - Recommended size: 1200×800
  - Suggested Unsplash search: https://unsplash.com/s/photos/hiace-bus
  - Fit URL pattern: `https://images.unsplash.com/photo-<ID>?auto=format&fit=crop&w=1200&q=80`

- **`Toyota Land Cruiser.png`**
  - Used for: Toyota Land Cruiser in fleet
  - Suggested alt: "Toyota Land Cruiser SUV"
  - Recommended size: 1200×800
  - Suggested Unsplash search: https://unsplash.com/s/photos/land-cruiser
  - Fit URL pattern: `https://images.unsplash.com/photo-<ID>?auto=format&fit=crop&w=1200&q=80`

---

## How to swap a local image for a remote Unsplash image

1. Find an image on Unsplash using the suggested searches above.
2. Copy the image URL (or use the Unsplash CDN URL returned by their image). If you use a direct Unsplash image URL, append the fit query params to control size and cropping (see patterns above).
3. Update the `src` in `App.tsx` to the new remote URL, or replace the file in `images/` with a correctly named file (spaces must be URL-encoded when used in `src`, e.g. `%20`).

Example `src` line in `App.tsx`:

```tsx
// remote URL with fit params
image: 'https://images.unsplash.com/photo-<ID>?auto=format&fit=crop&w=1200&q=80'

// or local file (spaces URL-encoded)
image: '/images/Toyota%20Land%20Cruiser.png'
```

## Notes

- File names with spaces or punctuation must be URL-encoded when used in `<img src="...">`. E.g., `Toyota HiAce Luxury,png` → `/images/Toyota%20HiAce%20Luxury%2Cpng`.
- If you prefer not to host remote images at runtime, replace the files in `images/` with high-quality local images (same filenames) and commit them.
- The project already contains placeholder SVGs in `public/images/` used when remote images fail; you can keep those as fallbacks.

If you want, I can:
- Replace each local file with chosen Unsplash image URLs (I can pick good matches), or
- Rename and normalize the `images/` filenames to remove spaces/commas for easier referencing.
