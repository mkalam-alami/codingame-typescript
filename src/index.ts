import connect4minimax from "./heuristics";
import { parseIsFirstPlayer, parseState } from "./model/parser";
import printBoard from "./utils/printBoard";

const isFirstPlayer = parseIsFirstPlayer();

while (true) {
    const state = parseState(isFirstPlayer);
    printBoard(state.get());
    const move = connect4minimax.searchBestMove(state);
    console.log(move.column);
}
