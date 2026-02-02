# Sahan Perera-Merry - Personal Website

A personal portfolio site built with Astro, Tailwind CSS, and React.

## Tech Stack

- **Astro** - Static site generator with component islands
- **Tailwind CSS** - Utility-first CSS framework
- **React** - For interactive components (word cloud)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Navigate to the project folder
cd personal-site

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with your static site.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Option 1: Vercel (Recommended)

1. Push the `personal-site` folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import your repo
4. Vercel auto-detects Astro — just click Deploy
5. Done. You get a URL like `yourname.vercel.app`

To add a custom domain:
- In Vercel dashboard → Settings → Domains → Add your domain
- Update your domain's DNS to point to Vercel

### Option 2: Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repo
5. Build settings are auto-detected — click Deploy

### Option 3: GitHub Pages

1. Add to `astro.config.mjs`:
   ```js
   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/your-repo-name',
     // ... rest of config
   });
   ```

2. Install GitHub Pages adapter:
   ```bash
   npm install @astrojs/github-pages
   ```

3. Push to GitHub and enable Pages in repo settings

## Project Structure

```
personal-site/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── SelectedWork.astro
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   ├── Navigation.astro
│   │   └── WordCloud.tsx       # React component
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   └── articles/
│   │       ├── briefing-system.astro
│   │       └── ceo-writing.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Customization

### Colors

Edit `tailwind.config.mjs` to change the color palette:

```js
colors: {
  dark: {
    bg: '#0a0a0a',      // Background
    surface: '#141414', // Card backgrounds
    border: '#262626',  // Borders
  },
  accent: {
    DEFAULT: '#a78bfa', // Purple accent
    dim: '#7c3aed',
  }
}
```

### Fonts

The site uses:
- **Playfair Display** for headings
- **Inter** for body text

Change in `global.css` and `tailwind.config.mjs`.

### Word Cloud

Edit `src/components/WordCloud.tsx` to change:
- Words and their weights (size)
- Links each word navigates to
- Hover effects

## TODO

- [ ] Add final content to "From 100 Articles to 3 That Matter" article
- [ ] Add headshot/photo (optional)
- [ ] Connect custom domain
- [ ] Set up analytics (optional)
