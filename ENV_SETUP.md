# Environment Variables Setup

## For Local Development

Create a `.env` file in the project root with:

```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Kevina Cosmetics
```

## For Production (Vercel)

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
VITE_API_URL=https://cosmetic-delta.vercel.app
VITE_APP_NAME=Kevina Cosmetics
```

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
- Uses `https://cosmetic-delta.vercel.app` in production
- Falls back to environment detection if variables aren't set

