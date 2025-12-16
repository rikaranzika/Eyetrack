# Building Eye Tracking Controller for Windows

This guide provides detailed instructions for building a standalone Windows executable of the Eye Tracking Controller application.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Build Options](#build-options)
- [Distribution](#distribution)
- [Advanced Configuration](#advanced-configuration)
- [Troubleshooting](#troubleshooting)

## Overview

The Eye Tracking Controller can be packaged as a standalone Windows executable using Electron and @electron/packager. This allows end users to run the application without installing Node.js or any development tools.

### What Gets Packaged

The build process creates a portable application that includes:
- **Electron Runtime:** Chromium browser engine (v39.2.7)
- **Node.js Runtime:** JavaScript runtime for the main process
- **Application Code:** All HTML, CSS, and JavaScript files
- **Dependencies:** All required system libraries and DLLs
- **ASAR Archive:** Compressed application files for faster loading

### Package Details
- **Size:** ~326 MB (compressed to ~120 MB in ZIP)
- **Architecture:** 64-bit (x64) or 32-bit (ia32)
- **Format:** Portable executable (no installer needed)
- **Platform:** Windows 7 and later

## Prerequisites

### For Building

**Required:**
- Node.js 14.x or higher ([download](https://nodejs.org/))
- npm (included with Node.js)
- Git (optional, for cloning the repository)

**Optional:**
- Wine (only needed for advanced features on Linux/macOS)
- 7-Zip or similar for creating compressed archives

### System Requirements

**Build Machine:**
- Operating System: Windows, Linux, or macOS
- RAM: 2 GB minimum, 4 GB recommended
- Disk Space: 1 GB free space for build output

## Quick Start

### 1. Clone or Download Repository

```bash
git clone https://github.com/rikaranzika/Eyetrack.git
cd Eyetrack
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- `electron` - The Electron framework
- `@electron/packager` - Tool for creating executables
- `electron-builder` - Alternative builder (optional)

### 3. Build the Executable

**For 64-bit Windows (recommended):**
```bash
npm run package-win
```

**For 32-bit Windows:**
```bash
npm run package-win32
```

### 4. Locate the Build

The executable will be in:
- `dist/Eyetrack-win32-x64/Eyetrack.exe` (64-bit)
- `dist/Eyetrack-win32-ia32/Eyetrack.exe` (32-bit)

## Build Options

### Available Scripts

The `package.json` includes several build scripts:

#### Electron Packager (Recommended)

```bash
# 64-bit Windows executable
npm run package-win

# 32-bit Windows executable  
npm run package-win32
```

**Pros:**
- Works on Linux/macOS without Wine
- Fast build times
- Creates portable executables
- No installer needed

**Cons:**
- Manual distribution (no auto-updater)
- Larger download size (all files needed)

#### Electron Builder (Advanced)

```bash
# Build with installer (requires Wine on Linux/macOS)
npm run build-win        # 64-bit with NSIS installer
npm run build-win32      # 32-bit with NSIS installer
npm run build-win-portable  # Portable executable
npm run dist            # All configured targets
```

**Pros:**
- Creates installers (.exe setup)
- Auto-update support
- Code signing support
- Multiple output formats

**Cons:**
- Requires Wine on Linux/macOS
- Slower build times
- More complex configuration

### Build Configuration

The build configuration is in `package.json`:

```json
{
  "build": {
    "appId": "com.rikaranzika.eyetrack",
    "productName": "Eye Tracking Controller",
    "win": {
      "target": ["nsis", "portable"]
    },
    "directories": {
      "output": "dist"
    }
  }
}
```

## Distribution

### Creating a Distributable Package

#### Option 1: ZIP Archive (Recommended)

```bash
# On Windows (PowerShell)
Compress-Archive -Path dist/Eyetrack-win32-x64 -DestinationPath Eyetrack-Windows-x64.zip

# On Linux/macOS
cd dist
zip -r Eyetrack-Windows-x64.zip Eyetrack-win32-x64/
```

#### Option 2: Self-Extracting Archive

Use tools like 7-Zip or WinRAR to create a self-extracting archive (.exe).

#### Option 3: Installer (Advanced)

Use `npm run build-win` with electron-builder to create an NSIS installer.

### What to Include

When distributing, ensure users receive:
- ✅ The entire `Eyetrack-win32-x64` folder
- ✅ Instructions for first-time use
- ✅ System requirements information
- ⚠️ Warning about camera permissions

### User Installation Instructions

Create a README for users:

```
EYE TRACKING CONTROLLER - WINDOWS

SYSTEM REQUIREMENTS:
- Windows 7 or later (64-bit)
- Functional webcam
- Internet connection (first run only)

INSTALLATION:
1. Extract all files from the ZIP archive
2. Keep all files in the same folder
3. Double-click "Eyetrack.exe" to run

FIRST RUN:
1. The application will open in a window
2. Click "Start Tracking"
3. Allow camera access when prompted
4. Follow on-screen instructions

NO INSTALLATION REQUIRED!
You can run this application from any folder,
including USB drives or external storage.
```

## Advanced Configuration

### Adding a Custom Icon

1. Create an icon file named `icon.ico` with multiple sizes:
   - 256×256, 128×128, 64×64, 48×48, 32×32, 16×16 pixels

2. Place it in the `build/` directory

3. Update `package.json` scripts to include icon:
   ```json
   "package-win": "electron-packager . Eyetrack --platform=win32 --arch=x64 --out=dist --overwrite --icon=build/icon.ico --asar"
   ```

### Customizing Application Metadata

Edit `package.json`:

```json
{
  "name": "eyetrack",
  "version": "1.0.0",
  "description": "Eye tracking application",
  "author": "Your Name",
  "build": {
    "appId": "com.yourcompany.eyetrack",
    "productName": "Your App Name",
    "copyright": "Copyright © 2025 Your Name"
  }
}
```

### Reducing Package Size

The build process already includes optimization:
- ✅ ASAR archive compression
- ✅ Excluded development files
- ✅ Tree-shaking of dependencies

Additional optimization (advanced):
1. Remove unused Electron features
2. Use custom Electron build
3. Exclude language files not needed

### Code Signing (Windows Only)

For production distribution:

1. Obtain a code signing certificate
2. Configure electron-builder:
   ```json
   "win": {
     "certificateFile": "path/to/cert.pfx",
     "certificatePassword": "your-password"
   }
   ```
3. Use `npm run build-win` instead of `package-win`

## Troubleshooting

### Build Issues

**Problem:** `npm install` fails
```
Solution: Update Node.js to latest LTS version
Check: node --version (should be 14.x or higher)
```

**Problem:** "Cannot find module 'electron'"
```
Solution: Delete node_modules and reinstall
Commands:
  rm -rf node_modules package-lock.json
  npm install
```

**Problem:** "Wine not found" error on Linux/macOS
```
Solution: This is a warning for advanced features
- Basic packaging works without Wine
- To fix: Install Wine via your package manager
  Ubuntu/Debian: sudo apt install wine
  macOS: brew install wine-stable
```

### Runtime Issues

**Problem:** Antivirus blocks the executable
```
Solution: 
1. Add exception in antivirus software
2. Use code signing (production only)
3. Submit to antivirus vendors for whitelisting
```

**Problem:** Application won't start
```
Solution:
1. Ensure all files are extracted together
2. Try running as Administrator
3. Check Windows Event Viewer for errors
4. Verify Windows version compatibility
```

**Problem:** Blank window or crash on startup
```
Solution:
1. Update graphics drivers
2. Disable hardware acceleration in main.js:
   webPreferences: { disableHardwareAcceleration: true }
3. Check console logs (uncomment DevTools in main.js)
```

### Debugging

Enable Developer Tools for debugging:

Edit `main.js`:
```javascript
// Uncomment this line
mainWindow.webContents.openDevTools();
```

Then rebuild and check the console for errors.

## Performance Considerations

### Build Performance
- First build: 2-5 minutes (downloads Electron)
- Subsequent builds: 30-60 seconds
- Parallel builds: Use separate output directories

### Runtime Performance
- Startup time: 2-5 seconds
- Memory usage: 200-400 MB
- CPU usage: 10-30% (during face tracking)
- Disk space: 326 MB installed

## Version Management

### Updating Electron

```bash
# Check current version
npm list electron

# Update to latest
npm install --save-dev electron@latest

# Update to specific version
npm install --save-dev electron@39.2.7
```

After updating, rebuild:
```bash
npm run package-win
```

### Semantic Versioning

Update `package.json`:
```json
{
  "version": "1.0.0"  // Major.Minor.Patch
}
```

This version appears in:
- Application title bar
- About dialog
- Installer (if using electron-builder)

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build Windows Executable

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run package-win
      - uses: actions/upload-artifact@v3
        with:
          name: Eyetrack-Windows
          path: dist/Eyetrack-win32-x64/
```

## Additional Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [@electron/packager on GitHub](https://github.com/electron/packager)
- [electron-builder Documentation](https://www.electron.build/)
- [Electron API Demos](https://github.com/electron/electron-api-demos)

## Support

For issues specific to:
- **Application bugs:** Open an issue on GitHub
- **Build problems:** Check Troubleshooting section above
- **Electron issues:** See Electron documentation
- **Windows compatibility:** Check system requirements

## License

This build process and documentation are part of the Eye Tracking Controller project.
See LICENSE file for details.
