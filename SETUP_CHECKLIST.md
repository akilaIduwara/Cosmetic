# ✅ Complete Setup Checklist

Follow this checklist step-by-step to deploy your project.

## 📋 Pre-Deployment Checklist

### ✅ Code is Ready
- [x] Build works locally (`npm run build`)
- [x] All features working
- [x] No errors in console
- [x] All files committed to Git

---

## 🚀 PART 1: Upload to GitHub

### Step 1: Create GitHub Repository
- [ ] Go to https://github.com/new
- [ ] Repository name: `Cosmetic`
- [ ] Choose Public or Private
- [ ] **DO NOT** initialize with README
- [ ] Click Create repository

### Step 2: Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Kevina Cosmetics"
git remote add origin https://github.com/YOUR_USERNAME/Cosmetic.git
git branch -M main
git push -u origin main
```

- [ ] Code pushed to GitHub
- [ ] Repository visible on GitHub

---

## ☁️ PART 2: Connect to Cloudflare Pages

### Step 1: Create Cloudflare Pages Project
- [ ] Go to https://dash.cloudflare.com
- [ ] Click **Pages** → **Create a project**
- [ ] Click **Connect to Git**
- [ ] Authorize GitHub access
- [ ] Select repository: `Cosmetic`
- [ ] Click **Begin setup**

### Step 2: Configure Build Settings ⚠️ CRITICAL
- [ ] Framework preset: `Vite`
- [ ] Build command: `npm run build`
- [ ] **Build output directory: `dist`** ← MUST BE EXACTLY THIS
- [ ] Root directory: `/` (or empty)

### Step 3: Set Environment Variables
- [ ] `NODE_VERSION` = `18` (Production)
- [ ] `VITE_API_URL` = `https://kevinacosmetics.lk` (Production)
- [ ] `VITE_APP_NAME` = `Kevina Cosmetics` (Production)

### Step 4: Deploy
- [ ] Click **Save and Deploy**
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Check build logs - should show success
- [ ] Note the Cloudflare Pages URL (e.g., `your-project.pages.dev`)

---

## 🌐 PART 3: Connect Custom Domain (.lk)

### Step 1: Add Domain in Cloudflare Pages
- [ ] Go to project → **Custom domains**
- [ ] Click **Set up a custom domain**
- [ ] Enter: `kevinacosmetics.lk`
- [ ] Click **Continue**

### Step 2: Configure DNS

**If domain is in Cloudflare:**
- [ ] Cloudflare auto-adds CNAME record
- [ ] Wait for DNS propagation (usually instant)

**If domain is NOT in Cloudflare:**
- [ ] Go to your domain registrar's DNS settings
- [ ] Add CNAME record:
  - Name: `@` (or blank)
  - Target: Your Cloudflare Pages URL
- [ ] Add CNAME for www (optional):
  - Name: `www`
  - Target: Your Cloudflare Pages URL
- [ ] Save DNS records
- [ ] Wait for DNS propagation (5 min - 24 hours)

### Step 3: Verify SSL
- [ ] Wait for SSL certificate (1-5 minutes)
- [ ] Green checkmark appears when ready
- [ ] Visit `https://kevinacosmetics.lk`
- [ ] SSL lock icon appears in browser

---

## ✅ Final Verification

### Build Verification
- [ ] Build completed successfully
- [ ] Build output directory = `dist`
- [ ] No errors in build logs

### Domain Verification
- [ ] `https://kevinacosmetics.lk` loads
- [ ] SSL certificate active (green lock)
- [ ] No mixed content warnings

### Site Functionality
- [ ] Home page loads correctly
- [ ] Shop page works
- [ ] About page works
- [ ] Contact page works
- [ ] Checkout page works
- [ ] Cart functionality works
- [ ] Admin panel works (`/admin`)
- [ ] Theme toggle works
- [ ] No console errors (F12)

### Source Verification
- [ ] Right-click → View Page Source
- [ ] Script tag shows: `/assets/index-[hash].js`
- [ ] Does NOT show: `/src/main.jsx`

---

## 🎉 Success!

If all checkboxes are checked:
- ✅ Your site is live!
- ✅ All features working!
- ✅ Automatic deployments enabled!
- ✅ SSL certificate active!

---

## 🐛 If Something Doesn't Work

### White Screen / `/src/main.jsx` Error
**Fix:** Set Build output directory = `dist` in Cloudflare Pages settings

### Domain Not Loading
**Fix:** Check DNS records, wait for propagation, verify SSL certificate

### Build Fails
**Fix:** Check Node version (18 or 20), verify dependencies, check build logs

### Routes Return 404
**Fix:** Verify `public/_redirects` file exists with: `/*    /index.html   200`

---

## 📞 Need Help?

1. Check `GITHUB_CLOUDFLARE_SETUP.md` for detailed instructions
2. Check `EXACT_FIX_STEPS.md` for troubleshooting
3. Visit: `https://kevinacosmetics.lk/diagnostic.html` (after deployment)

**Follow this checklist and your site will work perfectly! 🚀**

