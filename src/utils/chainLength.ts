import { Connect4Board, Coords } from "@/model/connect4state";
import { getCellAt, getCellAtUnsafe, isValidCell } from "./cellAt";
import { Offset } from "./neighborOffsets";

export default function chainLength(start: Coords, direction: Offset, board: Connect4Board): number {
  let coords: Coords = { column: start.column + direction.dx, row: start.row + direction.dy };
  let expected = getCellAtUnsafe(board, start.column, start.row);
  let length = 1;

  while (getCellAt(board, coords.column, coords.row) === expected) {
    length++;
    if (length === 4) {
      break;
    }
    coords = { column: coords.column + direction.dx, row: coords.row + direction.dy };
  }

  return length;
}
