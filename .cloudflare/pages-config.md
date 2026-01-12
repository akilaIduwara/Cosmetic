# Cloudflare Pages Configuration

## Required Settings

### Build Settings
- **Framework preset:** `Vite` (or select "None" and configure manually)
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (leave empty)

### Environment Variables
Add these in Settings → Environment variables:

**Production:**
- `NODE_VERSION` = `18` (or `20`)
- `VITE_API_URL` = `https://kevinacosmetics.lk`
- `VITE_APP_NAME` = `Kevina Cosmetics`

### Important Notes

1. **Build Output Directory MUST be `dist`**
   - This is where Vite outputs the built files
   - Cloudflare will serve files from this directory

2. **The built `index.html` should have:**
   ```html
   <script type="module" crossorigin src="/assets/index-[hash].js"></script>
   ```
   NOT:
   ```html
   <script type="module" src="/src/main.jsx"></script>
   ```

3. **After deployment, verify:**
   - Go to your site URL
   - View page source (right-click → View Page Source)
   - Check that script src points to `/assets/`, not `/src/`

## Troubleshooting

### If you see `/src/main.jsx` in the deployed site:
1. Cloudflare is serving the source files, not built files
2. Check build output directory is set to `dist`
3. Check build completed successfully
4. Clear cache and redeploy

### If build fails:
1. Check Node version (should be 18 or 20)
2. Check build logs for errors
3. Verify all dependencies are in `package.json`

