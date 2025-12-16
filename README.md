# Eyetrack 👁️

Application de contrôle par suivi oculaire permettant de contrôler votre ordinateur avec vos yeux.

## 🎯 Fonctionnalités

- **Défilement automatique** : Regardez vers le haut ou le bas de l'écran pour faire défiler automatiquement les pages web
- **Simulation de clics** : Clignez rapidement des yeux pour simuler des clics de souris
- **Calibration** : Système de calibration en 9 points pour améliorer la précision du suivi
- **Interface intuitive** : Panneau de contrôle avec paramètres réglables en temps réel
- **Visualisation en direct** : Aperçu de la webcam et indicateur de position du regard

## 🚀 Deux façons d'utiliser Eyetrack

### Option 1: Application de bureau (.exe) - **RECOMMANDÉ** 

✅ **Avantages:**
- Fonctionne sans connexion internet après installation
- Pas de problèmes de firewall ou de CDN bloqué
- Installation simple avec un double-clic
- Application native Windows avec icône dans la barre des tâches

📦 **Installation:**

1. **Télécharger Node.js** (si pas déjà installé)
   - Rendez-vous sur https://nodejs.org/
   - Téléchargez la version LTS (Long Term Support)
   - Installez-le (installation par défaut suffit)

2. **Préparer l'application**
   ```bash
   # Dans le dossier Eyetrack
   npm install
   ```
   ⏳ Cette étape prend 2-3 minutes et télécharge toutes les dépendances

3. **Créer l'exécutable Windows**
   ```bash
   npm run build
   ```
   ⏳ Cette étape prend 3-5 minutes et crée l'installateur

4. **Installer l'application**
   - Ouvrez le dossier `dist/`
   - Double-cliquez sur `Eyetrack Setup 1.0.0.exe`
   - Suivez l'assistant d'installation

5. **Lancer Eyetrack**
   - Depuis le raccourci sur le bureau
   - Ou depuis le menu Démarrer → Eyetrack

📖 **Guide complet:** Consultez [BUILD.md](BUILD.md) pour plus de détails

### Option 2: Application web (navigateur)

Cette option nécessite une connexion internet pour charger WebGazer.js depuis un CDN.

1. Ouvrez simplement le fichier `index.html` dans votre navigateur web moderne (Chrome, Firefox, Edge, Safari)
2. Cliquez sur "Démarrer le suivi" et autorisez l'accès à votre caméra
3. Suivez la calibration pour une meilleure précision
4. Commencez à contrôler votre navigateur avec vos yeux !

⚠️ **Note:** Si vous avez des problèmes de firewall ou que WebGazer.js ne se charge pas, utilisez l'Option 1 (.exe)

## 📋 Prérequis

### Pour l'application .exe
- Windows 10 ou supérieur
- Node.js 18+ (pour la compilation)
- Une webcam fonctionnelle
- Un bon éclairage pour une détection optimale

### Pour l'application web
- Un navigateur web moderne avec support de:
  - WebRTC (accès caméra)
  - JavaScript ES6+
  - MediaDevices API
- Connexion internet (pour charger WebGazer.js)
- Une webcam fonctionnelle
- Un bon éclairage pour une détection optimale

## 💡 Utilisation

### Démarrage

1. **Lancer l'application** : Cliquez sur "Démarrer le suivi"
2. **Autoriser la caméra** : Acceptez la demande d'accès à la caméra
3. **Calibration** : Cliquez sur chaque point bleu en le regardant directement
4. **Profiter** : Utilisez vos yeux pour contrôler le navigateur !

### Défilement automatique

- Regardez vers le **haut de l'écran** pour défiler vers le haut
- Regardez vers le **bas de l'écran** pour défiler vers le bas
- La vitesse de défilement dépend de la distance de votre regard par rapport au bord de l'écran
- Ajustez la sensibilité dans les paramètres

### Simulation de clics

- **Clignez rapidement** des yeux pour simuler un clic
- Le clic est simulé à la position actuelle de votre regard
- Un indicateur visuel apparaît lors de chaque clic détecté

### Paramètres

- **Défilement automatique** : Active/désactive le défilement par regard
- **Clic par clignement** : Active/désactive la simulation de clics
- **Sensibilité** : Ajuste la vitesse de défilement (1-10)

