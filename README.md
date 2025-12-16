# Eye Tracking Controller 👁️

A browser-based eye tracking application that enables hands-free control of web pages using eye movements and blinks.

![Eye Tracking Controller](https://github.com/user-attachments/assets/8ec27ee3-39a6-4f0f-9e7c-ad9bcb1536a6)

## Features

- 👀 **Automatic Scrolling**: Look up/down to scroll web pages
- 🖱️ **Click Simulation**: Blink left eye for left click, right eye for right click
- ⚙️ **Configurable Settings**: Adjust scroll speed, blink duration, and sensitivity
- 🔒 **Privacy First**: All processing happens locally in your browser
- 🎯 **Real-time Performance**: ~30 FPS video processing
- 🎨 **Modern UI**: Clean, intuitive interface with live status updates

## Quick Start

### Option 1: Run as Desktop Application (Recommended)

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/rikaranzika/Eyetrack.git
   cd Eyetrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the Electron app**
   ```bash
   npm start
   ```

4. **Click "Start Tracking" and allow camera access**

### Option 2: Run in Browser

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/rikaranzika/Eyetrack.git
   cd Eyetrack
   ```

2. **Start a local web server**
   ```bash
   # Using Python 3
   python3 -m http.server 8080
   
   # Or using Python 2
   python -m SimpleHTTPServer 8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080/index.html
   ```

4. **Click "Start Tracking" and allow camera access**

## Usage

- **Scroll Up**: Tilt your head slightly backward
- **Scroll Down**: Tilt your head slightly forward  
- **Left Click**: Blink your left eye
- **Right Click**: Blink your right eye

For detailed instructions, see [USAGE.md](USAGE.md)

## Building Standalone Executable

You can package the application as a standalone Windows executable that users can run without installing Node.js or any dependencies.

### Prerequisites for Building

**For Development:**
- Node.js 14.x or higher
- npm (comes with Node.js)

**For Building on Linux/macOS:**
- The packaging will work without Wine for basic executables
- Wine is optional for advanced features (icons, version info)

**For Building on Windows:**
- No additional requirements

### Build Commands

#### Build for Windows (64-bit) - Recommended
```bash
npm install  # First time only
npm run package-win
```

#### Build for Windows (32-bit)
```bash
npm install  # First time only
npm run package-win32
```

### Build Output

The executable will be created in the `dist/` folder:
- **Location:** `dist/Eyetrack-win32-x64/` (for 64-bit) or `dist/Eyetrack-win32-ia32/` (for 32-bit)
- **Executable:** `Eyetrack.exe`
- **Size:** ~326 MB (includes Chromium engine and all dependencies)
- **Files:** The entire folder must be distributed together

### Distribution

To distribute the application to end users:

1. **Compress the folder:**
   ```bash
   # Create a ZIP file of the packaged application
   cd dist
   zip -r Eyetrack-Windows-x64.zip Eyetrack-win32-x64/
   ```

2. **Share the ZIP file** with your users

3. **User Instructions:**
   - Extract the ZIP file to any location
   - Double-click `Eyetrack.exe` to run the application
   - No installation required!
   - Allow camera access when prompted

### What's Included

The packaged application includes:
- ✅ Electron runtime (Chromium browser engine)
- ✅ Node.js runtime
- ✅ All application files (HTML, CSS, JavaScript)
- ✅ All required system libraries
- ✅ Everything needed to run standalone

### No Installation Required

Users do NOT need to:
- Install Node.js
- Install npm
- Run any commands
- Install dependencies
- Have internet connection (except for MediaPipe CDN)

**Note:** The application still requires internet connection to load the MediaPipe FaceMesh library from CDN. This is a one-time download that gets cached by the browser engine.

### Troubleshooting

**Build fails on Linux/macOS:**
- The basic build should work without Wine
- If you see Wine-related errors, they can be safely ignored for basic executables
- For advanced features (custom icons), install Wine using your package manager

**Application doesn't start:**
- Make sure all files in the folder stay together
- Check that Windows Defender or antivirus isn't blocking the executable
- Try running as Administrator if you encounter permission issues

## Requirements

### For Desktop Application
- Node.js 14.x or higher (for development only)
- Functional webcam
- Internet connection (to load MediaPipe library)

### For Browser Version
- Modern web browser (Chrome, Firefox, or Edge)
- Functional webcam
- Internet connection (to load MediaPipe library)

## Technologies

- JavaScript (ES6+)
- HTML5/CSS3
- MediaPipe FaceMesh for face landmark detection
- getUserMedia API for webcam access
- Electron.js for desktop packaging

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+

## Project Structure

```
Eyetrack/
├── index.html      # Main HTML structure
├── styles.css      # Application styling
├── script.js       # Core application logic
├── main.js         # Electron main process
├── package.json    # Node.js project configuration
├── .gitignore      # Git ignore file
├── USAGE.md        # Detailed usage guide
└── README.md       # This file
```

## Privacy & Security

- All processing is done locally on your machine (browser or desktop app)
- No video or images are uploaded to any server
- No data is stored or transmitted
- Camera access can be revoked at any time

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## Original Specification (French)

Cahier des Charges : Application de Détection du Regard pour Contrôle de Pages Web
Contexte du Projet
L'objectif est de développer une application fonctionnant dans les navigateurs web sur PC, qui utilise une caméra pour détecter les mouvements des yeux et propose les fonctionnalités suivantes :

Contrôle du défilement automatique d'une page web en fonction de la direction du regard.
Simulation des clics (gauche/droit) via les clignements des yeux.
Fournir une interface utilisateur simple pour démarrer/arrêter la détection et configurer les options essentielles.
Le projet vise à exploiter des solutions open-source et directement utilisables, sans nécessiter de matériel supplémentaire ou de dépendances complexes.

Objectifs Fonctionnels
Défilement Automatique :

La page web doit défiler automatiquement lorsque l'utilisateur regarde vers le haut ou vers le bas de l'écran.
La vitesse de défilement doit être constante et configurable.
Simulation de Clics :

Le clic gauche sera déclenché par un clignement de l'œil gauche.
Le clic droit sera déclenché par un clignement de l'œil droit.
Possibilité d’ajuster la "durée" minimale d’un clignement pour éviter les faux positifs.
Interface Utilisateur :

Boutons "Démarrer" et "Arrêter" pour activer/désactiver la détection de la caméra.
Zone d’affichage visible montrant l’état des actions (détection des mouvements, validation des clics, etc.).
Option supplémentaire pour activer/désactiver la simulation de clics.
Compatibilité et Accessibilité :

L'application doit fonctionner dans les navigateurs modernes (Chrome, Firefox, Edge).
Aucune installation de logiciel ou matériel tiers n’est nécessaire, à part une webcam fonctionnelle.
Fonctionnalités Étendues (Optionnelles)
Calibrage Automatique :

Au lancement, demander à l'utilisateur de regarder dans différentes zones de l’écran pour calibrer les points de référence (haut, bas, gauche, droite).
Détection Multizone :

Offrir un défilement latéral (gauche/droite) pour naviguer entre des onglets ou des sections web larges.
Personnalisation :

Permettre à l'utilisateur de configurer les commandes (ex. : clignement long pour "clic gauche", regarder à droite pour "scroll rapide", etc.).
Ajouter un curseur pour régler la sensibilité de la détection.
Mode "Pause" Automatique :

Si aucun mouvement des yeux ou clignement n'est détecté pendant un certain temps, arrêter temporairement les actions pour éviter les erreurs.
Mode Debug :

Afficher une visualisation des points détectés (mouvements des yeux et clignements) pour ajuster la précision.
Contraintes Techniques
Technologies Utilisées :

JavaScript, HTML, CSS pour l'ensemble des fonctionnalités.
Utilisation de bibliothèques open-source comme :
FaceMesh (MediaPipe) : Pour analyser les flux de caméra et détecter les points faciaux (œil gauche, œil droit).
TensorFlow.js : Pour le traitement d’intelligence artificielle lié au suivi et clignement des yeux.
Performance :

Le traitement doit être performant pour être exécuté en temps réel sans ralentissements significatifs sur les ordinateurs grand public.
Réduire l’utilisation du processeur et de la mémoire, particulièrement avec des flux vidéo.
Compatibilité :

Fonctionner proprement avec des navigateurs modernes.
Nécessite une webcam fonctionnelle.
Ergonomie :

Application minimaliste, facile à utiliser même pour des utilisateurs non techniques.
Aucune sauvegarde de données ou transmission de vidéos sur des serveurs (respect de la vie privée).
Architecture et Flots
Flux Principal :

Démarrage :
Activer la caméra via l’API getUserMedia et initialiser le modèle d’intelligence artificielle pour la détection des visages.
Décisions basées sur les données faciales :
Identifier si les yeux regardent vers une direction spécifique (haut, bas, gauche, droite).
Détecter des clignements pour simuler les clics.
Exécuter les actions :
Défilement de la page.
Déclenchement d'événements de clic.
Interface Utilisateur :

Zone de contrôle visible avec des états en temps réel ("Détection activée", "Clic gauche détecté", etc.).
Gestion de la Caméra :

Afficher un aperçu du flux vidéo réduit (en option pour la calibration visuelle).
Demander des permissions utilisateur pour accéder à la caméra, avec des notifications en cas de refus.
Visualisation des Points Faciaux (Mode Debug) :

Sur le flux vidéo, afficher des points indiquant la position des yeux, ainsi que la fermeture/détection des clignements.
Livrables du Projet
Prototype Fonctionnel :

Une application web pouvant être testée localement via un simple serveur (ou directement via un fichier HTML sur navigateur).
Structure des Fichiers :

index.html : Structure de l’interface utilisateur.
styles.css : Stylisation de l’interface.
script.js : Contient toute la logique JavaScript.
Dépendances (si nécessaires) :
Bibliothèques externes chargées via CDN (MediaPipe, TensorFlow.js).
Documentation :

Instructions pour lancer et utiliser l'application.
Explications sur les paramètres configurables.
Plan de Développement (Étapes)
Étape 1 : Mise en place de la caméra avec JavaScript

Capturer le flux vidéo à l’aide de getUserMedia et l’afficher dans une <video>.
Étape 2 : Intégration du modèle de détection faciale

Charger MediaPipe (ou TensorFlow.js).
Identifier les points clés des yeux (œil gauche, œil droit).
Étape 3 : Défilement basé sur le regard

Implémenter une fonction qui calcule la direction basée sur la position relative des yeux.
Déclencher le défilement avec window.scrollBy.
Étape 4 : Détection des clignements

Détecter les transitions entre "œil ouvert" et "œil fermé", et déclencher des clics.
Étape 5 : Création de l’interface utilisateur

Ajouter des boutons de contrôle (Démarrer/Arrêter, etc.).
Afficher des messages de statut.
Étape 6 : Test et optimisations

Tester sur plusieurs navigateurs et configurations matériels.
Optimiser la fluidité (éviter les surcharges CPU).
Contraintes Non Fonctionnelles
Performance : Temps réel (~30 fps pour la vidéo).
Vie privée : Aucun enregistrement ou envoi des flux vidéo.
Compatibilité : Fonctionner sans dépendances matérielles spécifiques.
