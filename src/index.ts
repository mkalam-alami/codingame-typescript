import { formatMove } from "./io/move";
import { parseGameState, parseMap } from "./io/parser";

const map = parseMap();

while (true) {
    const gameState = parseGameState(map);
    const move = gameState.possibleMoves[0]
    console.log(formatMove(move));
}
