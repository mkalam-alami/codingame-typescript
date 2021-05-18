import connect4minimax from "./minimax";
import { parseIsFirstPlayer, parseState } from "./model/parser";

const isFirstPlayer = parseIsFirstPlayer();

while (true) {
    const state = parseState(isFirstPlayer);
    const move = connect4minimax.searchBestMove(state, { printGraph: true });
    console.log(move.column);
}
