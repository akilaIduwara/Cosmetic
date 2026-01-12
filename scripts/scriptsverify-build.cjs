const fs = require('fs');
const path = require('path');

const distIndexPath = path.join(__dirname, '..', 'dist', 'index.html');

if (!fs.existsSync(distIndexPath)) {
  console.error('❌ ERROR: dist/index.html not found!');
  process.exit(1);
}

const html = fs.readFileSync(distIndexPath, 'utf8');

// Check for script tag with src attribute
const scriptTagMatch = html.match(/<script[^>]*src=['"]([^'"]+)['"]/);

if (!scriptTagMatch) {
  console.error('❌ ERROR: No script tag with src attribute found in index.html');
  process.exit(1);
}

const scriptSrc = scriptTagMatch[1];

if (scriptSrc.includes('/src/main.jsx')) {
  console.error('❌ ERROR: Build failed - script tag still points to /src/main.jsx');
  console.error('   Found:', scriptSrc);
  process.exit(1);
}

if (!scriptSrc.includes('/assets/')) {
  console.error('❌ ERROR: Build failed - script tag missing /assets/ path');
  console.error('   Found:', scriptSrc);
  process.exit(1);
}

console.log('✅ Build verification: HTML transformed correctly');
console.log('✅ Script tag points to:', scriptSrc);

// Also verify assets directory exists
const assetsDir = path.join(__dirname, '..', 'dist', 'assets');
if (!fs.existsSync(assetsDir)) {
  console.error('❌ ERROR: dist/assets directory not found!');
  process.exit(1);
}

console.log('✅ Assets directory exists');

