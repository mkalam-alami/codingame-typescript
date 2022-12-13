export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export type Owner = 'me' | 'foe' | 'neutral';

export interface GameState {
  /**
   * la quantité de matériaux du joueur.
   */
  myMatter: number;
  /**
   * la quantité de matériaux de l'adversaire.
   */
  oppMatter: number;
  /**
   * toutes les cases de la carte mises en vrac dans une liste.
   */
  tileList: TileState[];
  /**
   * toutes les cases de la carte accessibles par leurs coordonnées.
   */
  map: TileState[][];
  /**
   * les dimensions de la carte.
   */
  mapSize: Size;
}

export interface TileState {
  /**
   * les coordonnées de la case sur la carte.
   */
  position: Point;
  /**
   * le nombre de fois que cette case peut être recyclée avant de devenir de l'herbe.
   */
  scrapAmount: number;
  /**
   * le nombre d'unités sur cette case. Ces unités appartiennent à l'owner de la case.
   */
  owner: Owner;
  units: number;
  /**
   * true si il y a un recycleur sur cette case. Ce recycleur appartient à l'owner de cette case. false s'il n'y pas pas de recycleur sur cette case.
   */
  recycler: boolean;
  /**
   * true si vous avez le droit de BUILD (construire) un recycleur sur cette case ce tour. false sinon.
   */
  canBuild: boolean;
  /**
   * true si vous avez le droit de SPAWN (ajouter) des robots sur cette case ce tour. false sinon.
   */
  canSpawn: boolean;
  /**
   * true si cette tuile se fera réduire sa scrapAmount par un recycleur à la fin du tour. false sinon.
   */
  inRangeOfRecycler: boolean;
}

export function parseMapSize(): Size {
  var inputs: string[] = readline().split(' ');
  const width: number = parseInt(inputs[0]);
  const height: number = parseInt(inputs[1]);
  return { width, height };
}

export function parseGameState(mapSize: Size): GameState {
  const inputs: string[] = readline().split(' ');
  const myMatter: number = parseInt(inputs[0]);
  const oppMatter: number = parseInt(inputs[1]);
  const tileList: TileState[] = [];
  const map: TileState[][] = [];

  for (let y = 0; y < mapSize.height; y++) {
    const row: TileState[] = [];
    map.push(row);

    for (let x = 0; x < mapSize.width; x++) {
      const inputs: string[] = readline().split(' ');
      const scrapAmount: number = parseInt(inputs[0]);
      const owner: Owner = parseOwner(inputs[1]);
      const units: number = parseInt(inputs[2]);
      const recycler: boolean = parseInt(inputs[3]) === 1;
      const canBuild: boolean = parseInt(inputs[4]) === 1;
      const canSpawn: boolean = parseInt(inputs[5]) === 1;
      const inRangeOfRecycler: boolean = parseInt(inputs[6]) === 1;

      const tile = {
        position: { x, y },
        scrapAmount,
        owner,
        units,
        recycler,
        canBuild,
        canSpawn,
        inRangeOfRecycler
      };

      row.push(tile);
      tileList.push(tile);
    }
  }

  return {
    myMatter,
    oppMatter,
    tileList,
    map,
    mapSize
  }

}

function parseOwner(ownerString): Owner {
  // 1 = me, 0 = foe, -1 = neutral
  switch (ownerString) {
    case '1': return 'me';
    case '0': return 'foe';
    default: return 'neutral';
  }
}
