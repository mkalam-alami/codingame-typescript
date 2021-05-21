import { Minimax } from "@/minimax/minimax";
import Connect4State, { COLUMNS, Connect4Board, Connect4Move } from "@/model/connect4state";
import emptyBoard from "@/utils/emptyBoard";
import playMoves from "@/utils/playMoves";
import printBoard from "@/utils/printBoard";

const board = emptyBoard();
playMoves(board, [3, 4, 3, 4, 3, 4]);
printBoard(board);

let bestMoves: number[] = [];

for (let i = 0; i < 20; i++) {
  const state = new Connect4State(0, true, board, undefined, { restrictMoves: [3, 4] });
  const minimax = new Minimax<Connect4Board, Connect4Move>({
    maxDepth: 2,
    // timeoutInMs: 70,
    maxIterations: 10,
    //timeoutInMs: 70,
    //printBranches: true,
    //printFinalGraph: false,
    //printIterationCount: true
  });
  const bestMove = minimax.searchBestMove(state);
  bestMoves.push(bestMove.column);

}

console.log(bestMoves + '\n');

for (let column = 0; column < COLUMNS; column++) {
  console.log(`${column}: ${Math.round(100. * bestMoves.filter(b => b === column).length / bestMoves.length)}%`)
}
