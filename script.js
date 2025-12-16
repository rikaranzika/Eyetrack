// Eye Tracking Controller - Main Application Script
// This application uses MediaPipe FaceMesh for eye tracking

class EyeTrackingController {
    constructor() {
        // DOM elements
        this.videoElement = document.getElementById('videoElement');
        this.canvasElement = document.getElementById('canvasElement');
        this.canvasCtx = this.canvasElement.getContext('2d');
        this.videoOverlay = document.getElementById('videoOverlay');
        
        // Status elements
        this.trackingStatus = document.getElementById('trackingStatus');
        this.lastAction = document.getElementById('lastAction');
        this.fpsDisplay = document.getElementById('fpsDisplay');
        
        // Control buttons
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        
        // Settings
        this.enableClicksCheckbox = document.getElementById('enableClicks');
        this.debugModeCheckbox = document.getElementById('debugMode');
        this.scrollSpeedSlider = document.getElementById('scrollSpeed');
        this.scrollSpeedValue = document.getElementById('scrollSpeedValue');
        this.blinkDurationSlider = document.getElementById('blinkDuration');
        this.blinkDurationValue = document.getElementById('blinkDurationValue');
        this.scrollThresholdSlider = document.getElementById('scrollThreshold');
        this.scrollThresholdValue = document.getElementById('scrollThresholdValue');
        
        // State
        this.isTracking = false;
        this.faceMesh = null;
        this.camera = null;
        
        // Settings values
        this.settings = {
            enableClicks: true,
            debugMode: false,
            scrollSpeed: 5,
            blinkDuration: 200,
            scrollThreshold: 0.02
        };
        
        // Eye tracking state
        this.eyeState = {
            leftEyeOpen: true,
            rightEyeOpen: true,
            leftEyeClosedTime: 0,
            rightEyeClosedTime: 0,
            gazeDirection: 'center',
            lastScrollTime: 0
        };
        
        // FPS calculation
        this.fpsData = {
            lastTime: Date.now(),
            frames: 0,
            fps: 0
        };
        
        // Eye landmark indices for MediaPipe FaceMesh
        this.LEFT_EYE_INDICES = [33, 160, 158, 133, 153, 144];
        this.RIGHT_EYE_INDICES = [362, 385, 387, 263, 373, 380];
        this.LEFT_EYE_UPPER = [159, 145];
        this.LEFT_EYE_LOWER = [23, 27];
        this.RIGHT_EYE_UPPER = [386, 374];
        this.RIGHT_EYE_LOWER = [253, 257];
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Control buttons
        this.startBtn.addEventListener('click', () => this.startTracking());
        this.stopBtn.addEventListener('click', () => this.stopTracking());
        
        // Settings
        this.enableClicksCheckbox.addEventListener('change', (e) => {
            this.settings.enableClicks = e.target.checked;
        });
        
        this.debugModeCheckbox.addEventListener('change', (e) => {
            this.settings.debugMode = e.target.checked;
        });
        
        this.scrollSpeedSlider.addEventListener('input', (e) => {
            this.settings.scrollSpeed = parseInt(e.target.value);
            this.scrollSpeedValue.textContent = e.target.value;
        });
        
        this.blinkDurationSlider.addEventListener('input', (e) => {
            this.settings.blinkDuration = parseInt(e.target.value);
            this.blinkDurationValue.textContent = e.target.value;
        });
        
        this.scrollThresholdSlider.addEventListener('input', (e) => {
            this.settings.scrollThreshold = parseFloat(e.target.value);
            this.scrollThresholdValue.textContent = e.target.value;
        });
    }
    
    async startTracking() {
        try {
            this.updateStatus('Initializing...', 'Initializing');
            
            // Initialize MediaPipe FaceMesh
            await this.initializeFaceMesh();
            
            // Start camera
            await this.initializeCamera();
            
            this.isTracking = true;
            this.startBtn.disabled = true;
            this.stopBtn.disabled = false;
            this.updateStatus('Active', 'Tracking started');
            this.trackingStatus.classList.add('active');
            this.videoOverlay.classList.add('hidden');
            
        } catch (error) {
            console.error('Error starting tracking:', error);
            this.updateStatus('Error', 'Failed to start: ' + error.message);
            alert('Failed to start eye tracking: ' + error.message);
        }
    }
    
    stopTracking() {
        this.isTracking = false;
        
        if (this.camera) {
            this.camera.stop();
            this.camera = null;
        }
        
        // Stop video stream
        if (this.videoElement.srcObject) {
            this.videoElement.srcObject.getTracks().forEach(track => track.stop());
            this.videoElement.srcObject = null;
        }
        
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.updateStatus('Stopped', 'Tracking stopped');
        this.trackingStatus.classList.remove('active');
        this.videoOverlay.classList.remove('hidden');
        
        // Clear canvas
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
    
    async initializeFaceMesh() {
        this.faceMesh = new FaceMesh({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            }
        });
        
        this.faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        
        this.faceMesh.onResults((results) => this.onResults(results));
    }
    
