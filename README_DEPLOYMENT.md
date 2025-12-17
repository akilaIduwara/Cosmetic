# Deployment Guide - Vercel Setup

## ✅ What's Been Fixed

1. **Vercel SPA Routing** - Created `vercel.json` to handle React Router routes (like `/admin`)
2. **Environment Variables** - Set up API URL configuration for local and production
3. **API Utility** - Created `src/utils/api.js` for environment-aware API calls

## 🚀 Quick Start

### For Local Development

1. Create a `.env` file in the project root:
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Kevina Cosmetics
```

2. Run the development server:
```bash
npm run dev
```

3. Access the admin panel at: `http://localhost:3000/admin`

### For Production (Vercel)

1. **Set Environment Variables in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add:
     - `VITE_API_URL` = `https://cosmetic-delta.vercel.app`
     - `VITE_APP_NAME` = `Kevina Cosmetics`

2. **Deploy:**
   - Push to GitHub (if auto-deploy is enabled)
   - Or run `vercel` command

3. **Access the admin panel at:**
   - `https://cosmetic-delta.vercel.app/admin`

## 📝 How It Works

### Vercel Routing (`vercel.json`)
The `vercel.json` file tells Vercel to redirect all routes to `index.html`, allowing React Router to handle client-side routing. This fixes the `/admin` route issue.

### Environment Variables
- **Development**: Uses `http://localhost:3000`
- **Production**: Uses `https://cosmetic-delta.vercel.app`
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
- Vercel routing for `/admin` route
- Environment variable setup
- API URL configuration utility

✅ **Working:**
- Client-side authentication (localStorage)
- React Router navigation
- Admin panel access

## 📌 Notes

- The app currently uses **client-side authentication** (no backend API calls)
- All data is stored in **localStorage**
- If you add a backend API later, use the `buildApiUrl()` utility from `src/utils/api.js`
- The `vercel.json` ensures all routes work correctly on Vercel

## 🐛 Troubleshooting

**Issue**: `/admin` route shows 404 on Vercel
- **Solution**: Make sure `vercel.json` is in the project root and committed to Git

**Issue**: Environment variables not working
- **Solution**: 
  1. Restart Vercel deployment after adding env vars
  2. Make sure variable names start with `VITE_` (required for Vite)
  3. Rebuild: `npm run build`

**Issue**: Still seeing localhost URLs
- **Solution**: Check that `VITE_API_URL` is set in Vercel environment variables

