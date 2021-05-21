import connect4minimax from "./heuristics";
import { parseIsFirstPlayer, parseState } from "./model/parser";

const isFirstPlayer = parseIsFirstPlayer();
const moveHistory: number[] = [];

while (true) {
    const [state, oppPreviousMove] = parseState(isFirstPlayer);
    moveHistory.push(oppPreviousMove);

    const move = connect4minimax.searchBestMove(state);
    moveHistory.push(move.column);

    console.log(move.column);
}
