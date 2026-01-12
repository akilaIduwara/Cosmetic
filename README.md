# Kevina Cosmetics

Modern e-commerce store for Kevina Cosmetics in Boralesgamuwa.

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

## 📦 Deployment

This project is configured for **Cloudflare Pages** deployment.

### Cloudflare Pages Configuration

**Required Settings:**
- **Framework preset:** `Vite`
- **Build command:** `npm run build`
- **Build output directory:** `dist` ⚠️ **MUST be exactly `dist`**
- **Root directory:** `/` (or leave empty)

**Environment Variables:**
- `NODE_VERSION` = `18`
- `VITE_API_URL` = `https://kevinacosmetics.lk`
- `VITE_APP_NAME` = `Kevina Cosmetics`

See `FINAL_FIX_INSTRUCTIONS.md` for detailed setup instructions.

## ✅ Build Verification

The build process automatically verifies:
- ✅ HTML is transformed correctly (no `/src/main.jsx` in script tags)
- ✅ Scripts point to `/assets/` directory
- ✅ Assets directory exists

## 📁 Project Structure

```
├── src/              # Source files
├── public/           # Static assets
├── dist/             # Build output (generated)
├── scripts/          # Build scripts
└── .github/          # GitHub Actions workflows
```

## 🔧 Troubleshooting

If you see a white screen or `/src/main.jsx` errors:
1. Check Cloudflare Pages build output directory is set to `dist`
2. Verify build completed successfully in Cloudflare dashboard
3. Clear cache and redeploy
4. See `FINAL_FIX_INSTRUCTIONS.md` for detailed steps

## 📚 Documentation

- `FINAL_FIX_INSTRUCTIONS.md` - Complete Cloudflare setup guide
- `README_DEPLOYMENT.md` - Detailed deployment instructions
- `TROUBLESHOOTING.md` - Common issues and solutions

