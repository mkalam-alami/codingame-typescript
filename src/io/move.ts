export type Move = WaitMove | GrowMove | SeedMove | CompleteMove;

export interface WaitMove {
  type: 'WAIT';
}

export interface GrowMove {
  type: 'GROW';
  cellId: number;
}

export interface SeedMove {
  type: 'SEED';
  sourceId: number;
  targetId: number;
}
export interface CompleteMove {
  type: 'COMPLETE';
  cellId: number;
}

export function formatMove(move: Move) {
  switch (move.type) {
    case "WAIT": return `${move.type}`;
    case "GROW": return `${move.type} ${move.cellId}`;
    case "SEED": return `${move.type} ${move.sourceId} ${move.targetId}`;
    case "COMPLETE": return `${move.type} ${move.cellId}`;
    default: throw new Error('Unknown move: ' + JSON.stringify(move));
  }
}
