# 🚀 Complete Setup: GitHub → Cloudflare Pages → .lk Domain

## ✅ Project is Ready!

Your project is now fully configured for:
- ✅ GitHub repository
- ✅ Cloudflare Pages deployment
- ✅ Custom domain (kevinacosmetics.lk)

---

## 📋 Step-by-Step Setup Guide

### PART 1: Upload to GitHub

#### Step 1: Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit - Kevina Cosmetics"
```

#### Step 2: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `Cosmetic` (or your preferred name)
3. Description: "Kevina Cosmetics E-commerce Store"
4. Choose: **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

#### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/Cosmetic.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### PART 2: Connect to Cloudflare Pages

#### Step 1: Go to Cloudflare Dashboard
1. Visit: https://dash.cloudflare.com
2. Log in to your account
3. Click **Pages** in the left sidebar

#### Step 2: Create New Project
1. Click **Create a project**
2. Click **Connect to Git**
3. Authorize Cloudflare to access GitHub (if first time)
4. Select your repository: `Cosmetic`
5. Click **Begin setup**

#### Step 3: Configure Build Settings ⚠️ CRITICAL

Set these **EXACT** values:

```
Framework preset: Vite
Build command: npm run build
Build output directory: dist          ← MUST BE EXACTLY "dist"
Root directory: / (or leave empty)
```

**⚠️ MOST IMPORTANT:** Build output directory MUST be `dist`

#### Step 4: Set Environment Variables

Click **Environment variables** and add:

**For Production:**
- Variable: `NODE_VERSION`
- Value: `18`
- Environment: Production

- Variable: `VITE_API_URL`
- Value: `https://kevinacosmetics.lk`
- Environment: Production

- Variable: `VITE_APP_NAME`
- Value: `Kevina Cosmetics`
- Environment: Production

#### Step 5: Deploy
1. Click **Save and Deploy**
2. Wait 2-5 minutes for build to complete
3. Check build logs for any errors

---

### PART 3: Connect Custom Domain (.lk)

#### Step 1: Add Custom Domain in Cloudflare Pages
1. Go to your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `kevinacosmetics.lk`
4. Click **Continue**

#### Step 2: Configure DNS

**If your domain is managed by Cloudflare:**
1. Go to your domain's DNS settings in Cloudflare
2. Cloudflare will automatically add the CNAME record
3. Wait for DNS propagation (usually instant)

**If your domain is NOT managed by Cloudflare:**
1. Go to your domain registrar's DNS settings
2. Add a CNAME record:
   - **Name:** `@` (or leave blank for root domain)
   - **Target:** Your Cloudflare Pages URL (shown in setup)
   - **TTL:** 3600 (or Auto)
3. Also add for www:
   - **Name:** `www`
   - **Target:** Your Cloudflare Pages URL
   - **TTL:** 3600
4. Save and wait for DNS propagation (5 minutes to 24 hours)

#### Step 3: Wait for SSL Certificate
- Cloudflare automatically provisions SSL certificate
- Usually takes 1-5 minutes
- You'll see a green checkmark when ready

#### Step 4: Verify Domain
1. Visit: `https://kevinacosmetics.lk`
2. Should load your site
3. Check SSL is working (lock icon in browser)

---

## ✅ Verification Checklist

After setup, verify:

### Build Verification:
- [ ] Build completed successfully in Cloudflare
- [ ] Build output directory = `dist`
- [ ] No build errors in logs

### Domain Verification:
- [ ] `https://kevinacosmetics.lk` loads
- [ ] `https://www.kevinacosmetics.lk` loads (optional)
- [ ] SSL certificate is active (green lock)
- [ ] No mixed content warnings

### Site Functionality:
- [ ] Home page loads
- [ ] All pages work (Shop, About, Contact, Checkout)
- [ ] Cart functionality works
- [ ] Admin panel works (`/admin`)
- [ ] Theme toggle works
- [ ] No console errors (F12)

### Source Verification:
- [ ] Right-click → View Page Source
- [ ] Script tag shows: `/assets/index-[hash].js`
- [ ] Does NOT show: `/src/main.jsx`

---

## 🔧 Troubleshooting

### Issue: White Screen / `/src/main.jsx` Error

**Fix:**
1. Go to Cloudflare Pages → Settings
2. Check **Build output directory** = `dist` (exactly)
3. Clear build cache
4. Retry deployment

### Issue: Domain Not Working

**Fix:**
1. Check DNS records are correct
2. Wait for DNS propagation (can take up to 24 hours)
3. Verify SSL certificate is active
4. Check domain is added in Cloudflare Pages

### Issue: Build Fails

**Fix:**
1. Check Node version is 18 or 20
2. Verify all dependencies in `package.json`
3. Check build logs for specific errors
4. Make sure `npm run build` works locally

### Issue: Routes Return 404

**Fix:**
1. Verify `public/_redirects` file exists
2. Should contain: `/*    /index.html   200`
3. File should be in `dist` after build

---

## 📁 Important Files

These files are configured correctly:

- ✅ `vite.config.js` - Build configuration
- ✅ `package.json` - Dependencies and scripts
- ✅ `public/_redirects` - SPA routing for Cloudflare
- ✅ `public/CNAME` - Domain configuration
- ✅ `.gitignore` - Git ignore rules
- ✅ `scripts/verify-build.js` - Build verification

---

## 🔄 Automatic Deployments

After initial setup:
- Every push to `main` branch = automatic deployment
- Pull requests = preview deployments
- Deployments take 2-5 minutes

---

## 📝 Quick Commands

### Local Development:
```bash
npm install
npm run dev
```

### Build Locally:
```bash
npm run build
npm run preview
```

### Push to GitHub:
```bash
git add .
git commit -m "Your message"
git push
```

---

## 🎉 Success!

Once all steps are complete:
- ✅ Site is live at `https://kevinacosmetics.lk`
- ✅ All features working
- ✅ Automatic deployments on every push
- ✅ SSL certificate active
- ✅ Fast CDN delivery via Cloudflare

---

## 🆘 Need Help?

1. Check build logs in Cloudflare dashboard
2. Visit: `https://kevinacosmetics.lk/diagnostic.html`
3. Check browser console (F12) for errors
4. Verify all settings match this guide

**Your project is ready! Follow these steps and it will work perfectly! 🚀**

