// Eye Tracking Application
class EyeTrackApp {
    constructor() {
        this.isTracking = false;
        this.isCalibrated = false;
        this.gazeData = null;
        this.scrollThreshold = 0.15; // 15% from top/bottom
        this.scrollSpeed = 5;
        this.blinkCount = 0;
        this.lastBlinkTime = 0;
        this.blinkThreshold = 300; // ms between blinks for click
        this.eyeClosedThreshold = 0.2; // Threshold for detecting closed eye
        this.lastEyeState = { left: true, right: true }; // true = open
        this.consecutiveBlinks = 0;
        this.lastGazeY = null;
        
        this.initElements();
        this.initEventListeners();
    }

    initElements() {
        // Buttons
        this.startBtn = document.getElementById('start-btn');
        this.calibrateBtn = document.getElementById('calibrate-btn');
        this.stopBtn = document.getElementById('stop-btn');
        
        // Settings
        this.autoScrollCheck = document.getElementById('auto-scroll');
        this.blinkClickCheck = document.getElementById('blink-click');
        this.scrollSensitivity = document.getElementById('scroll-sensitivity');
        this.sensitivityValue = document.getElementById('sensitivity-value');
        
        // Status
        this.statusDiv = document.getElementById('status');
        this.statusText = document.getElementById('status-text');
        
        // Debug
        this.gazePosSpan = document.getElementById('gaze-pos');
        this.scrollInfoSpan = document.getElementById('scroll-info');
        this.blinkCountSpan = document.getElementById('blink-count');
        
        // Calibration
        this.calibrationOverlay = document.getElementById('calibration-overlay');
        this.calibrationPoints = document.querySelectorAll('.calibration-point');
        this.skipCalibrationBtn = document.getElementById('skip-calibration');
        
        // Gaze indicator
        this.gazeDot = document.getElementById('gaze-dot');
    }

    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.calibrateBtn.addEventListener('click', () => this.startCalibration());
        this.stopBtn.addEventListener('click', () => this.stop());
        
        this.scrollSensitivity.addEventListener('input', (e) => {
            this.scrollSpeed = parseInt(e.target.value);
            this.sensitivityValue.textContent = this.scrollSpeed;
        });
        
        this.skipCalibrationBtn.addEventListener('click', () => {
            this.calibrationOverlay.classList.add('hidden');
            this.isCalibrated = true;
        });
        
