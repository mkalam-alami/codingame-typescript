import { getCellAt, setCellAt } from "../utils/cellAt";
import { Move } from "../search/move";
import { State } from "../search/state";
import fallingRow from "@/utils/fallingRow";

export const ROWS = 8;
export const COLUMNS = 9;
export const EMPTY = -1;
export const PLAYER_0 = 0;
export const PLAYER_1 = 1;

export interface Coords { row: number; column: number };
export type Connect4Cell = -1 | 0 | 1;
export type Connect4Board = Connect4Cell[];
export class Connect4Move implements Move {
  constructor(public column: number) { };
  format() {
    return this.column.toString();
  }
}

const DEFAULT_MOVES = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(column => new Connect4Move(column));

export default class Connect4State implements State<Connect4Board, Connect4Move> {

  constructor(
    public readonly ourPlayerIndex: number,
    private _isOurTurn: boolean,
    private board: Connect4Board) { }

  get() {
    return this.board;
  }

  isOurTurn(): boolean {
    return this._isOurTurn;
  }

  availableMoves(): Connect4Move[] {
    return DEFAULT_MOVES.filter(move => getCellAt(this.board, move.column, 0) === -1);
  }

  fork(move: Connect4Move): Connect4State {
    const forkedBoard = [...this.board];
    const row = fallingRow(this.board, move.column);
    if (!row) throw new Error('tried to play a move at a full column');
    const newCell = (this.isOurTurn() ? this.ourPlayerIndex : (1 - this.ourPlayerIndex)) as Connect4Cell;
    setCellAt(forkedBoard, move.column, row, newCell);

    return new Connect4State(this.ourPlayerIndex, !this._isOurTurn, forkedBoard);
  }

}
