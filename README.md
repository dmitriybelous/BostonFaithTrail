# Boston Faith Trail

An interactive Progressive Web App (PWA) for exploring Boston's historic faith communities on a self-guided walking trail. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and React Leaflet.

🌐 **Live site:** [https://\<your-org\>.github.io/BostonFaithTrail/](https://your-org.github.io/BostonFaithTrail/)

## Features

- 🗺️ **Interactive map** powered by OpenStreetMap and React Leaflet
- 📍 **10 curated stops** at historic Boston faith sites
- 📱 **PWA support** — installable and works offline
- ⚡ **Static export** — hosted for free on GitHub Pages
- ♿ Accessible, responsive design

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| React Leaflet + Leaflet | Interactive maps |
| OpenStreetMap | Map tiles (free, no API key) |

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (available at http://localhost:3000)
npm run dev
```

> Note: In development, `basePath` is empty so routes work as `/map`, `/stops`, etc.

## Build

```bash
npm run build
```

This produces a fully static site in the `./out` directory. Open `out/index.html` to preview locally.

## Deployment

The site deploys automatically to GitHub Pages via GitHub Actions on every push to `main`.

**Manual deployment:**
1. Go to the **Actions** tab in GitHub
2. Select **Deploy to GitHub Pages**
3. Click **Run workflow**

**First-time setup:**
1. Go to **Settings → Pages** in your GitHub repository
2. Set **Source** to **GitHub Actions**

## Adding a New Stop

1. **Add stop data** to `data/stops.json`:
   ```json
   {
     "id": "11",
     "slug": "my-new-stop",
     "title": "My New Stop",
     "lat": 42.3601,
     "lng": -71.0589,
     "shortSummary": "A brief description.",
     "address": "123 Main St, Boston, MA",
     "heroImage": "/BostonFaithTrail/images/my-new-stop.jpg",
     "imageAttribution": "Photo: Your attribution here",
     "sources": ["https://example.com"]
   }
   ```

2. **Create content** at `content/stops/my-new-stop.md` with at least 100 words of history and description.

3. **Add a hero image** to `public/images/my-new-stop.jpg` (optional — the site works without it).

4. Commit and push — the site rebuilds automatically.

## Project Structure

```
.
├── data/
│   └── stops.json          # Stop metadata (coordinates, addresses, etc.)
├── content/
│   └── stops/              # Markdown content for each stop
│       └── *.md
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service worker
│   └── images/             # Hero images for stops
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Landing page
│   │   ├── map/page.tsx    # Interactive map
│   │   ├── stops/          # Stop list and detail pages
│   │   └── attributions/   # Attribution page
│   ├── components/         # Reusable React components
│   ├── lib/
│   │   └── stops.ts        # Data access helpers
│   └── types/
│       └── stop.ts         # TypeScript types
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions deployment
```

## Map Attribution

Map tiles © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
Interactive maps powered by [Leaflet](https://leafletjs.com/) and [React Leaflet](https://react-leaflet.js.org/).

## License

See [LICENSE](./LICENSE) for details.
