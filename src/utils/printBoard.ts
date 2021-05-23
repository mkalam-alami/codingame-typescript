import { COLUMNS, Connect4Board } from "@/model/connect4state";
import { toPrintableValue } from "./cellData";

export default function printBoard(board: Connect4Board, withData = false) {
  console.error(formatBoard(board, withData));
}

export function formatBoard(board: Connect4Board, withData = false) {
  let output = '';
  let data = '';
  let line = '';

  if (withData) {
    data += `\nData axes: - | / \\`;
  }

  board.forEach((cell, index) => {
    line += toPrintableValue(cell);
    if (index % COLUMNS === COLUMNS - 1) { output += line + '\n'; line = ''; }
    if (withData) {
      data += `${(index % 4 === 0) ? '\n' : '   '}${indexToCoords(index)} ${formatBinary(cell)}`
    }
  })

  return output + data;
}

function indexToCoords(index: number): string {
  return `r${Math.floor(index/COLUMNS)}c${index%COLUMNS}`; 
}

function formatBinary(num: number): string {
  return leftPad((num >>> 0).toString(2), 18, '0')
  .split('').reverse().join('')
  .match(/.{1,4}/g).join('_')
  .split('').reverse().join('');
}

function leftPad(message: string, minLength: number, char: string): string {
  while (message.length < minLength) {
    message = char + message;
  }
  return message;
}