    async initializeCamera() {
        this.camera = new Camera(this.videoElement, {
            onFrame: async () => {
                if (this.isTracking && this.faceMesh) {
                    await this.faceMesh.send({ image: this.videoElement });
                }
            },
            width: 640,
            height: 480
        });
        
        await this.camera.start();
    }
    
    onResults(results) {
        if (!this.isTracking) return;
        
        // Update FPS
        this.updateFPS();
        
        // Set canvas size to match video
        this.canvasElement.width = this.videoElement.videoWidth;
        this.canvasElement.height = this.videoElement.videoHeight;
        
        // Clear canvas
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        
        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const landmarks = results.multiFaceLandmarks[0];
            
            // Draw debug visualization if enabled
            if (this.settings.debugMode) {
                this.drawFaceMesh(landmarks);
            }
            
            // Process eye tracking
            this.processEyeTracking(landmarks);
        }
    }
    
    drawFaceMesh(landmarks) {
        this.canvasCtx.save();
        
        // Draw face mesh points
        this.canvasCtx.fillStyle = '#00FF00';
        for (const landmark of landmarks) {
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(
                landmark.x * this.canvasElement.width,
                landmark.y * this.canvasElement.height,
                2, 0, 2 * Math.PI
            );
            this.canvasCtx.fill();
        }
        
        // Highlight eyes
        this.canvasCtx.strokeStyle = '#FF0000';
        this.canvasCtx.lineWidth = 2;
        
        // Draw left eye
        this.drawEyeOutline(landmarks, this.LEFT_EYE_INDICES);
        
        // Draw right eye
        this.drawEyeOutline(landmarks, this.RIGHT_EYE_INDICES);
        
        this.canvasCtx.restore();
    }
    
    drawEyeOutline(landmarks, indices) {
        this.canvasCtx.beginPath();
        for (let i = 0; i < indices.length; i++) {
            const landmark = landmarks[indices[i]];
            const x = landmark.x * this.canvasElement.width;
            const y = landmark.y * this.canvasElement.height;
            
            if (i === 0) {
                this.canvasCtx.moveTo(x, y);
            } else {
                this.canvasCtx.lineTo(x, y);
            }
        }
        this.canvasCtx.closePath();
        this.canvasCtx.stroke();
    }
    
    processEyeTracking(landmarks) {
        // Calculate Eye Aspect Ratio (EAR) for blink detection
        const leftEAR = this.calculateEAR(landmarks, this.LEFT_EYE_UPPER, this.LEFT_EYE_LOWER);
        const rightEAR = this.calculateEAR(landmarks, this.RIGHT_EYE_UPPER, this.RIGHT_EYE_LOWER);
        
        // Threshold for detecting closed eye (lower EAR means eye is more closed)
        const EAR_THRESHOLD = 0.18;
        
        const leftEyeClosed = leftEAR < EAR_THRESHOLD;
        const rightEyeClosed = rightEAR < EAR_THRESHOLD;
        
        // Detect blinks
        this.detectBlinks(leftEyeClosed, rightEyeClosed);
        
        // Detect gaze direction for scrolling
        this.detectGazeDirection(landmarks);
    }
    
    calculateEAR(landmarks, upperIndices, lowerIndices) {
        // Eye Aspect Ratio = vertical distance / horizontal distance
        let verticalDist = 0;
        for (let i = 0; i < upperIndices.length; i++) {
            const upper = landmarks[upperIndices[i]];
            const lower = landmarks[lowerIndices[i]];
            verticalDist += Math.sqrt(
                Math.pow(upper.x - lower.x, 2) + 
                Math.pow(upper.y - lower.y, 2)
            );
        }
        verticalDist /= upperIndices.length;
        
        // Use first and last points for horizontal distance
        const left = landmarks[upperIndices[0]];
        const right = landmarks[upperIndices[upperIndices.length - 1]];
        const horizontalDist = Math.sqrt(
            Math.pow(left.x - right.x, 2) + 
            Math.pow(left.y - right.y, 2)
        );
        
        return verticalDist / horizontalDist;
    }
    
    detectBlinks(leftEyeClosed, rightEyeClosed) {
        const now = Date.now();
        
        // Track left eye blink
        if (leftEyeClosed && this.eyeState.leftEyeOpen) {
            this.eyeState.leftEyeOpen = false;
            this.eyeState.leftEyeClosedTime = now;
        } else if (!leftEyeClosed && !this.eyeState.leftEyeOpen) {
            const blinkDuration = now - this.eyeState.leftEyeClosedTime;
            if (blinkDuration >= this.settings.blinkDuration && blinkDuration < 1000) {
                this.handleLeftClick();
            }
            this.eyeState.leftEyeOpen = true;
        }
        
        // Track right eye blink
        if (rightEyeClosed && this.eyeState.rightEyeOpen) {
            this.eyeState.rightEyeOpen = false;
            this.eyeState.rightEyeClosedTime = now;
        } else if (!rightEyeClosed && !this.eyeState.rightEyeOpen) {
            const blinkDuration = now - this.eyeState.rightEyeClosedTime;
            if (blinkDuration >= this.settings.blinkDuration && blinkDuration < 1000) {
                this.handleRightClick();
            }
            this.eyeState.rightEyeOpen = true;
        }
    }
    
    detectGazeDirection(landmarks) {
        // Use nose tip and forehead to determine head tilt/gaze direction
        const noseTip = landmarks[1]; // Nose tip
        const foreheadCenter = landmarks[10]; // Forehead center
        
        // Calculate vertical position relative to face
        const verticalPosition = noseTip.y - foreheadCenter.y;
        
        const now = Date.now();
        const timeSinceLastScroll = now - this.eyeState.lastScrollTime;
        
        // Only scroll if enough time has passed (throttle scrolling)
        if (timeSinceLastScroll < 50) return;
        
        // Detect looking up (head tilted back)
        if (verticalPosition < -this.settings.scrollThreshold) {
            this.handleScroll('up');
            this.eyeState.lastScrollTime = now;
            this.eyeState.gazeDirection = 'up';
        }
        // Detect looking down (head tilted forward)
        else if (verticalPosition > this.settings.scrollThreshold) {
            this.handleScroll('down');
            this.eyeState.lastScrollTime = now;
            this.eyeState.gazeDirection = 'down';
        } else {
            this.eyeState.gazeDirection = 'center';
        }
    }
    
    handleScroll(direction) {
        const scrollAmount = direction === 'up' ? -this.settings.scrollSpeed : this.settings.scrollSpeed;
        window.scrollBy(0, scrollAmount);
        
        const action = direction === 'up' ? 'Scrolling Up ⬆️' : 'Scrolling Down ⬇️';
        this.updateStatus(null, action);
    }
    
    handleLeftClick() {
        if (!this.settings.enableClicks) return;
        
        this.updateStatus(null, 'Left Click 👆');
        this.showActionIndicator('Left Click 🖱️');
        
        // Simulate click at the center of the viewport
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: window.innerWidth / 2,
            clientY: window.innerHeight / 2
        });
        
        // Get element at center and dispatch click
        const element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        if (element && element !== this.canvasElement) {
            element.dispatchEvent(clickEvent);
        }
    }
    
    handleRightClick() {
        if (!this.settings.enableClicks) return;
        
        this.updateStatus(null, 'Right Click 👆');
        this.showActionIndicator('Right Click 🖱️');
        
        // Simulate right click (contextmenu) at the center of the viewport
        const clickEvent = new MouseEvent('contextmenu', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: window.innerWidth / 2,
            clientY: window.innerHeight / 2
        });
        
        // Get element at center and dispatch click
        const element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        if (element && element !== this.canvasElement) {
            element.dispatchEvent(clickEvent);
        }
    }
    
    updateStatus(trackingStatus, lastAction) {
        if (trackingStatus) {
            this.trackingStatus.textContent = trackingStatus;
        }
        if (lastAction) {
            this.lastAction.textContent = lastAction;
        }
    }
    
    showActionIndicator(message) {
        // Create indicator element
        const indicator = document.createElement('div');
        indicator.className = 'action-indicator';
        indicator.textContent = message;
        document.body.appendChild(indicator);
        
        // Remove after animation
        setTimeout(() => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(indicator);
            }, 300);
        }, 800);
    }
    
    updateFPS() {
        this.fpsData.frames++;
        const now = Date.now();
        const elapsed = now - this.fpsData.lastTime;
        
        if (elapsed >= 1000) {
            this.fpsData.fps = Math.round((this.fpsData.frames * 1000) / elapsed);
            this.fpsDisplay.textContent = this.fpsData.fps;
            this.fpsData.frames = 0;
            this.fpsData.lastTime = now;
        }
    }
}

// Initialize the application when the page loads
let eyeTracker;

window.addEventListener('DOMContentLoaded', () => {
    eyeTracker = new EyeTrackingController();
    console.log('Eye Tracking Controller initialized');
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (eyeTracker && eyeTracker.isTracking) {
        eyeTracker.stopTracking();
    }
});
