# Deployment Guide - Cloudflare Pages + GitHub

## ✅ What's Been Configured

1. **Cloudflare Pages SPA Routing** - Created `public/_redirects` to handle React Router routes (like `/admin`)
2. **Environment Variables** - Set up API URL configuration for local and production
3. **API Utility** - Created `src/utils/api.js` for environment-aware API calls
4. **GitHub Integration** - Ready for Cloudflare Pages deployment via GitHub

## 🚀 Quick Start

### For Local Development

1. Create a `.env` file in the project root:
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Kevina Cosmetics
```

2. Run the development server:
```bash
npm install
npm run dev
```

3. Access the admin panel at: `http://localhost:3000/admin`

### For Production (Cloudflare Pages + GitHub)

#### Step 1: Connect GitHub Repository to Cloudflare Pages

1. **Log in to Cloudflare Dashboard:**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to **Pages** → **Create a project**

2. **Connect Your GitHub Repository:**
   - Click **Connect to Git**
   - Authorize Cloudflare to access your GitHub account
   - Select your repository (`Cosmetic`)
   - Click **Begin setup**

3. **Configure Build Settings:**
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave as default)

4. **Set Environment Variables:**
   - Click **Environment variables** in the build settings
   - Add the following:
     - `VITE_API_URL` = `https://kevinacosmetics.lk`
     - `VITE_APP_NAME` = `Kevina Cosmetics`

5. **Save and Deploy:**
   - Click **Save and Deploy**
   - Cloudflare will build and deploy your site

#### Step 2: Configure Custom Domain

1. **In Cloudflare Pages:**
   - Go to your project → **Custom domains**
   - Click **Set up a custom domain**
   - Enter: `kevinacosmetics.lk`
   - Click **Continue**

2. **In Cloudflare DNS (if domain is managed by Cloudflare):**
   - Go to your domain's DNS settings
   - Add a CNAME record:
     - **Name:** `@` (or leave blank for root domain)
     - **Target:** Your Cloudflare Pages URL (e.g., `your-project.pages.dev`)
     - **Proxy status:** Proxied (orange cloud)

3. **If domain is NOT managed by Cloudflare:**
   - Add a CNAME record in your DNS provider:
     - **Name:** `@` (or root domain)
     - **Target:** Your Cloudflare Pages URL
   - Cloudflare will provide the exact target URL in the custom domain setup

#### Step 3: Verify Deployment

1. **Check Build Status:**
   - Go to your Cloudflare Pages project
   - Check the **Deployments** tab for build status

2. **Access Your Site:**
   - Production URL: `https://kevinacosmetics.lk`
   - Admin panel: `https://kevinacosmetics.lk/admin`

## 📝 How It Works

### Cloudflare Pages Routing (`public/_redirects`)
The `_redirects` file tells Cloudflare Pages to redirect all routes to `index.html` with a 200 status code, allowing React Router to handle client-side routing. This fixes the `/admin` route issue.

### Environment Variables
- **Development**: Uses `http://localhost:3000`
- **Production**: Uses `https://kevinacosmetics.lk`
- **Fallback**: Automatically detects environment if variables aren't set

### API Utility (`src/utils/api.js`)
If you need to make API calls in the future, use:

```javascript
import { buildApiUrl } from './utils/api'

// Example API call
fetch(buildApiUrl('admin/login'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
```

This automatically uses the correct URL based on your environment.

## 🔧 Current Status

✅ **Fixed Issues:**
- Cloudflare Pages routing for `/admin` route
- Environment variable setup
- API URL configuration utility
- GitHub integration ready

✅ **Working:**
- Client-side authentication (localStorage)
- React Router navigation
- Admin panel access

## 📌 Notes

- The app currently uses **client-side authentication** (no backend API calls)
- All data is stored in **localStorage**
- If you add a backend API later, use the `buildApiUrl()` utility from `src/utils/api.js`
- The `_redirects` file ensures all routes work correctly on Cloudflare Pages
- Cloudflare Pages automatically deploys on every push to your main branch

## 🐛 Troubleshooting

**Issue**: `/admin` route shows 404 on Cloudflare Pages
- **Solution**: Make sure `public/_redirects` is in the project and committed to Git. The file should contain: `/*    /index.html   200`

**Issue**: Environment variables not working
- **Solution**: 
  1. Check that variables are set in Cloudflare Pages → Settings → Environment variables
  2. Make sure variable names start with `VITE_` (required for Vite)
  3. Redeploy after adding env vars

**Issue**: Still seeing old URLs
- **Solution**: Check that `VITE_API_URL` is set to `https://kevinacosmetics.lk` in Cloudflare Pages environment variables

**Issue**: Build fails
- **Solution**: 
  1. Check build logs in Cloudflare Pages dashboard
  2. Ensure `package.json` has correct build script: `"build": "vite build"`
  3. Make sure all dependencies are in `package.json` (not just `package-lock.json`)

**Issue**: Custom domain not working
- **Solution**:
  1. Verify DNS records are correct (CNAME pointing to Cloudflare Pages)
  2. Wait for DNS propagation (can take up to 24 hours, usually much faster)
  3. Check SSL/TLS settings in Cloudflare (should be "Full" or "Full (strict)")

## 🔄 Automatic Deployments

Cloudflare Pages automatically deploys when you:
- Push to the main/master branch
- Create a pull request (creates a preview deployment)
- Merge a pull request

You can also trigger manual deployments from the Cloudflare Pages dashboard.

## 📚 Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages with Vite](https://developers.cloudflare.com/pages/framework-guides/vite/)
- [Custom Domains on Cloudflare Pages](https://developers.cloudflare.com/pages/platform/custom-domains/)
