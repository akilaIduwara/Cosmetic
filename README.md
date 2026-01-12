# Kevina Cosmetics - E-commerce Store

Modern, responsive e-commerce store for Kevina Cosmetics in Boralesgamuwa, Sri Lanka.

## ✨ Features

- 🛍️ **Full E-commerce Store**
  - Product catalog
  - Shopping cart
  - Checkout process
  - Order management

- 👨‍💼 **Admin Panel**
  - Product management (add/edit/delete)
  - Order management
  - Content editor
  - Secure admin login

- 🎨 **Modern UI**
  - Light/Dark theme toggle
  - Responsive design
  - Smooth animations
  - Beautiful UI/UX

- 💾 **Data Storage**
  - All data in localStorage
  - No backend required
  - Works offline

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
```
Visit: `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run preview
```

## 📦 Deployment

This project is configured for **Cloudflare Pages** deployment.

### Setup Instructions

See `GITHUB_CLOUDFLARE_SETUP.md` for complete step-by-step guide.

**Quick Setup:**
1. Push to GitHub
2. Connect to Cloudflare Pages
3. Set Build output directory = `dist`
4. Add custom domain
5. Done! ✅

## 🔧 Configuration

### Cloudflare Pages Settings

**Required:**
- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist` ⚠️ **MUST be exactly `dist`**
- Root directory: `/` (or empty)

**Environment Variables:**
- `NODE_VERSION` = `18`
- `VITE_API_URL` = `https://kevinacosmetics.lk`
- `VITE_APP_NAME` = `Kevina Cosmetics`

## 📁 Project Structure

```
├── src/
│   ├── components/     # UI components
│   ├── pages/          # Page components
│   ├── contexts/        # React contexts
│   ├── utils/          # Utilities
│   └── ...
├── public/
│   ├── _redirects      # SPA routing
│   └── CNAME           # Domain config
├── dist/               # Build output (generated)
└── ...
```

## 🐛 Troubleshooting

### White Screen / `/src/main.jsx` Error

**Solution:** Set Cloudflare Pages Build output directory to `dist`

See `EXACT_FIX_STEPS.md` for detailed fix.

### Routes Return 404

**Solution:** Verify `public/_redirects` file exists with: `/*    /index.html   200`

## 📚 Documentation

- `GITHUB_CLOUDFLARE_SETUP.md` - Complete setup guide
- `EXACT_FIX_STEPS.md` - Troubleshooting guide
- `DEPLOYMENT_COMPLETE_GUIDE.md` - Deployment details

## ✅ Build Verification

The build process automatically verifies:
- ✅ HTML is transformed correctly
- ✅ Scripts point to `/assets/` directory
- ✅ Assets directory exists

## 🌐 Live Site

**Production:** https://kevinacosmetics.lk

## 📝 License

Private project - All rights reserved

---

**Built with React + Vite + Cloudflare Pages**
