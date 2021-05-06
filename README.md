# CodingGame en TypeScript

Ce template permet de travailler sur son bot en dehors de l'éditeur Codingame.

**Avantages**

* Utiliser son éditeur favori
* Découper son code en plusieurs fichiers si on veut
* Faire des tests auto si on veut

**Inconvénient**

Copier-coller la sortie du build dans l'éditeur à chaque fois... Heureusement, par défaut la minification du build est désactivée, donc on peut toujours bidouiller des petits trucs dans l'éditeur avant de les reporter à la main dans les sources.

## Installation

1. `npm install`
2. `npm start`
3. Faire un super bot
4. Copier le code de `dist/codingame.js` et le coller dans l'éditeur du site

Attention : il soumettre la solution en tant que JavaScript et non TypeScript.

## Tests

1. `npm test`
2. Faire du TDD

La commande lance simultanément deux types de tests :  
* Tests unitaires (`src/*.spec.ts`), qui permettent de couvrir vos fonctions et classes mais pas l'exécution du bot ;  
* Tests end-to-end (`e2e/*.spec.ts`), qui permettent de donner des lignes de test en entrée du bot et vérifier le résultat.
