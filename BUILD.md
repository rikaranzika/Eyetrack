# 🖥️ Guide de création de l'exécutable Eyetrack.exe

## ⚡ Installation rapide

### Prérequis
- Node.js 18+ (télécharger depuis https://nodejs.org/)
- Git (optionnel)

### Étape 1: Installer les dépendances

```bash
npm install
```

Cette commande installe:
- Electron (framework pour applications desktop)
- WebGazer.js (bibliothèque de suivi oculaire)
- electron-builder (outil de création d'exécutables)

### Étape 2: Tester l'application en mode développement

```bash
npm start
```

Cela lancera l'application Eyetrack dans une fenêtre Electron. Vous pouvez tester toutes les fonctionnalités avant de créer l'exécutable.

### Étape 3: Créer l'exécutable Windows (.exe)

```bash
npm run build
```

Cette commande va:
1. Empaqueter l'application avec Electron
2. Inclure WebGazer.js localement (pas besoin d'internet!)
3. Créer un installateur NSIS dans le dossier `dist/`

Le fichier sera disponible dans: `dist/Eyetrack Setup 1.0.0.exe`

## 📦 Résultat

Après la compilation, vous trouverez dans le dossier `dist/`:
- `Eyetrack Setup 1.0.0.exe` - Installateur Windows
- L'installateur crée un raccourci sur le bureau et dans le menu Démarrer

## 🎯 Avantages de la version .exe

✅ **Pas besoin d'internet** - WebGazer.js est inclus localement
✅ **Pas de problèmes de firewall** - Aucune connexion CDN requise
✅ **Installation facile** - Double-clic et c'est installé
✅ **Application native** - Icône dans la barre des tâches, meilleure performance
✅ **Fonctionne offline** - Une fois installé, utilisable sans connexion

## 🔧 Commandes disponibles

```bash
npm start              # Lancer en mode développement
npm run build          # Créer l'exe pour Windows
npm run build-all      # Créer pour Windows, Mac et Linux
```

## 📝 Notes importantes

### Taille de l'application
L'exécutable final fait environ 100-150 MB car il inclut:
- Chromium (moteur de rendu d'Electron)
- Node.js runtime
- WebGazer.js et TensorFlow.js
- L'application elle-même

### Permissions Windows
Lors de l'installation, Windows peut afficher un avertissement "SmartScreen". Cliquez sur "Plus d'informations" puis "Exécuter quand même" pour installer.

### Signature du code
Pour éviter l'avertissement SmartScreen en production, vous devriez signer le code avec un certificat de signature de code.

## 🐛 Résolution de problèmes

### L'installation d'npm échoue
```bash
# Nettoyer le cache npm
npm cache clean --force
npm install
```

### La compilation échoue
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run build
```

### L'exe ne se lance pas
- Vérifiez que votre antivirus n'a pas bloqué l'application
- Essayez d'exécuter en tant qu'administrateur
- Consultez les logs dans: `%APPDATA%\Eyetrack\logs\`

## 🎨 Personnalisation

### Changer l'icône
Remplacez les fichiers dans le dossier `assets/`:
- `icon.ico` - Pour Windows (256x256 ou 512x512 recommandé)
- `icon.icns` - Pour macOS
- `icon.png` - Pour Linux

Vous pouvez créer des icônes avec des outils en ligne comme:
- https://icoconvert.com/
- https://cloudconvert.com/png-to-ico

### Modifier le nom de l'application
Éditez `package.json`:
```json
"build": {
  "productName": "Votre Nom"
}
```

## 📚 Documentation complémentaire

- [Documentation Electron](https://www.electronjs.org/docs)
- [Documentation electron-builder](https://www.electron.build/)
- [Documentation WebGazer.js](https://webgazer.cs.brown.edu/)

## 🆘 Support

Si vous rencontrez des problèmes:
1. Vérifiez que Node.js est bien installé: `node --version`
2. Assurez-vous que toutes les dépendances sont installées: `npm install`
3. Consultez les logs de build dans la console
4. Ouvrez une issue sur GitHub avec les détails de l'erreur

---

**Important**: La première installation des dépendances peut prendre quelques minutes et télécharger ~500 MB de fichiers. Soyez patient! ⏳
