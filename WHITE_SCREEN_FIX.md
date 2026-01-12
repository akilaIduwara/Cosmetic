# White Screen Fix Guide

## Immediate Steps to Diagnose

1. **Open Browser DevTools (F12)**
   - Go to **Console** tab - check for JavaScript errors
   - Go to **Network** tab - check if files are loading (look for 404 errors)
   - Refresh the page and watch what loads

2. **Check What's Loading:**
   - `index.html` should load (200 status)
   - JavaScript files from `/assets/` folder should load
   - CSS files should load
   - If you see 404 errors, that's the problem

## Common Causes & Fixes

### Issue 1: JavaScript Files Not Loading (404 errors)
**Symptoms:** Network tab shows 404 for `.js` files

**Solution:**
- Verify Cloudflare Pages build settings:
  - Build command: `npm run build`
  - Output directory: `dist`
  - Node version: 18.x or 20.x

### Issue 2: Wrong Base Path
**Symptoms:** Files trying to load from wrong path

**Solution:**
- Check `vite.config.js` has `base: '/'`
- Rebuild and redeploy

### Issue 3: _redirects File Not Working
**Symptoms:** Routes return 404

**Solution:**
- Verify `public/_redirects` contains: `/*    /index.html   200`
- This file should be in `dist` folder after build
- Cloudflare Pages should automatically use it

### Issue 4: Build Output Issues
**Symptoms:** dist folder missing files

**Solution:**
1. Build locally: `npm run build`
2. Check `dist` folder contains:
   - `index.html`
   - `assets/` folder with `.js` and `.css` files
   - `_redirects` file
3. If files are missing, check build logs in Cloudflare

## Quick Test

1. Build locally:
   ```bash
   npm run build
   npm run preview
   ```
2. If it works locally but not on Cloudflare:
   - Check Cloudflare build logs
   - Verify environment variables
   - Check Node version compatibility

## Debugging Steps

1. **Check Console Logs:**
   - You should see: "Initializing React app..."
   - Then: "Creating React root..."
   - Then: "Rendering app..."
   - Then: "App rendered successfully!"

2. **If No Console Logs:**
   - JavaScript isn't loading at all
   - Check Network tab for script file errors

3. **If Console Shows Errors:**
   - Read the error message
   - Common errors:
     - Import errors (missing dependencies)
     - localStorage errors (privacy mode)
     - CORS errors (if calling APIs)

## Cloudflare Pages Specific

1. **Clear Cloudflare Cache:**
   - Go to Cloudflare Pages dashboard
   - Settings → Clear cache
   - Redeploy

2. **Check Build Logs:**
   - Go to your project → Deployments
   - Click on latest deployment
   - Check for build errors

3. **Verify Environment Variables:**
   - Settings → Environment variables
   - Should have: `VITE_API_URL` and `VITE_APP_NAME`

## Still Not Working?

1. Check browser console for specific errors
2. Verify all dependencies are in `package.json`
3. Try building with `npm run build` locally
4. Check if `dist/index.html` has correct script paths
5. Verify Cloudflare Pages is serving from `dist` folder

