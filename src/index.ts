import connect4minimax from "./heuristics";
import { parseIsFirstPlayer, parseState } from "./model/parser";

const isFirstPlayer = parseIsFirstPlayer();

while (true) {
    const state = parseState(isFirstPlayer);
    const move = connect4minimax.searchBestMove(state);
    console.log(move.column);
}
