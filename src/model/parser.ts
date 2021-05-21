import Connect4State, { Connect4Board } from "./connect4state";

export function parseIsFirstPlayer(): boolean {
  return readline() === '0';
}

export function parseState(isFirstPlayer: boolean): Connect4State {
  const turnIndex = parseInt(readline());
  const isOurTurn = turnIndex % 2 === (isFirstPlayer ? 0 : 1);

  let board: Connect4Board = [];
  for (let i = 0; i < 7; i++) {
    board = [...board, ...readline()
      .split('')
      .map(c => {
        if (c === '1') return 1;
        else if (c === '0') return 0;
        else return -1;
      })];
  }

  const numValidActions: number = parseInt(readline());
  for (let i = 0; i < numValidActions; i++) {
    parseInt(readline());
  }
  const _oppPreviousAction: number = parseInt(readline());

  return new Connect4State(isFirstPlayer ? 0 : 1, isOurTurn, board);
}