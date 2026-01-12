# ⚠️ URGENT FIX NEEDED - Cloudflare Pages Configuration

## The Problem
Your site is trying to load `/src/main.jsx` which doesn't exist in production. Cloudflare Pages is serving the **source** `index.html` instead of the **built** `index.html`.

## The Fix (Do This Now)

### Step 1: Go to Cloudflare Pages Dashboard
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Pages** → Your project

### Step 2: Fix Build Settings
1. Click **Settings** → **Builds & deployments**
2. Scroll to **Build configuration**
3. **VERIFY THESE EXACT SETTINGS:**

```
Framework preset: Vite (or None)
Build command: npm run build
Build output directory: dist
Root directory: / (or leave empty)
```

**⚠️ CRITICAL:** The **Build output directory** MUST be `dist` (not `build`, not empty, exactly `dist`)

### Step 3: Clear Cache and Redeploy
1. Still in **Settings** → **Builds & deployments**
2. Click **Clear build cache** button
3. Go to **Deployments** tab
4. Click the **three dots** (⋯) on the latest deployment
5. Click **Retry deployment**

### Step 4: Verify It Worked
1. Wait for deployment to complete (2-5 minutes)
2. Go to your site: `https://kevinacosmetics.lk`
3. **Right-click** → **View Page Source**
4. Look for the script tag - it should say:
   ```html
   <script type="module" crossorigin src="/assets/index-[hash].js"></script>
   ```
5. If it says `/src/main.jsx`, the build didn't work - check build logs

## How to Check Build Logs

1. Go to **Deployments**
2. Click on the latest deployment
3. Click **View build** or expand the build section
4. Look for:
   - ✅ `vite build` command
   - ✅ `dist/index.html` created
   - ✅ `dist/assets/` folder with files
   - ❌ Any red errors

## If Build Output Directory Was Wrong

If you had it set to something else (like `build` or empty):
1. Change it to `dist`
2. Clear cache
3. Redeploy
4. The site should work immediately

## Quick Verification

After fixing, your deployed site should:
- ✅ Load without white screen
- ✅ Show "Initializing React app..." in console (F12)
- ✅ Have script pointing to `/assets/` not `/src/`

## Still Not Working?

1. **Check build completed:**
   - Go to Deployments → Latest
   - Should show "Success" status
   - If "Failed", check the error message

2. **Verify files exist:**
   - In build logs, should see files being created
   - Should see `dist/index.html` and `dist/assets/` mentioned

3. **Check Node version:**
   - Settings → Environment variables
   - Add `NODE_VERSION` = `18` if not present

