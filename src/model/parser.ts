import { EMPTY, PLAYER_0, PLAYER_1 } from "../utils/cellData";
import Connect4State, { Connect4Board } from "./connect4state";

export function parseIsFirstPlayer(): boolean {
  return readline().split(' ')[0] === '0';
}

export function parseState(isFirstPlayer: boolean): [Connect4State, number] {
  const turnIndex = parseInt(readline());
  const isOurTurn = turnIndex % 2 === (isFirstPlayer ? 0 : 1);

  let board: Connect4Board = [];
  for (let i = 0; i < 7; i++) {
    board = board.concat(readline()
      .split('')
      .map(c => {
        if (c === '1') return PLAYER_0;
        else if (c === '0') return PLAYER_1;
        else return EMPTY;
      }));
  }

  const numValidActions: number = parseInt(readline());
  for (let i = 0; i < numValidActions; i++) {
    parseInt(readline());
  }
  const oppPreviousAction: number = parseInt(readline());

  return [new Connect4State(isFirstPlayer ? 0 : 1, isOurTurn, board), oppPreviousAction];
}
