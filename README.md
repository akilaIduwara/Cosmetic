# Simple React App

A simple React application built with Vite.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Go to your repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. Push to main branch - it will automatically deploy

### Option 2: Using gh-pages

```bash
npm run deploy
```

Then go to Settings → Pages and select "Deploy from a branch" → "gh-pages" → "/root"

## GitHub Pages Setup

1. Go to repository Settings
2. Click Pages in left sidebar
3. Under "Source", select:
   - **GitHub Actions** (if using workflow)
   - OR **Deploy from a branch** → **gh-pages** → **/root** (if using gh-pages)

