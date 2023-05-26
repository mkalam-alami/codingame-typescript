# CodinGame en TypeScript

Ce template permet de travailler sur son bot en dehors de l'éditeur Codingame.  

**Avantages**

* Utiliser son éditeur favori
* Découper son code en plusieurs fichiers si on veut (un build Webpack rassemble tout en un fichier)
* Faire des tests auto si on veut (avec Jest)

**Inconvénient**

Copier-coller la sortie du build dans l'éditeur à chaque fois... Heureusement, par défaut la minification du build est désactivée, donc on peut toujours bidouiller des petits trucs dans l'éditeur avant de les reporter à la main dans les sources.

## Installation

1. `npm install`
2. `npm start`
3. Faire un super bot
4. Copier le code de `dist/codingame.js` et le coller dans l'éditeur du site

Remarque : il vaut mieux soumettre la solution en tant que JavaScript, et non TypeScript.

## Tests

1. `npm test`
2. Faire du TDD

La commande lance simultanément deux types de tests :  
* Tests unitaires (`src/*.spec.ts`), qui permettent de couvrir vos fonctions et classes hors `index.ts`, mais pas l'exécution du bot ;  
* Tests end-to-end (`e2e/*.spec.ts`), qui permettent de donner des lignes de test en entrée du bot et vérifier le résultat.

Attention : les tests end-to-end utilisent la **version compilée** du bot. Il vaut mieux donc garder un `npm start` d'ouvert en même temps.

## Scripts arbitraires

Si l'on souhaite lancer un script arbitraire sans s'encombrer du framework de tests, on peut lancer :

```
npm run exec src/monscript.ts
```

Attention : cela ne marchera pas avec `src/index.ts`, car la fonction `readline()` n'existe pas en dehors de CodinGame ou des tests end-to-end.

## Spring Challenge 2023

La branche [challenge-spring-2023](https://github.com/mkalam-alami/codingame-typescript/tree/challenge-spring-2023) est prête à l'emploi avec un bot minimaliste :

```typescript
import { Action, playActions } from './io/action';
import { parseMap, parseMapState } from './io/parser';

const map = parseMap();

while (true) {
  const state = parseMapState(map);

  const actions: Action[] = [];
  for (const cell of state.cells) {
    actions.push({ type: 'BEACON', cellIndex: cell.index, weight: 1 });
  }

  playActions(actions);
}
```
