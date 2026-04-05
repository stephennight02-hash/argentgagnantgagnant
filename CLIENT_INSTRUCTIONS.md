# Instructions pour l'Installation du Projet

Ce document contient toutes les étapes pour installer le projet, l'ajouter à votre dépôt GitHub et le lancer localement.

## 1. Prérequis
Assurez-vous d'avoir les éléments suivants installés sur votre ordinateur :
- **Node.js** (Version LTS recommandée) : [Télécharger ici](https://nodejs.org/)
- **Git** : [Télécharger ici](https://git-scm.com/)

## 2. Configuration du Dépôt GitHub
Si vous n'avez pas encore cloné votre dépôt ou si vous voulez ajouter ces fichiers à votre dépôt existant :

### Si le dépôt est vide :
Ouvrez un terminal dans le dossier du projet et exécutez ces commandes :
```bash
git init
git remote add origin https://github.com/raarry/parrainagegagnant.git
git add .
git commit -m "Initial commit: Ajout des fichiers du site"
git branch -M main
git push -u origin main
```

### Si vous avez déjà cloné le dépôt :
Copiez simplement les fichiers (sauf le dossier `.git`) dans votre dossier local cloné, puis :
```bash
git add .
git commit -m "Mise à jour des fichiers du site"
git push origin main
```

## 3. Installation et Lancement
Une fois les fichiers en place, lancez ces commandes dans le terminal (à l'intérieur du dossier `parrainage-site`) :

### Installer les dépendances (Crucial)
Cette étape recrée le dossier `node_modules` proprement sur votre machine :
```bash
npm install
```

### Lancer le site en mode développement
```bash
npm run dev
```
Le site sera alors accessible sur `http://localhost:5173` (ou l'adresse indiquée dans votre terminal).

## 4. Scripts Utiles
- `npm run build` : Pour générer les fichiers de production (dans le dossier `dist`).
- `npm run preview` : Pour tester la version de production localement.
