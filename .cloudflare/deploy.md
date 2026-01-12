# Cloudflare Pages Deployment Checklist

## Pre-Deployment

1. ✅ Build locally to test: `npm run build`
2. ✅ Check `dist` folder contains:
   - `index.html`
   - `assets/` folder with JS/CSS files
   - `_redirects` file in root of dist

## Build Settings in Cloudflare Pages

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (leave empty)

## Environment Variables

Set these in Cloudflare Pages → Settings → Environment variables:

```
VITE_API_URL=https://kevinacosmetics.lk
VITE_APP_NAME=Kevina Cosmetics
```

## Common White Screen Issues

1. **Check browser console** for JavaScript errors
2. **Verify _redirects file** is in dist folder after build
3. **Check asset paths** - should be relative, not absolute
4. **Clear Cloudflare cache** after deployment
5. **Check SSL/TLS settings** - should be "Full" or "Full (strict)"

