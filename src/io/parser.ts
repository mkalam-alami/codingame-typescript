import { Move } from "./move";
import { GameState, Map } from "./input";

export function parseMap(): Map {
  const lines = [];
  for (let i = 0; i < 1 + 37; i++) {
    lines.push(readline());
  }
  return parseMapFromLines(lines);
}

export function parseMapFromLines(lines: string[]): Map {
  let i = 0;

  const map: Map = [];

  const numberOfCells: number = parseInt(lines[i++]); // 37
  for (let cellId = 0; cellId < numberOfCells; cellId++) {
    var inputs: string[] = lines[i++].split(' ');
    const index: number = parseInt(inputs[0]); // 0 is the center cell, the next cells spiral outwards
    const richness: number = parseInt(inputs[1]); // 0 if the cell is unusable, 1-3 for usable cells
    const neigh0: number = parseInt(inputs[2]); // the index of the neighbouring cell for each direction
    const neigh1: number = parseInt(inputs[3]);
    const neigh2: number = parseInt(inputs[4]);
    const neigh3: number = parseInt(inputs[5]);
    const neigh4: number = parseInt(inputs[6]);
    const neigh5: number = parseInt(inputs[7]);

    map[index] = {
      cellId: index,
      richness,
      neighbors: [],
      neighborIndexes: [neigh0, neigh1, neigh2, neigh3, neigh4, neigh5].filter(n => n !== -1)
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
    const cellId: number = parseInt(inputs[0]); // location of this tree
    const size: number = parseInt(inputs[1]); // size of this tree: 0-3
    const isMine: boolean = inputs[2] !== '0'; // 1 if this is your tree
    const isDormant: boolean = inputs[3] !== '0'; // 1 if this tree is dormant

    gameState.trees.push({
      cellId,
      cell: map[cellId],
      isDormant,
      isMine,
      size
    });
  }
  const numberOfPossibleMoves: number = parseInt(readline());
  for (let i = 0; i < numberOfPossibleMoves; i++) {
    const possibleMove = parseMove(readline());
    gameState.possibleMoves.push(possibleMove);
  }

  return gameState;
}

function parseMove(input: string): Move {
  const tokens = input.split(' ');
  let move: Move;

  switch (tokens[0]) {
    case 'WAIT': move = { type: 'WAIT' }; break;
    case 'GROW': move = { type: 'GROW', cellId: parseInt(tokens[1]) }; break;
    case 'COMPLETE': move = { type: 'COMPLETE', cellId: parseInt(tokens[1]) }; break;
    case 'SEED': move = { type: 'SEED', sourceId: parseInt(tokens[1]), targetId: parseInt(tokens[1]) }; break;
    default: throw new Error('Unknown move: ' + input);
  }

  return move;
}