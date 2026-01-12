# Kevina Cosmetics

Modern e-commerce store built with React and Webpack (no Vite).

## Features

✅ All original features preserved:
- E-commerce store (Home, Shop, About, Contact, Checkout)
- Shopping cart functionality
- Admin panel with product/order management
- Theme toggle (light/dark mode)
- Responsive design
- All animations and UI features

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Visit: `http://localhost:3000`

## Build

```bash
npm run build
```

Output will be in `dist/` folder.

## Deploy to GitHub Pages

### Option 1: Manual Deploy

1. Build: `npm run build`
2. Push `dist/` folder contents to `gh-pages` branch
3. Go to Settings → Pages
4. Select "Deploy from a branch" → `gh-pages` → `/root`

### Option 2: Using gh-pages

Add to package.json:
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

Then run: `npm run deploy`

## Troubleshooting

### White Screen

1. Check browser console (F12) for errors
2. Verify all files are in `dist/` after build
3. Check that script tag in `dist/index.html` points to `/assets/`
4. Make sure `_redirects` file is in `dist/` for SPA routing

### Build Issues

- Make sure all dependencies are installed: `npm install`
- Check Node version (should be 18 or 20)

## Project Structure

- `src/` - All React components and pages (ALL FEATURES PRESERVED)
- `public/` - Static files
- `dist/` - Build output
- `webpack.config.js` - Webpack configuration

## All Features Working

✅ All components
✅ All pages
✅ All functionality
✅ No features removed
