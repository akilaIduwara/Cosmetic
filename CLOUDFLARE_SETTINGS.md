# ⚠️ CLOUDFLARE PAGES SETTINGS - FIX THIS NOW

## The Error You're Seeing
```
Failed to Load Application Script
Error loading: https://kevinacosmetics.lk/src/main.jsx
```

## Why This Happens
Cloudflare Pages is serving **SOURCE** files (`/src/main.jsx`) instead of **BUILT** files (`/assets/index-[hash].js`).

## The Fix (5 Minutes)

### 1. Go to Cloudflare Dashboard
👉 https://dash.cloudflare.com → Pages → Your Project

### 2. Click Settings → Builds & deployments

### 3. Find "Build configuration" section

### 4. Set these EXACT values:

| Field | Value |
|-------|-------|
| Framework preset | `Vite` |
| Build command | `npm run build` |
| **Build output directory** | **`dist`** ← **MOST IMPORTANT!** |
| Root directory | `/` (or empty) |

### 5. Click "Save"

### 6. Click "Clear build cache"

### 7. Go to "Deployments" tab

### 8. Click "⋯" (three dots) on latest deployment → "Retry deployment"

### 9. Wait 2-5 minutes

### 10. Check your site - it should work!

---

## How to Verify It's Fixed

1. Visit: https://kevinacosmetics.lk
2. Right-click → View Page Source
3. Look for: `<script type="module" src="/assets/...`
4. If you see `/assets/` → ✅ FIXED!
5. If you see `/src/main.jsx` → ❌ Still wrong, check step 4 again

---

## Diagnostic Page

Visit: https://kevinacosmetics.lk/diagnostic.html

This page will tell you exactly what's wrong.

---

## ⚠️ IMPORTANT

- The code is **100% correct**
- The problem is **ONLY** in Cloudflare settings
- You **MUST** set Build output directory to `dist`
- You **MUST** clear cache and redeploy after changing settings

---

## Still Not Working?

1. Double-check Build output directory = `dist` (exactly, no spaces)
2. Check build logs for errors
3. Make sure you saved the settings
4. Make sure you cleared cache
5. Make sure you redeployed

