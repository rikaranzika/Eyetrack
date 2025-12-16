# Building and Using the Windows Executable

## For End Users

### Using the Pre-built Executable

1. **Download the distribution package**
   - Extract the ZIP file to any location on your computer
   - The folder will be named `Eyetrack-win32-x64`

2. **Run the application**
   - Double-click `Eyetrack.exe` to start
   - Allow camera access when prompted
   - Click "Start Tracking" to begin

3. **Important Notes**
   - Keep ALL files in the folder together
   - The entire folder (~327 MB) must stay intact
   - No installation required
   - Internet connection needed for first run (to load MediaPipe library)

### System Requirements

- Windows 7 or later (64-bit)
- Working webcam
- Internet connection (for MediaPipe CDN)
- Minimum 4GB RAM recommended

### New Features

- ✅ **Resizable Window**: The application window can now be resized to fit your screen
- ✅ **Minimum Window Size**: Window won't resize smaller than 800x600 pixels
- ✅ **Better User Experience**: Adjust the window size to see all controls comfortably

---

## For Developers

### Building the Windows Executable

#### Prerequisites

```bash
# Install Node.js 14.x or higher
# Then install dependencies
npm install
```

#### Build Commands

**Build 64-bit Windows executable (Recommended):**
```bash
npm run package-win
```

**Build 32-bit Windows executable:**
```bash
npm run package-win32
```

**Build with electron-builder (creates installer):**
```bash
npm run build-win          # 64-bit installer
npm run build-win32        # 32-bit installer
npm run build-win-portable # Portable version
```

#### Build Output

The executable will be created in the `dist/` folder:
- **Location:** `dist/Eyetrack-win32-x64/` (for 64-bit)
- **Executable:** `Eyetrack.exe`
- **Size:** ~327 MB (includes Chromium and all dependencies)
- **Files:** The entire folder must be distributed together

#### What's Included

The packaged application includes:
- ✅ Electron runtime (Chromium browser engine)
- ✅ Node.js runtime
- ✅ All application files (HTML, CSS, JavaScript)
- ✅ All required system libraries
- ✅ Resizable window with minimum dimensions (800x600)

### Distribution

To distribute the application:

1. **Create a ZIP file:**
   ```bash
   cd dist
   zip -r Eyetrack-Windows-x64.zip Eyetrack-win32-x64/
   ```

2. **Upload to GitHub Releases** or share the ZIP file directly

3. **Provide user instructions** (see README-DISTRIBUTION.txt in the dist folder)

### Building on Different Platforms

- **Windows:** No additional requirements
- **Linux/macOS:** Build works without Wine for basic executables
  - Wine is optional for advanced features (custom icons, version info)

### Troubleshooting

**Build fails:**
- Make sure `npm install` completed successfully
- Check that you have enough disk space (~500MB for build)
- Try deleting `node_modules` and running `npm install` again

**Executable doesn't run:**
- Verify all files in the folder are present
- Check Windows Defender or antivirus settings
- Try running as Administrator

### Notes

- The `dist/` folder is in `.gitignore` and should not be committed to the repository
- Executables are large (~327 MB) and should be distributed via GitHub Releases
- Users do NOT need Node.js, npm, or any development tools installed
- The application still requires internet connection to load MediaPipe from CDN

---

## Configuration

### Window Configuration (main.js)

The Electron window is configured with:
```javascript
{
  width: 1280,           // Default width
  height: 900,           // Default height
  minWidth: 800,         // Minimum width
  minHeight: 600,        // Minimum height
  resizable: true        // Window is resizable
}
```

Users can resize the window to fit their screen and preferences while maintaining a minimum usable size.
