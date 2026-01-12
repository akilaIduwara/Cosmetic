# 🚀 Complete GitHub Deployment Guide

## ✅ Project is Ready for GitHub!

Your project is **100% configured** and ready to deploy via GitHub to Cloudflare Pages.

---

## 📋 Step 1: Upload to GitHub

### Option A: New Repository

1. **Create Repository on GitHub:**
   - Go to: https://github.com/new
   - Repository name: `Cosmetic` (or your choice)
   - Description: "Kevina Cosmetics E-commerce Store"
   - Choose: Public or Private
   - **DO NOT** check "Initialize with README"
   - Click **Create repository**

2. **Push Your Code:**
   ```bash
   # If not already initialized:
   git init
   git add .
   git commit -m "Initial commit - Kevina Cosmetics"
   
   # Connect to GitHub:
   git remote add origin https://github.com/YOUR_USERNAME/Cosmetic.git
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub username.

### Option B: Existing Repository

```bash
git add .
git commit -m "Update project for Cloudflare Pages"
git push
```

---

## 📋 Step 2: Connect to Cloudflare Pages

### 1. Go to Cloudflare Dashboard
- Visit: https://dash.cloudflare.com
- Click **Pages** (left sidebar)
- Click **Create a project**

### 2. Connect GitHub
- Click **Connect to Git**
- Authorize Cloudflare (if first time)
- Select your repository: `Cosmetic`
- Click **Begin setup**

### 3. Configure Build Settings ⚠️ CRITICAL

Set these **EXACT** values:

```
Framework preset: Vite
Build command: npm run build
Build output directory: dist          ← MUST BE EXACTLY "dist"
Root directory: / (or leave empty)
```

**⚠️ MOST IMPORTANT:** Build output directory MUST be `dist` (not `build`, not empty, exactly `dist`)

### 4. Environment Variables

Click **Environment variables** and add:

**Production:**
- `NODE_VERSION` = `18`
- `VITE_API_URL` = `https://kevinacosmetics.lk`
- `VITE_APP_NAME` = `Kevina Cosmetics`

### 5. Deploy
- Click **Save and Deploy**
- Wait 2-5 minutes
- Check build logs for success

---

## 📋 Step 3: Connect Custom Domain

### 1. Add Domain
- Go to project → **Custom domains**
- Click **Set up a custom domain**
- Enter: `kevinacosmetics.lk`
- Click **Continue**

### 2. Configure DNS

**If domain is in Cloudflare:**
- Cloudflare auto-configures DNS
- Wait 1-2 minutes

**If domain is NOT in Cloudflare:**
- Go to your domain registrar
- Add CNAME record:
  - Name: `@` (or blank for root)
  - Target: Your Cloudflare Pages URL
- Save and wait for DNS propagation (5 min - 24 hours)

### 3. Wait for SSL
- Cloudflare auto-provisions SSL
- Takes 1-5 minutes
- Green checkmark when ready

---

## ✅ Verification Checklist

After deployment:

- [ ] Build completed successfully
- [ ] Build output directory = `dist`
- [ ] Site loads: https://kevinacosmetics.lk
- [ ] View source shows `/assets/` not `/src/`
- [ ] All pages work (Home, Shop, About, Contact, Checkout)
- [ ] Cart works
- [ ] Admin panel works (`/admin`)
- [ ] Theme toggle works
- [ ] No console errors

---

## 🔄 Automatic Deployments

After setup:
- ✅ Every push to `main` = automatic deployment
- ✅ Pull requests = preview deployments
- ✅ Deployments take 2-5 minutes

---

## 🐛 Troubleshooting

### White Screen / `/src/main.jsx` Error

**Fix:**
1. Cloudflare Pages → Settings
2. Set Build output directory = `dist` (exactly)
3. Clear cache
4. Retry deployment

### Build Fails

**Check:**
- Node version = 18 or 20
- All dependencies in `package.json`
- Build logs for specific errors

### Domain Not Working

**Check:**
- DNS records correct
- SSL certificate active
- Domain added in Cloudflare Pages

---

## 📁 Project Structure

```
Cosmetic/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── utils/             # Utilities
│   ├── App.jsx            # Main app
│   └── main.jsx           # Entry point
├── public/                # Static files
│   ├── _redirects        # SPA routing
│   └── CNAME             # Domain config
├── dist/                  # Build output (generated)
├── scripts/               # Build scripts
├── index.html             # HTML template
├── vite.config.js         # Vite config
└── package.json           # Dependencies
```

---

## 🎉 Success!

Once deployed:
- ✅ Site live at: https://kevinacosmetics.lk
- ✅ All features working
- ✅ Automatic deployments
- ✅ SSL certificate active
- ✅ Fast CDN delivery

**Your project is ready! Follow these steps and it will work perfectly! 🚀**

