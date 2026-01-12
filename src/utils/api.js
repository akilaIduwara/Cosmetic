/**
 * API Configuration Utility
 * 
 * This utility provides environment-aware API URLs.
 * In development, it uses localhost:3000
 * In production, it uses the Cloudflare Pages deployment URL
 */

// Get API URL from environment variable, with fallback
const getApiUrl = () => {
  // Vite uses VITE_ prefix for environment variables
  const apiUrl = import.meta.env.VITE_API_URL
  
  if (apiUrl) {
    return apiUrl
  }
  
  // Fallback: detect environment
  if (import.meta.env.DEV) {
    // Development mode
    return 'http://localhost:3000'
  } else {
    // Production mode - use the Cloudflare Pages URL
    return 'https://kevinacosmetics.lk'
  }
}

// Export the API base URL
export const API_URL = getApiUrl()

// Helper function to build full API endpoint URLs
export const buildApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  return `${API_URL}/${cleanEndpoint}`
}

// Example usage:
// import { buildApiUrl } from './utils/api'
// fetch(buildApiUrl('admin/login'), { ... })

