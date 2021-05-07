import { GameState } from '../../src/io/input';
import { formatMove } from '../../src/io/move';
import { stubGameState } from '../../src/io/input-stubs';
import { generatePossibleMoves, PossibleMovesOptions } from './possible-moves';

export function generateGameState(customData: Partial<GameState>, options: PossibleMovesOptions = {}): string[] {
  const state = stubGameState(customData);

  if (state.possibleMoves.length === 0) {
    state.possibleMoves = generatePossibleMoves(state, options);
  }

  return [
    `${state.day}`,
    `${state.nutrients}`,
    `${state.sun} ${state.score}`,
    `${state.opponentSun} ${state.opponentScore} ${encodeBoolean(state.opponentIsWaiting)}`,
    `${state.trees.length}`,
    ...state.trees.map(tree => `${tree.cellId} ${tree.size} ${encodeBoolean(tree.isMine)} ${encodeBoolean(tree.isDormant)}`),
    `${state.possibleMoves.length}`,
    ...state.possibleMoves.map(formatMove),
  ];
}

function encodeBoolean(value: boolean): string {
  return value ? '1' : '0';
}
