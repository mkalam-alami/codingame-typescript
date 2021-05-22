import { COLUMNS, Connect4Board } from "@/model/connect4state";
import { toPrintableValue } from "./cellData";

export default function printBoard(board: Connect4Board) {
  let output = '';
  let line = '';
  board.forEach((cell, index) => {
    line += toPrintableValue(cell);
    if (index % COLUMNS === COLUMNS - 1) { output += line + '\n'; line = ''; }
  })
  console.error(output);
}
