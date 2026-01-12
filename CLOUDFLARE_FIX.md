# Cloudflare Pages Configuration Fix

## Problem
Cloudflare Pages is serving the source `index.html` (with `/src/main.jsx`) instead of the built `index.html` (with `/assets/index-[hash].js`).

## Solution

### Step 1: Verify Cloudflare Pages Build Settings

Go to your Cloudflare Pages dashboard:
1. Navigate to your project
2. Go to **Settings** → **Builds & deployments**
3. Verify these settings:

**Build configuration:**
- **Framework preset:** `Vite` (or `None` if Vite isn't listed)
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (leave empty or set to `/`)

### Step 2: Verify Node Version

1. Go to **Settings** → **Environment variables**
2. Add if not present:
   - **Variable name:** `NODE_VERSION`
   - **Value:** `18` or `20`
   - **Environment:** Production (and Preview if needed)

### Step 3: Clear Cache and Redeploy

1. Go to **Settings** → **Builds & deployments**
2. Click **Clear build cache**
3. Go to **Deployments**
4. Click **Retry deployment** on the latest deployment
   - OR push a new commit to trigger a rebuild

### Step 4: Verify Build Logs

1. Go to **Deployments**
2. Click on the latest deployment
3. Check the build logs for:
   - ✅ `vite build` command running
   - ✅ `dist/index.html` being created
   - ✅ `dist/assets/` folder with files
   - ❌ Any errors or warnings

### Step 5: Check Deployment Files

After deployment, verify:
1. Go to **Deployments** → Latest deployment
2. Click **View build** or inspect files
3. Verify `index.html` contains `/assets/` paths, NOT `/src/`

## Quick Test

After fixing settings, the built `index.html` should have:
```html
<script type="module" crossorigin src="/assets/index-[hash].js"></script>
```

NOT:
```html
<script type="module" src="/src/main.jsx"></script>
```

## If Still Not Working

1. **Check if build is running:**
   - Look at deployment logs
   - Should see "vite build" output

2. **Verify dist folder exists after build:**
   - Build logs should show files being created
   - Should see `dist/index.html` and `dist/assets/`

3. **Try manual rebuild:**
   - Delete the latest deployment
   - Push a new commit or trigger manual deployment

4. **Check for build errors:**
   - Look for red errors in build logs
   - Common issues: missing dependencies, Node version mismatch

