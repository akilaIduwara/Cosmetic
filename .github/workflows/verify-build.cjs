name: Verify Build

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  verify-build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build project
      run: npm run build
    
    - name: Verify build output
      run: |
        echo "Checking build output..."
        
        if [ ! -f "dist/index.html" ]; then
          echo "❌ ERROR: dist/index.html not found!"
          exit 1
        fi
        echo "✅ dist/index.html exists"
        
        if [ ! -d "dist/assets" ]; then
          echo "❌ ERROR: dist/assets directory not found!"
          exit 1
        fi
        echo "✅ dist/assets/ directory exists"
        
        if [ ! -f "scripts/verify-build.js" ]; then
          echo "❌ ERROR: scripts/verify-build.js not found!"
          exit 1
        fi
        
        # Use the Node.js verification script (more accurate - only checks script tag src)
        echo "Running build verification script..."
        node scripts/verify-build.js
        
        echo ""
        echo "✅ Build verification passed!"
        echo "✅ All checks completed successfully"