## 🔧 Technologies utilisées

- **Electron** : Framework pour créer l'application de bureau
- **HTML5/CSS3** : Structure et style de l'interface
- **JavaScript (Vanilla)** : Logique applicative
- **WebGazer.js** : Bibliothèque open-source de suivi oculaire
  - Basé sur TensorFlow.js pour l'apprentissage automatique
  - Fonctionne entièrement côté client (aucune donnée envoyée à un serveur)

## 📁 Structure du projet

```
Eyetrack/
├── main.js              # Point d'entrée Electron
├── index.html           # Page principale de l'application
├── styles.css           # Styles et mise en page
├── app.js               # Logique de l'application
├── package.json         # Configuration npm et Electron
├── test-scroll.html     # Page de test
├── assets/              # Icônes et ressources
├── README.md            # Cette documentation
├── BUILD.md             # Guide de compilation détaillé
└── DEPLOYMENT.md        # Guide de déploiement web
```

## 🔒 Confidentialité et sécurité

- **Aucune donnée envoyée** : Tout le traitement se fait localement sur votre ordinateur
- **Pas de stockage** : Aucune image ou donnée n'est enregistrée
- **Open-source** : Code transparent et vérifiable
- **Permissions** : Nécessite uniquement l'accès à la caméra (demandé explicitement)

## 💪 Conseils pour une meilleure expérience

1. **Éclairage** : Assurez-vous d'avoir un bon éclairage facial
2. **Position** : Placez-vous face à la caméra, à environ 50-70 cm
3. **Calibration** : Effectuez la calibration complète pour une meilleure précision
4. **Stabilité** : Gardez votre tête relativement stable
5. **Pratique** : La précision s'améliore avec l'utilisation

## 🐛 Dépannage

### La caméra ne se lance pas
- Vérifiez les permissions de votre système d'exploitation
- Assurez-vous qu'aucune autre application n'utilise la caméra
- Essayez de relancer l'application

### Le suivi n'est pas précis
- Effectuez une nouvelle calibration
- Améliorez l'éclairage de votre environnement
- Ajustez votre position face à la caméra
- Nettoyez l'objectif de votre webcam

### Les clics ne fonctionnent pas
- Assurez-vous que "Clic par clignement" est activé
- Clignez plus rapidement des yeux
- Vérifiez que vous regardez bien l'élément cible

### Le défilement est trop rapide/lent
- Ajustez la sensibilité dans les paramètres
- Regardez plus ou moins loin des bords de l'écran

### L'application .exe ne se lance pas
- Vérifiez que vous avez installé toutes les dépendances avec `npm install`
- Consultez [BUILD.md](BUILD.md) pour plus de détails
- Vérifiez les logs dans le dossier de l'application

### WebGazer.js ne se charge pas (version web)
- ✅ **Solution:** Utilisez la version .exe (Option 1) qui inclut WebGazer.js localement
- Sinon, vérifiez votre connexion internet
- Désactivez les bloqueurs de publicité/contenu
- Vérifiez la console du navigateur (F12) pour les erreurs

## 🌐 Compatibilité

### Application .exe
- ✅ Windows 10 et supérieur
- ✅ Fonctionne offline (pas besoin d'internet)

### Application web
| Navigateur | Version minimale | Support |
|------------|------------------|---------|
| Chrome     | 60+              | ✅ Complet |
| Firefox    | 55+              | ✅ Complet |
| Edge       | 79+              | ✅ Complet |
| Safari     | 11+              | ✅ Complet |
| Opera      | 47+              | ✅ Complet |

## 📚 Ressources

- [WebGazer.js Documentation](https://webgazer.cs.brown.edu/)
- [Electron Documentation](https://www.electronjs.org/)
- [WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à:
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Soumettre des pull requests

## 📄 Licence

Ce projet utilise des technologies open-source et est fourni tel quel pour usage éducatif et personnel.

## 🙏 Remerciements

- **WebGazer.js** : Brown University pour la bibliothèque de suivi oculaire
- **TensorFlow.js** : Google pour le framework d'apprentissage automatique
- **Electron** : Pour permettre de créer des applications de bureau avec des technologies web
- La communauté open-source pour l'inspiration et les ressources

---

Développé avec ❤️ pour rendre l'accessibilité informatique plus facile