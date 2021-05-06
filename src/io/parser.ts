import { GameState, Map } from "./input";

export function parseMap(): Map {
  const map: Map = [];

  const numberOfCells: number = parseInt(readline()); // 37
  for (let i = 0; i < numberOfCells; i++) {
    var inputs: string[] = readline().split(' ');
    const index: number = parseInt(inputs[0]); // 0 is the center cell, the next cells spiral outwards
    const richness: number = parseInt(inputs[1]); // 0 if the cell is unusable, 1-3 for usable cells
    const neigh0: number = parseInt(inputs[2]); // the index of the neighbouring cell for each direction
    const neigh1: number = parseInt(inputs[3]);
    const neigh2: number = parseInt(inputs[4]);
    const neigh3: number = parseInt(inputs[5]);
    const neigh4: number = parseInt(inputs[6]);
    const neigh5: number = parseInt(inputs[7]);

    map[index] = {
      index,
      richness,
      neighbors: [],
      neighborIndexes: [neigh0, neigh1, neigh2, neigh3, neigh4, neigh5]
    };
  }

  for (const cell of map) {
    for (const neighborIndex of cell.neighborIndexes) {
        cell.neighbors.push(map[neighborIndex]);
    }
  }

  return map;
}

export function parseGameState(map: Map) {
  const day: number = parseInt(readline()); // the game lasts 24 days: 0-23
  const nutrients: number = parseInt(readline()); // the base score you gain from the next COMPLETE action
  var inputs: string[] = readline().split(' ');
  const sun: number = parseInt(inputs[0]); // your sun points
  const score: number = parseInt(inputs[1]); // your current score
  var inputs: string[] = readline().split(' ');
  const opponentSun: number = parseInt(inputs[0]); // opponent's sun points
  const opponentScore: number = parseInt(inputs[1]); // opponent's score
  const opponentIsWaiting: boolean = inputs[2] !== '0'; // whether your opponent is asleep until the next day

  const gameState: GameState = {
    day,
    nutrients,
    sun,
    score,
    opponentSun,
    opponentScore,
    opponentIsWaiting,
    trees: [],
    possibleMoves: []
  }

  const numberOfTrees: number = parseInt(readline()); // the current amount of trees
  for (let i = 0; i < numberOfTrees; i++) {
    var inputs: string[] = readline().split(' ');
    const cellIndex: number = parseInt(inputs[0]); // location of this tree
    const size: number = parseInt(inputs[1]); // size of this tree: 0-3
    const isMine: boolean = inputs[2] !== '0'; // 1 if this is your tree
    const isDormant: boolean = inputs[3] !== '0'; // 1 if this tree is dormant

    gameState.trees.push({
      cellIndex,
      cell: map[cellIndex],
      isDormant,
      isMine,
      size
    });
  }
  const numberOfPossibleMoves: number = parseInt(readline());
  for (let i = 0; i < numberOfPossibleMoves; i++) {
    const possibleMove: string = readline();
    gameState.possibleMoves.push(possibleMove);
  }

  return gameState;
}
