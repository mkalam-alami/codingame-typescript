import connect4minimax from "./heuristics";
import { parseIsFirstPlayer, parseState } from "./model/parser";

const isFirstPlayer = parseIsFirstPlayer();
const moveHistory: number[] = [];

while (true) {
    const [state, oppPreviousMove] = parseState(isFirstPlayer);
    if (oppPreviousMove !== -1) moveHistory.push(oppPreviousMove);

    if (moveHistory.length > 1) {
        const move = connect4minimax.searchBestMove(state);
        moveHistory.push(move.column);
        console.log(move.column);

        // First move
    } else if (moveHistory.length === 0) {
        console.log(moveHistory[0] === 4 ? 5 : 4);
    } else {
        console.log(4);
    }
}
