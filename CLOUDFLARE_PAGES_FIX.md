# 🔴 WHY YOU'RE SEEING THIS ERROR

## The Error:
```
Failed to Load Application Script
Error loading: https://kevinacosmetics.lk/src/main.jsx
```

## Why This Happens:

**Cloudflare Pages is serving SOURCE files instead of BUILT files.**

This means:
- ❌ Cloudflare is looking at `/src/main.jsx` (source code)
- ❌ It should be looking at `/assets/index-[hash].js` (built files)
- ❌ The Build output directory is NOT set to `dist`

---

## ✅ THE FIX (Cloudflare Pages - NOT GitHub Pages)

You're using **Cloudflare Pages**, not GitHub Pages. Here's the correct fix:

### Step 1: Go to Cloudflare Dashboard

1. Visit: https://dash.cloudflare.com
2. Click **Pages** in left sidebar
3. Click on your project

### Step 2: Fix Build Settings (CRITICAL)

1. Click **Settings** → **Builds & deployments**
2. Scroll to **Build configuration**
3. Find **Build output directory** field
4. **CHANGE IT TO:** `dist` (exactly, no quotes, no spaces)
5. Verify these settings:

```
Framework preset: Vite
Build command: npm run build
Build output directory: dist          ← MUST BE THIS
Root directory: / (or leave empty)
```

### Step 3: Clear Cache and Redeploy

1. Still in **Settings** → **Builds & deployments**
2. Scroll down and click **Clear build cache**
3. Go to **Deployments** tab
4. Click the **three dots** (⋯) on latest deployment
5. Click **Retry deployment**
6. Wait 2-5 minutes

### Step 4: Verify It Worked

1. Visit: https://kevinacosmetics.lk
2. **Right-click** → **View Page Source**
3. Look for the script tag

**✅ CORRECT (After Fix):**
```html
<script type="module" crossorigin src="/assets/index-[hash].js"></script>
```

**❌ WRONG (Current):**
```html
<script type="module" src="/src/main.jsx"></script>
```

---

## 🔍 How to Check Build Logs

1. Go to **Deployments** tab
2. Click on latest deployment
3. Expand build section
4. You should see:
   - ✅ `npm run build` running
   - ✅ `vite build` output
   - ✅ Files created in `dist/` folder
   - ✅ `dist/index.html` mentioned

If you see errors, check:
- Node version (should be 18 or 20)
- Build command is correct
- Dependencies installed

---

## ⚠️ Common Mistakes

1. ❌ Build output directory = `build` (wrong)
2. ❌ Build output directory = empty (wrong)
3. ❌ Build output directory = `dist/` with slash (wrong)
4. ✅ Build output directory = `dist` (correct)

---

## 🧪 Test After Fix

1. Visit your site
2. Open browser console (F12)
3. Should see: "Initializing React app..."
4. Should NOT see: 404 errors for `/src/main.jsx`
5. Site should load completely

---

## 📝 Why It Works Locally But Not Online

| Location | What Happens |
|----------|-------------|
| **Local (npm run dev)** | Vite dev server compiles JSX automatically |
| **Cloudflare (wrong)** | Serves source files without building |
| **Cloudflare (correct)** | Builds first, then serves built files from `dist/` |

---

## ✅ Summary

**The Problem:**
- Cloudflare Pages Build output directory is NOT set to `dist`

**The Fix:**
1. Set Build output directory = `dist` (exactly)
2. Clear cache
3. Redeploy

**The Code:**
- ✅ Your code is 100% correct
- ✅ Build works perfectly locally
- ✅ Only Cloudflare settings need fixing

---

## 🆘 Still Not Working?

1. **Double-check** Build output directory = `dist` (no typos)
2. **Verify** build completed successfully (check logs)
3. **Make sure** you cleared cache
4. **Confirm** you redeployed after changing settings
5. **Check** Node version is 18 or 20

Visit: `https://kevinacosmetics.lk/diagnostic.html` for automated diagnosis.

