import { COLUMNS, Connect4Board } from "@/model/state";

export default function printBoard(board: Connect4Board) {
  let output = '';
  let line = '';
  board.forEach((cell, index) => {
    if (cell === -1) line += '.';
    else line += cell;
    if (index % COLUMNS === COLUMNS - 1) { output += line + '\n'; line = ''; }
  })
  console.error(output);
}
