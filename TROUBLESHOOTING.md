# Troubleshooting White Screen on Cloudflare Pages

## Quick Fixes

### 1. Verify Build Output
After building locally (`npm run build`), check that `dist` folder contains:
- ✅ `index.html`
- ✅ `assets/` folder with `.js` and `.css` files
- ✅ `_redirects` file in the root of `dist`

### 2. Check Browser Console
Open browser DevTools (F12) and check Console tab for errors:
- JavaScript errors will show here
- Network tab shows if assets are loading (check for 404 errors)

### 3. Verify Cloudflare Pages Settings
In Cloudflare Pages dashboard:
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 18.x or 20.x (set in Environment variables if needed)

### 4. Environment Variables
Make sure these are set in Cloudflare Pages:
```
VITE_API_URL=https://kevinacosmetics.lk
VITE_APP_NAME=Kevina Cosmetics
```

### 5. Clear Cache
- Clear Cloudflare cache: Pages → Settings → Clear cache
- Clear browser cache: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
- Try incognito/private browsing mode

### 6. Check _redirects File
The `public/_redirects` file should contain:
```
/*    /index.html   200
```

This file is automatically copied to `dist` during build.

### 7. Verify Custom Domain
- DNS should point to Cloudflare Pages
- SSL/TLS should be enabled (Full or Full strict)
- Wait for DNS propagation (can take up to 24 hours)

## Common Issues

### Issue: White screen with no errors
**Solution:** Check if `index.html` is being served correctly. Verify the build output directory is `dist`.

### Issue: 404 errors for assets
**Solution:** Check that `vite.config.js` has `base: '/'` set correctly.

### Issue: React Router routes not working
**Solution:** Verify `_redirects` file is in `dist` folder after build.

### Issue: JavaScript errors in console
**Solution:** Check the error message. Common causes:
- Missing environment variables
- Import path errors
- Missing dependencies

## Testing Locally

1. Build the project:
   ```bash
   npm install
   npm run build
   ```

2. Preview the build:
   ```bash
   npm run preview
   ```

3. Check if it works at `http://localhost:4173`

If it works locally but not on Cloudflare, check:
- Environment variables
- Build settings
- Node version compatibility

## Still Not Working?

1. Check Cloudflare Pages build logs for errors
2. Verify all dependencies are in `package.json` (not just `package-lock.json`)
3. Try deploying a fresh build
4. Check if there are any CORS issues
5. Verify the domain DNS settings

