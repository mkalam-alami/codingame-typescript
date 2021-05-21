import connect4minimax from "./heuristics";
import { Connect4Move } from "./model/connect4state";
import { parseIsFirstPlayer, parseState } from "./model/parser";

const isFirstPlayer = parseIsFirstPlayer();
const moveHistory: number[] = [];

while (true) {
    const [state, oppPreviousMove] = parseState(isFirstPlayer);
    if (oppPreviousMove !== -1) moveHistory.push(oppPreviousMove);

    let move: Connect4Move;
    if (moveHistory.length <= 1) {
        move = moveHistory[0] === 4 ? new Connect4Move(5) : new Connect4Move(4); // First move
    } else {
        move = connect4minimax.searchBestMove(state);
    }

    console.error(moveHistory);
    console.log(move.column);
    moveHistory.push(move.column);
}
