# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

#  Projet Memory

Application de mémorisation basée sur la **répétition espacée**, permettant aux utilisateurs de créer, organiser et réviser des cartes de révision.

---

##  Déploiement du projet

###  Prérequis

- Node.js (>=16)
- npm

###  Installation

```bash
git clone git@github.com:Philibert29/Projet_memory.git
cd ProjetMemory
npm install
```

###  Lancement en développement

```bash
npm run dev
```

Accessible à l'adresse : http://localhost:5173

###  Lancement en production (prévisualisation)

```bash
npm run build
npm run preview
```

---

##  Fonctionnalités implémentées

###  Création et gestion des thèmes

- Possibilité de créer plusieurs **thèmes** regroupant des cartes.
- Gestion complète des cartes : ajout, suppression, modification.

###  Cycle de révision basé sur la répétition espacée

- Gestion du niveau de maîtrise de chaque carte (1 à 7).
- Calcul automatique de la prochaine date de révision.
- Validation d’une carte **uniquement après avoir répondu aux deux faces (recto/verso).**

###  Mode de révision

- Affichage d’une carte à la fois.
- Possibilité de révéler la réponse.
- Révision des cartes planifiées pour la journée et des nouvelles cartes.

###  Notifications quotidiennes

- Activation/désactivation du rappel quotidien.
- **Choix de l’horaire** de notification.
- Stockage de la configuration en local.

###  Import / Export

- **Export** d’un thème au format `.json`.
- **Import** d’un thème à partir d’un fichier `.json`.

###  Fonctionnement hors-ligne

- **IndexedDB** pour le stockage des données locales.
- **Service Worker** avec stratégie de cache (Workbox).
- **Manifest.json** pour installation PWA.

---

##  Organisation du code

```
📂 public
 ┣ 📄 manifest.json           → Fichier de configuration PWA
 ┗ 📄 vite.svg                → Favicon

📂 src
 ┣ 📂 assets
 ┃ ┗ 📄 react.svg             → Asset React
 ┣ 📂 components
 ┃ ┣ 📄 CardList.tsx          → Composant d'affichage et gestion des cartes
 ┃ ┣ 📄 CardList.css
 ┃ ┣ 📄 ReviewMode.tsx        → Composant principal du cycle de révision
 ┃ ┣ 📄 ReviewPage.tsx        → Page dédiée à la révision
 ┃ ┣ 📄 ReviewPage.css
 ┃ ┣ 📄 ThemeList.tsx         → Composant d'affichage et gestion des thèmes
 ┃ ┗ 📄 ThemeList.css
 ┣ 📂 features
 ┃ ┣ 📄 cardSlice.ts         → State Redux des cartes
 ┃ ┗ 📄 themeSlice.ts        → State Redux des thèmes
 ┣ 📂 hooks
 ┣ 📂 services
 ┃ ┣ 📄 bdd.ts               → Initialisation de IndexedDB
 ┃ ┣ 📄 bddCRUD.ts           → Fonctions CRUD pour IndexedDB
 ┃ ┗ 📄 notification.ts      → Gestion des notifications quotidiennes
 ┣ 📂 store
 ┃ ┗ 📄 store.ts             → Configuration Redux
 ┣ 📂 tests
 ┃ ┗ 📄 ThemeList.test.tsx   → Tests unitaires du composant ThemeList
 ┣ 📂 utils
 ┃ ┗ 📄 reviewUtils.ts      → Fonctions utilitaires pour la logique de révision
 ┣ 📂 workers
 ┃ ┗ 📄 sw.ts                → Service Worker Workbox
 ┣ 📄 App.tsx                → Composant principal avec routing
 ┣ 📄 App.css
 ┣ 📄 index.css
 ┣ 📄 main.tsx               → Point d'entrée de l'application + enregistrement SW
 ┣ 📄 setupTests.ts
 ┣ 📄 vite-env.d.ts
┣ 📄 index.html
┣ 📄 jest.config.js
┣ 📄 vite.config.ts
┣ 📄 package.json
┣ 📄 package-lock.json
┣ 📄 tsconfig.json
┣ 📄 tsconfig.app.json
┣ 📄 tsconfig.node.json
┣ 📄 .babelrc
┣ 📄 .gitignore
┣ 📄 eslint.config.js
┗ 📄 README.md
```

---

##  Critères du sujet respectés

✅ Création et gestion des thèmes  
✅ Cycle de révision basé sur la répétition espacée  
✅ Gestion du niveau de maîtrise des cartes  
✅ Import / Export des thèmes au format JSON  
✅ Notification quotidienne configurable  
✅ Fonctionnement **hors-ligne**  
✅ Application **PWA installable**  
✅ README avec explication du déploiement et organisation du projet

---

##  Bonus réalisés

- Validation obligatoire des deux faces d’une carte
- Notification personnalisable avec choix de l’horaire
- Interface simple et claire
