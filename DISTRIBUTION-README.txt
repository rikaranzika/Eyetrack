# Eye Tracking Controller - Windows Standalone Edition

## Quick Start Guide

Welcome! This is the standalone Windows version of the Eye Tracking Controller. No installation required!

### System Requirements

- **Operating System:** Windows 7 or later (64-bit recommended)
- **Hardware:** Functional webcam
- **Internet:** Required for first run (to load face detection library)
- **Disk Space:** 350 MB
- **RAM:** 2 GB minimum

### How to Run

1. **Extract the files** from the ZIP archive to any folder
2. **Keep all files together** - don't separate them!
3. **Double-click** `Eyetrack.exe`
4. **Allow camera access** when Windows asks
5. **Click "Start Tracking"** in the application
6. **Follow the on-screen instructions**

### First-Time Setup

When you run the application for the first time:

1. **Windows SmartScreen** might show a warning
   - Click "More info" → "Run anyway"
   - This is normal for unsigned applications

2. **Antivirus warning** might appear
   - The application is safe - it only accesses your camera
   - Add an exception if needed

3. **Camera permission** will be requested
   - Click "Allow" to enable eye tracking
   - You can revoke this permission anytime

### How to Use

Once the application is running:

- **👀 Look Up/Down** → Page scrolls automatically
- **👁️ Blink Left Eye** → Left mouse click
- **👁️ Blink Right Eye** → Right mouse click
- **⚙️ Adjust Settings** → Fine-tune sensitivity and speed

### Troubleshooting

**Application won't start:**
- Make sure all files from the ZIP are in the same folder
- Try running as Administrator (right-click → Run as administrator)
- Check that your Windows is up to date

**Camera not detected:**
- Check if other applications can use the camera
- Make sure camera drivers are installed
- Verify camera is not being used by another program

**Performance issues:**
- Close other applications to free up memory
- Reduce the scroll sensitivity in settings
- Ensure good lighting for better face detection

**Connection error:**
- The app needs internet connection on first run
- This downloads the face detection library (~5 MB)
- After the first run, it works offline (library is cached)

### Privacy & Security

✅ **Everything runs locally** on your computer  
✅ **No data is sent** to any server  
✅ **No video is recorded** or saved  
✅ **No tracking or analytics**  
✅ **You control camera access** at all times  

The only internet connection is to load the MediaPipe FaceMesh library from a CDN (Content Delivery Network) - this is a one-time download that gets cached.

### Portable Usage

This application is fully portable:
- ✅ Run from USB drives
- ✅ Run from external storage
- ✅ No registry modifications
- ✅ No system files installed
- ✅ Easy to uninstall (just delete the folder)

### Uninstalling

To remove the application:
1. Close the application
2. Delete the entire application folder
3. No registry cleanup needed!

### Features

- 👀 **Automatic Scrolling** - Look up/down to scroll web pages
- 🖱️ **Click Simulation** - Blink to click (left/right eye)
- ⚙️ **Configurable Settings** - Adjust scroll speed, sensitivity, and blink duration
- 🔒 **Privacy First** - All processing happens locally on your computer
- 🎯 **Real-time Performance** - ~30 FPS video processing
- 🎨 **Modern UI** - Clean, intuitive interface with live status updates

### Advanced Settings

You can customize the experience:

- **Scroll Speed:** How fast the page scrolls
- **Blink Duration:** Minimum time for detecting a blink
- **Scroll Sensitivity:** How far you need to look to trigger scrolling
- **Debug Mode:** Shows face mesh overlay for calibration

### Support

For help and support:
- **Documentation:** See the USAGE.md file for detailed instructions
- **Issues:** Report bugs at https://github.com/rikaranzika/Eyetrack/issues
- **Updates:** Check the repository for newer versions

### About

Eye Tracking Controller v1.0.0  
Developed by rikaranzika  
Built with Electron and MediaPipe FaceMesh

This application enables hands-free control of web pages using eye movements and blinks. It's designed for accessibility and ease of use.

### License

See LICENSE file for terms and conditions.

---

**Enjoy using Eye Tracking Controller! 👁️**

*Remember: Keep all files together and never separate the executable from its supporting files.*
