#!/bin/bash

# Build script for Eye Tracking Controller Windows Executable
# This script builds the application and prepares it for distribution

echo "================================================"
echo "Eye Tracking Controller - Windows Build Script"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✓ Dependencies installed"
    echo ""
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
echo "✓ Clean complete"
echo ""

# Build 64-bit version
echo "🔨 Building Windows 64-bit executable..."
npm run package-win
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi
echo "✓ Build complete"
echo ""

# Copy distribution README
echo "📄 Copying distribution README..."
cp DISTRIBUTION-README.txt dist/Eyetrack-win32-x64/README.txt
echo "✓ README copied"
echo ""

# Get the size
SIZE=$(du -sh dist/Eyetrack-win32-x64/ | cut -f1)
echo "================================================"
echo "✅ BUILD SUCCESSFUL!"
echo "================================================"
echo ""
echo "Output location: dist/Eyetrack-win32-x64/"
echo "Executable: Eyetrack.exe"
echo "Total size: $SIZE"
echo ""
echo "To distribute:"
echo "  1. Create a ZIP file of the entire dist/Eyetrack-win32-x64/ folder"
echo "  2. Share the ZIP with users"
echo "  3. Users extract and run Eyetrack.exe"
echo ""
echo "To create ZIP (if zip is installed):"
echo "  cd dist && zip -r Eyetrack-Windows-x64.zip Eyetrack-win32-x64/"
echo ""
