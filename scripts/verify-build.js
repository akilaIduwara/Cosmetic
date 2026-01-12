#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('Checking build output...\n');

let hasErrors = false;

// Check if dist/index.html exists
const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('✅ dist/index.html exists');
  
  // Check if index.html references compiled assets (not source files)
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Check for source file references (should not exist in production build)
  if (indexContent.includes('/src/main.jsx') || indexContent.includes('/src/main.js')) {
    console.error('❌ ERROR: index.html still references source files (/src/main.jsx)');
    console.error('   The build output should reference compiled assets in /assets/');
    hasErrors = true;
  } else {
    // Check if it references compiled assets
    if (indexContent.includes('/assets/') || indexContent.includes('main.')) {
      console.log('✅ index.html references compiled assets');
    } else {
      console.log('⚠️  WARNING: Could not verify asset references in index.html');
    }
  }
} else {
  console.error('❌ ERROR: dist/index.html does not exist!');
  hasErrors = true;
}

// Check if dist/assets directory exists
const assetsDir = path.join(__dirname, '..', 'dist', 'assets');
if (fs.existsSync(assetsDir)) {
  console.log('✅ dist/assets/ directory exists');
  
  // Check if there are JS files in assets
  const files = fs.readdirSync(assetsDir);
  const jsFiles = files.filter(f => f.endsWith('.js'));
  if (jsFiles.length > 0) {
    console.log(`✅ Found ${jsFiles.length} compiled JavaScript file(s)`);
  } else {
    console.error('❌ ERROR: No JavaScript files found in dist/assets/');
    hasErrors = true;
  }
} else {
  console.error('❌ ERROR: dist/assets/ directory does not exist!');
  hasErrors = true;
}

// Check if _redirects file exists (for SPA routing)
const redirectsPath = path.join(__dirname, '..', 'dist', '_redirects');
if (fs.existsSync(redirectsPath)) {
  console.log('✅ dist/_redirects exists');
} else {
  console.log('⚠️  WARNING: dist/_redirects not found (may be needed for SPA routing)');
}

console.log('');
if (hasErrors) {
  console.error('❌ Build verification failed!');
  process.exit(1);
} else {
  console.log('✅ Build verification passed!');
  process.exit(0);
}

