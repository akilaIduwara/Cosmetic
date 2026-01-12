# Environment Variables Setup

## For Local Development

Create a `.env` file in the project root with:

```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Kevina Cosmetics
```

## For Production (Cloudflare Pages)

1. Go to your Cloudflare Pages project dashboard
2. Navigate to **Settings** → **Environment variables**
3. Add the following variables:

```
VITE_API_URL=https://kevinacosmetics.lk
VITE_APP_NAME=Kevina Cosmetics
```

**Note:** After adding environment variables, you need to trigger a new deployment for the changes to take effect.

## Using the API Utility

In your code, import and use the API utility:

```javascript
import { buildApiUrl } from './utils/api'

// Example: Making an API call
fetch(buildApiUrl('admin/login'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
```

The utility automatically:
- Uses `http://localhost:3000` in development
- Uses `https://kevinacosmetics.lk` in production
- Falls back to environment detection if variables aren't set

