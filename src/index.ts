import { parseGameState, parseMap } from "./io/parser";

const map = parseMap();

while (true) {
  const gameState = parseGameState(map);

  // Debug code
  // console.error(gameState.possibleMoves);

  // Possible actions: GROW cellIdx | SEED sourceIdx targetIdx | COMPLETE cellIdx | WAIT <message>)
  // console.log('WAIT');
  console.log(gameState.possibleMoves[0]);
}
