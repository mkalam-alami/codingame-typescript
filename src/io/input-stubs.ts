
import { generateMapInput } from "../../e2e/generators/map";
import { Cell, GameState, Tree } from "./input";
import { parseMapFromLines } from "./parser";

export const DEFAULT_MAP = parseMapFromLines(generateMapInput());

export function stubCell(customData: Partial<Cell> = {}): Cell {
  return {
    ...DEFAULT_MAP[customData.cellId || 0],
    ...customData
  };
}

export function stubGameState(customData: Partial<GameState> = {}): GameState {
  return {
    day: 0,
    nutrients: 0,
    opponentIsWaiting: false,
    opponentScore: 0,
    opponentSun: 0,
    possibleMoves: [],
    score: 0,
    sun: 0,
    trees: [],
    ...customData
  };
}

export function stubTree(customData: Partial<Tree> = {}): Tree {
  return {
    cell: stubCell(),
    cellId: 0,
    isDormant: false,
    isMine: true,
    size: 0,
    ...customData
  }
}
