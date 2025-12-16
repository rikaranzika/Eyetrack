# Eye Tracking Controller - Usage Guide

## Overview
The Eye Tracking Controller is a web-based application that allows you to control your browser using eye movements and blinks. It uses your webcam and MediaPipe's FaceMesh library to detect facial landmarks and track eye movements in real-time.

## Features

### Core Functionality
- **Automatic Scrolling**: Scroll web pages by looking up or down
- **Click Simulation**: Perform clicks using eye blinks
  - Left eye blink = Left click
  - Right eye blink = Right click
- **Real-time Tracking**: Processes video at ~30 FPS for smooth interaction
- **Privacy First**: All processing happens locally in your browser - no data is sent to any server

### User Interface
- Start/Stop buttons to control eye tracking
- Live status display showing:
  - Tracking state (Active/Stopped)
  - Last detected action
  - Current FPS
- Configurable settings for personalization
- Visual instructions and controls

### Configurable Settings
1. **Enable Click Simulation**: Toggle click detection on/off
2. **Debug Mode**: Show face mesh overlay for calibration
3. **Scroll Speed**: Adjust how fast the page scrolls (1-20px)
4. **Blink Duration**: Minimum blink time to register as a click (100-500ms)
5. **Scroll Sensitivity**: Adjust how much head movement triggers scrolling (0.01-0.05)

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, or Edge recommended)
- A functional webcam
- Internet connection (for loading MediaPipe library from CDN)

### Running the Application

#### Option 1: Local HTTP Server (Recommended)
```bash
# Using Python 3
python3 -m http.server 8080

# Using Python 2
python -m SimpleHTTPServer 8080

# Using Node.js (if you have npx)
npx serve

# Using PHP
php -S localhost:8080
```

Then open your browser and navigate to:
```
http://localhost:8080/index.html
```

#### Option 2: Direct File Access
Some browsers allow opening HTML files directly:
```
file:///path/to/Eyetrack/index.html
```

**Note**: Camera access may not work with `file://` protocol in some browsers. HTTP server method is preferred.

### First Time Setup

1. **Grant Camera Permission**: When you click "Start Tracking", your browser will ask for camera permission. Click "Allow".

2. **Position Yourself**: Sit comfortably in front of your webcam with good lighting. Your face should be clearly visible.

3. **Calibrate Settings**: 
   - Start with default settings
   - Enable "Debug Mode" to see face mesh detection
   - Adjust "Scroll Sensitivity" if scrolling is too sensitive or not sensitive enough
   - Adjust "Blink Duration" if clicks are registering too easily or not at all

## How to Use

### Starting Eye Tracking
1. Click the **"Start Tracking"** button
2. Allow camera access when prompted
3. Wait for the camera feed to appear
4. The status will change to "Active"

### Scrolling
- **Look Up**: Tilt your head slightly backward to scroll up
- **Look Down**: Tilt your head slightly forward to scroll down
- The page will scroll automatically while you maintain the position
- Scroll speed can be adjusted in settings

### Clicking
- **Left Click**: Close your left eye for the configured blink duration (default 200ms)
- **Right Click**: Close your right eye for the configured blink duration
- Clicks are simulated at the center of the viewport
- You can disable click simulation in settings if you only want scrolling

### Stopping Eye Tracking
- Click the **"Stop Tracking"** button
- The camera will turn off and tracking will stop
- All settings are preserved

## Tips for Best Performance

### Optimal Setup
- **Lighting**: Ensure your face is well-lit. Avoid backlighting.
- **Camera Position**: Position the camera at eye level, about arm's length away
- **Background**: A plain background helps with face detection
- **Stability**: Keep your head relatively stable; small movements are enough for control

### Adjusting Settings
- **Scroll Speed**: Start low (3-5px) and increase if needed
- **Scroll Sensitivity**: 
  - Lower values (0.01-0.02): Requires more head movement, more stable
  - Higher values (0.03-0.05): More responsive but may trigger accidentally
- **Blink Duration**: 
  - Shorter (100-150ms): More responsive but may have false positives
  - Longer (200-300ms): More intentional, fewer accidents

### Troubleshooting
- **Face not detected**: Check lighting and camera position
- **Scrolling too sensitive**: Increase scroll sensitivity threshold
- **Blinks not registering**: Decrease blink duration or blink more deliberately
- **False blink detections**: Increase blink duration threshold
- **Low FPS**: Close other applications, ensure good lighting

## Technical Details

### Technologies Used
- **HTML5/CSS3**: User interface and styling
- **JavaScript (ES6+)**: Application logic
- **MediaPipe FaceMesh**: Face landmark detection
- **getUserMedia API**: Webcam access

### Browser Compatibility
Tested and working on:
- Google Chrome 90+
- Mozilla Firefox 88+
- Microsoft Edge 90+

### Performance
- Target FPS: 30 frames per second
- Processing: All done locally in browser
- Memory Usage: ~100-200MB depending on browser
- No server communication - complete privacy

### Face Landmark Detection
The application uses MediaPipe FaceMesh which detects 468 facial landmarks. Key landmarks used:
- **Left Eye**: Landmarks 33, 160, 158, 133, 153, 144
- **Right Eye**: Landmarks 362, 385, 387, 263, 373, 380
- **Nose/Forehead**: Used for gaze direction calculation

### Eye Aspect Ratio (EAR)
Blink detection uses the Eye Aspect Ratio formula:
```
EAR = (vertical distance) / (horizontal distance)
```
When EAR drops below 0.18, the eye is considered closed.

## Privacy and Security

- ✅ All processing happens in your browser
- ✅ No video or images are uploaded to any server
- ✅ No data is stored or transmitted
- ✅ Camera access can be revoked at any time
- ✅ Open source - you can verify the code

## Keyboard Shortcuts

Currently, the application doesn't have keyboard shortcuts, but you can control it entirely through the UI or eye tracking once started.

## Known Limitations

1. **Click Position**: Clicks are simulated at the center of the viewport, not at cursor position
2. **Head Movement**: Requires some head movement for scrolling (pure eye tracking without head movement is not implemented)
3. **Glasses**: Heavy frames or reflective lenses may affect detection
4. **Multiple Faces**: Only tracks one face at a time
5. **Internet Required**: Needs internet connection to load MediaPipe library (initial load only)

## Future Enhancements (Optional)

Potential features that could be added:
- Lateral scrolling (left/right)
- Automatic calibration wizard
- Cursor movement control
- Customizable gesture mapping
- Keyboard input simulation
- Multiple face support
- Offline mode with bundled libraries

## Support

For issues, questions, or contributions, please visit the GitHub repository.

## License

This project uses open-source libraries. Please check individual library licenses:
- MediaPipe: Apache License 2.0
