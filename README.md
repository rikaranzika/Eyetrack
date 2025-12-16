# Eyetrack 👁️

Application web de contrôle par suivi oculaire permettant de contrôler votre navigateur avec vos yeux.

## 🎯 Fonctionnalités

- **Défilement automatique** : Regardez vers le haut ou le bas de l'écran pour faire défiler automatiquement les pages web
- **Simulation de clics** : Clignez rapidement des yeux pour simuler des clics de souris
- **Calibration** : Système de calibration en 9 points pour améliorer la précision du suivi
- **Interface intuitive** : Panneau de contrôle avec paramètres réglables en temps réel
- **Visualisation en direct** : Aperçu de la webcam et indicateur de position du regard

## 🚀 Démarrage rapide

1. Ouvrez simplement le fichier `index.html` dans votre navigateur web moderne (Chrome, Firefox, Edge, Safari)
2. Cliquez sur "Démarrer le suivi" et autorisez l'accès à votre caméra
3. Suivez la calibration pour une meilleure précision
4. Commencez à contrôler votre navigateur avec vos yeux !

## 📋 Prérequis

- Un navigateur web moderne avec support de:
  - WebRTC (accès caméra)
  - JavaScript ES6+
  - MediaDevices API
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

- **HTML5/CSS3** : Structure et style de l'interface
- **JavaScript (Vanilla)** : Logique applicative
- **WebGazer.js** : Bibliothèque open-source de suivi oculaire
  - Version utilisée : CDN depuis webgazer.cs.brown.edu
  - Basé sur TensorFlow.js pour l'apprentissage automatique
  - Fonctionne entièrement côté client (aucune donnée envoyée à un serveur)

## 📁 Structure du projet

```
Eyetrack/
├── index.html      # Page principale de l'application
├── styles.css      # Styles et mise en page
├── app.js          # Logique de l'application
└── README.md       # Documentation
```

## 🎨 Architecture

L'application est structurée autour d'une classe principale `EyeTrackApp` qui gère:

1. **Initialisation WebGazer** : Configuration du suivi oculaire
2. **Gestion du regard** : Traitement des données de position
3. **Défilement automatique** : Calcul et application du défilement
4. **Détection de clignements** : Identification des clignements pour les clics
5. **Calibration** : Amélioration de la précision du suivi
6. **Interface utilisateur** : Mise à jour des informations et statuts

## 🔒 Confidentialité et sécurité

- **Aucune donnée envoyée** : Tout le traitement se fait localement dans votre navigateur
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
- Vérifiez les permissions de votre navigateur
- Assurez-vous qu'aucune autre application n'utilise la caméra
- Essayez de recharger la page

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

## 🌐 Compatibilité navigateurs

| Navigateur | Version minimale | Support |
|------------|------------------|---------|
| Chrome     | 60+              | ✅ Complet |
| Firefox    | 55+              | ✅ Complet |
| Edge       | 79+              | ✅ Complet |
| Safari     | 11+              | ✅ Complet |
| Opera      | 47+              | ✅ Complet |

## 📚 Ressources

- [WebGazer.js Documentation](https://webgazer.cs.brown.edu/)
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
- La communauté open-source pour l'inspiration et les ressources

---

Développé avec ❤️ pour rendre l'accessibilité web plus facile