# Comment obtenir le fichier .exe / How to get the .exe file

## Pour les utilisateurs / For Users

### Télécharger l'exécutable Windows / Download Windows Executable

**✅ Fichier .exe prêt à utiliser disponible !**

1. **Téléchargez depuis GitHub Releases:**
   - Allez sur: https://github.com/rikaranzika/Eyetrack/releases
   - Téléchargez le fichier `Eyetrack-Windows-x64.zip` le plus récent

2. **Extrayez et lancez:**
   - Extrayez le fichier ZIP n'importe où sur votre ordinateur
   - Ouvrez le dossier `Eyetrack-win32-x64`
   - **Double-cliquez sur `Eyetrack.exe`** pour lancer l'application

3. **C'est tout!** L'application démarre directement, pas d'installation nécessaire.

### Si aucune release n'est disponible:

**Option manuelle:** Créer une release avec GitHub Actions
1. Le propriétaire du repo doit créer un tag: `git tag v1.0.0 && git push --tags`
2. GitHub Actions construira automatiquement l'exécutable
3. Le fichier .exe sera disponible dans les Releases

**Ou construire localement:**
```bash
npm install
npm run package-win
```
Le fichier .exe sera dans `dist/Eyetrack-win32-x64/Eyetrack.exe`

---

## For Developers

### Automatic Builds (Recommended)

The repository now includes a GitHub Actions workflow that automatically:
- Builds the Windows executable on Windows runners
- Creates a downloadable ZIP file
- Publishes it to GitHub Releases when you create a version tag

**To create a release:**
```bash
git tag v1.0.0
git push --tags
```

GitHub Actions will automatically build and publish the .exe file.

### Manual Build

```bash
npm install
npm run package-win
```

The executable will be in `dist/Eyetrack-win32-x64/Eyetrack.exe`

---

## Notes importantes / Important Notes

- ✅ Le fichier .exe existe et fonctionne / The .exe file exists and works
- ✅ Téléchargez-le depuis GitHub Releases / Download it from GitHub Releases
- ✅ Aucune installation requise / No installation required
- ✅ Fenêtre redimensionnable / Resizable window
- ⚠️ Gardez tous les fichiers du dossier ensemble / Keep all folder files together
