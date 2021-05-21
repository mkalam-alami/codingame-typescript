import { moveHeuristic, stateHeuristic } from "@/heuristics";
import { Minimax } from "@/minimax/minimax";
import Connect4State, { COLUMNS } from "@/model/connect4state";
import emptyBoard from "@/utils/emptyBoard";
import playMoves from "@/utils/playMoves";
import printBoard from "@/utils/printBoard";

const board = emptyBoard();
playMoves(board, [0, 0, 3, 3, 0, 3, 7, 3]);
printBoard(board);

let bestMoves: number[] = [];

for (let i = 0; i < 20; i++) {

  const state = new Connect4State(0, true, board);
  const minimax = new Minimax(stateHeuristic, moveHeuristic, {
    maxDepth: 2,
    timeoutInMs: 70,
    printBranches: false,
    printFinalGraph: false,
    //printIterationCount: true
  });
  const bestMove = minimax.searchBestMove(state);
  bestMoves.push(bestMove.column);

}

console.log(bestMoves + '\n');

for (let column = 0; column < COLUMNS; column++) {
  console.log(`${column}: ${Math.round(100. * bestMoves.filter(b => b === column).length / bestMoves.length)}%`)
}