        // Calibration points
        this.calibrationPoints.forEach(point => {
            point.addEventListener('click', (e) => this.handleCalibrationClick(e));
        });
    }

    async start() {
        try {
            this.updateStatus('Démarrage du suivi oculaire...', false);
            this.startBtn.disabled = true;
            
            // Initialize WebGazer
            await this.initWebGazer();
            
            this.isTracking = true;
            this.startBtn.disabled = true;
            this.calibrateBtn.disabled = false;
            this.stopBtn.disabled = false;
            
            this.updateStatus('Suivi actif', true);
            
            // Show calibration after a short delay
            setTimeout(() => {
                if (this.isTracking && !this.isCalibrated) {
                    this.startCalibration();
                }
            }, 1000);
            
        } catch (error) {
            console.error('Error starting eye tracking:', error);
            this.updateStatus('Erreur: ' + error.message, false, true);
            this.startBtn.disabled = false;
        }
    }

    async initWebGazer() {
        return new Promise((resolve, reject) => {
            // Check if WebGazer is available
            if (typeof webgazer === 'undefined') {
                reject(new Error('WebGazer.js n\'est pas chargé. Veuillez vérifier votre connexion internet et désactiver les bloqueurs de contenu.'));
                return;
            }
            
            webgazer.setGazeListener((data, timestamp) => {
                if (data == null) return;
                
                this.gazeData = data;
                this.handleGazeData(data);
            })
            .showVideoPreview(true)
            .showPredictionPoints(false)
            .applyKalmanFilter(true)
            .begin()
            .then(() => {
                // Wait for WebGazer to be ready
                setTimeout(() => resolve(), 500);
            })
            .catch(err => {
                reject(new Error('Impossible d\'accéder à la caméra. Veuillez autoriser l\'accès.'));
            });
        });
    }

    handleGazeData(data) {
        const x = data.x;
        const y = data.y;
        
        // Update debug info
        this.gazePosSpan.textContent = `(${Math.round(x)}, ${Math.round(y)})`;
        
        // Update gaze dot position
        if (!this.calibrationOverlay.classList.contains('hidden')) {
            this.gazeDot.style.left = `${x}px`;
            this.gazeDot.style.top = `${y}px`;
            this.gazeDot.classList.remove('hidden');
        } else {
            this.gazeDot.classList.add('hidden');
        }
        
        // Auto-scroll based on gaze position
        if (this.autoScrollCheck.checked) {
            this.handleAutoScroll(y);
        }
        
        // Blink detection
        if (this.blinkClickCheck.checked) {
            this.detectBlink();
        }
    }

    handleAutoScroll(gazeY) {
        const windowHeight = window.innerHeight;
        const topThreshold = windowHeight * this.scrollThreshold;
        const bottomThreshold = windowHeight * (1 - this.scrollThreshold);
        
        let scrollInfo = 'Aucun';
        
        if (gazeY < topThreshold) {
            // Scroll up
            const intensity = 1 - (gazeY / topThreshold);
            const scrollAmount = -this.scrollSpeed * intensity;
            window.scrollBy(0, scrollAmount);
            scrollInfo = `⬆️ Haut (${Math.round(intensity * 100)}%)`;
        } else if (gazeY > bottomThreshold) {
            // Scroll down
            const intensity = (gazeY - bottomThreshold) / (windowHeight - bottomThreshold);
            const scrollAmount = this.scrollSpeed * intensity;
            window.scrollBy(0, scrollAmount);
            scrollInfo = `⬇️ Bas (${Math.round(intensity * 100)}%)`;
        }
        
        this.scrollInfoSpan.textContent = scrollInfo;
    }

    detectBlink() {
        // Simple blink detection using gaze prediction confidence
        // When eyes blink, WebGazer may lose tracking temporarily
        
        const now = Date.now();
        
        // If no gaze data for a short period, might be a blink
        if (this.gazeData == null) {
            if (now - this.lastBlinkTime > this.blinkThreshold && 
                now - this.lastBlinkTime < 2000) {
                this.handleBlink();
            }
        }
        
        // Alternative: detect based on rapid Y-position changes
        if (this.gazeData && this.lastGazeY != null) {
            const yDiff = Math.abs(this.gazeData.y - this.lastGazeY);
            
            // Large sudden changes might indicate a blink
            if (yDiff > 100 && now - this.lastBlinkTime > this.blinkThreshold) {
                this.handleBlink();
            }
        }
        
        if (this.gazeData) {
            this.lastGazeY = this.gazeData.y;
        }
    }

    handleBlink() {
        const now = Date.now();
        this.lastBlinkTime = now;
        this.blinkCount++;
        this.blinkCountSpan.textContent = this.blinkCount;
        
        // Simulate click at current gaze position
        if (this.gazeData) {
            this.simulateClick(this.gazeData.x, this.gazeData.y);
        }
    }

    simulateClick(x, y) {
        // Find element at gaze position
        const element = document.elementFromPoint(x, y);
        
        if (element && element !== this.gazeDot) {
            console.log('Simulating click at:', x, y, 'on element:', element);
            
            // Create and dispatch click event
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: x,
                clientY: y
            });
            
            element.dispatchEvent(clickEvent);
            
            // Visual feedback
            this.showClickFeedback(x, y);
        }
    }

    showClickFeedback(x, y) {
        const feedback = document.createElement('div');
        feedback.style.position = 'fixed';
        feedback.style.left = `${x}px`;
        feedback.style.top = `${y}px`;
        feedback.style.width = '30px';
        feedback.style.height = '30px';
        feedback.style.borderRadius = '50%';
        feedback.style.border = '3px solid #28a745';
        feedback.style.transform = 'translate(-50%, -50%)';
        feedback.style.pointerEvents = 'none';
        feedback.style.zIndex = '10000';
        feedback.style.animation = 'clickPulse 0.5s ease-out';
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 500);
        
        // Add CSS animation if not exists
        if (!document.getElementById('click-animation-style')) {
            const style = document.createElement('style');
            style.id = 'click-animation-style';
            style.textContent = `
                @keyframes clickPulse {
                    0% {
                        transform: translate(-50%, -50%) scale(0.5);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    startCalibration() {
        this.calibrationOverlay.classList.remove('hidden');
        this.gazeDot.classList.remove('hidden');
        
        // Reset calibration points
        this.calibrationPoints.forEach(point => {
            point.classList.remove('clicked');
        });
    }

    handleCalibrationClick(e) {
        const point = e.target;
        point.classList.add('clicked');
        
        // Check if all points are clicked
        const allClicked = Array.from(this.calibrationPoints).every(p => 
            p.classList.contains('clicked')
        );
        
        if (allClicked) {
            setTimeout(() => {
                this.calibrationOverlay.classList.add('hidden');
                this.isCalibrated = true;
                this.gazeDot.classList.add('hidden');
            }, 500);
        }
    }

    stop() {
        if (typeof webgazer !== 'undefined' && webgazer.isReady && webgazer.isReady()) {
            webgazer.end();
        }
        
        this.isTracking = false;
        this.startBtn.disabled = false;
        this.calibrateBtn.disabled = true;
        this.stopBtn.disabled = true;
        
        this.updateStatus('Arrêté', false);
        this.gazeDot.classList.add('hidden');
        
        // Reset debug info
        this.gazePosSpan.textContent = '-';
        this.scrollInfoSpan.textContent = '-';
    }

    updateStatus(text, active = false, error = false) {
        this.statusText.textContent = text;
        this.statusDiv.classList.remove('active', 'error');
        
        if (active) {
            this.statusDiv.classList.add('active');
        } else if (error) {
            this.statusDiv.classList.add('error');
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new EyeTrackApp();
    
    // Store globally for debugging
    window.eyeTrackApp = app;
    
    console.log('Eyetrack application initialized');
});
