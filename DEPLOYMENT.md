# Guide de déploiement - Eyetrack

## 📦 Déploiement de l'application

### Option 1: Hébergement web simple

L'application est entièrement statique et peut être hébergée sur n'importe quel serveur web:

1. **GitHub Pages**
   ```bash
   # Dans les paramètres du repository GitHub:
   # Settings → Pages → Source: Deploy from a branch
   # Sélectionner la branche principale et le dossier root
   ```
   L'application sera accessible à: `https://[username].github.io/Eyetrack/`

2. **Netlify / Vercel**
   - Connecter le repository GitHub
   - Aucune configuration de build nécessaire
   - Déploiement automatique à chaque push

3. **Serveur web local**
   ```bash
   # Avec Python
   python3 -m http.server 8080
   
   # Avec Node.js
   npx serve .
   
   # Avec PHP
   php -S localhost:8080
   ```

### Option 2: Ouverture directe

L'application peut être ouverte directement dans le navigateur:
- Double-cliquez sur `index.html`
- Note: Certaines fonctionnalités peuvent être limitées en `file://` protocole

## 🔧 Configuration requise

### Navigateurs supportés
- ✅ Chrome 60+ (Recommandé)
- ✅ Firefox 55+
- ✅ Edge 79+
- ✅ Safari 11+

### Permissions nécessaires
- Accès à la webcam (WebRTC)
- Accès au CDN jsDelivr pour WebGazer.js

### Matériel
- Webcam intégrée ou externe
- Bon éclairage ambiant
- Écran avec résolution minimale 1024x768

## 📝 Structure des fichiers

```
Eyetrack/
├── index.html           # Application principale
├── styles.css           # Styles et mise en page
├── app.js              # Logique de l'application
├── test-scroll.html    # Page de test (simulation avec souris)
├── README.md           # Documentation utilisateur
└── DEPLOYMENT.md       # Ce fichier
```

## 🚀 Utilisation

### Démarrage rapide

1. **Ouvrir l'application**
   - Naviguer vers l'URL hébergée ou ouvrir `index.html`

2. **Démarrer le suivi**
   - Cliquer sur "Démarrer le suivi"
   - Autoriser l'accès à la caméra quand demandé

3. **Calibration**
   - Cliquer sur chaque point bleu en le regardant directement
   - Compléter les 9 points pour une meilleure précision

4. **Utiliser l'application**
   - Regarder vers le haut/bas pour défiler
   - Cligner rapidement pour simuler un clic

### Test sans caméra

Utilisez `test-scroll.html` pour tester le défilement automatique avec la souris:
- Ouvrir `test-scroll.html` dans le navigateur
- Cliquer sur "Démarrer le test"
- Déplacer la souris vers le haut ou le bas pour voir le défilement

## 🔒 Sécurité et confidentialité

### Données
- ✅ Aucune donnée n'est envoyée à un serveur
- ✅ Tout le traitement est local dans le navigateur
- ✅ Aucune image n'est enregistrée
- ✅ Aucun cookie ou tracking

### Permissions
- La caméra est utilisée uniquement pour le suivi oculaire
- L'accès peut être révoqué à tout moment dans les paramètres du navigateur
- Le flux vidéo n'est jamais enregistré ou transmis

## 🐛 Dépannage

### La caméra ne démarre pas
1. Vérifier les permissions du navigateur
2. Fermer les autres applications utilisant la caméra
3. Recharger la page (F5)

### WebGazer.js ne se charge pas
1. Vérifier la connexion internet
2. Désactiver les bloqueurs de publicité pour ce site
3. Vérifier la console du navigateur (F12) pour les erreurs

### Le suivi n'est pas précis
1. Améliorer l'éclairage
2. Refaire la calibration complète
3. Se positionner face à la caméra (50-70 cm)
4. Nettoyer l'objectif de la webcam

## 🔄 Mise à jour

Pour mettre à jour l'application:

```bash
git pull origin main
# Puis redéployer selon la méthode choisie
```

Aucune compilation ou build n'est nécessaire.

## 📊 Performances

### Ressources utilisées
- CPU: 5-15% (selon la puissance du processeur)
- RAM: ~100-200 MB
- Bande passante: ~1.5 MB (chargement initial de WebGazer.js)

### Optimisations
- WebGazer utilise TensorFlow.js optimisé pour le web
- Le filtre de Kalman réduit le bruit dans les prédictions
- La vidéo est redimensionnée pour des performances optimales

## 🌐 Internationalisation

L'application est actuellement en français. Pour ajouter d'autres langues:

1. Dupliquer `index.html` (ex: `index-en.html`)
2. Traduire les textes dans la nouvelle version
3. Créer un sélecteur de langue si nécessaire

## 📈 Améliorations futures possibles

- [ ] Téléchargement local de WebGazer.js (pour usage offline)
- [ ] Support multi-langues
- [ ] Paramètres de calibration avancés
- [ ] Historique des sessions
- [ ] Export des paramètres de calibration
- [ ] Détection améliorée des clignements avec ML
- [ ] Mode d'accessibilité pour personnes à mobilité réduite

## 📞 Support

Pour toute question ou problème:
- Ouvrir une issue sur GitHub
- Consulter la documentation de [WebGazer.js](https://webgazer.cs.brown.edu/)
- Vérifier la compatibilité du navigateur

## 📄 Licences

- **Application Eyetrack**: Open source
- **WebGazer.js**: GPLv3 (Brown University)
- **TensorFlow.js**: Apache 2.0
