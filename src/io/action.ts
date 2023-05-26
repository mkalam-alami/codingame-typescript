
export interface LineAction {
  type: 'LINE';
  fromCellIndex: number;
  toCellIndex: number;
  weight: number;
}

export interface BeaconAction {
  type: 'BEACON';
  cellIndex: number;
  weight: number;
}

export interface WaitAction {
  type: 'WAIT';
}

export interface MessageAction {
  type: 'MESSAGE';
  text: string;
}

export type Action = LineAction | BeaconAction | WaitAction | MessageAction;

export function playActions(actions: Action[]) {
  const commands = actions.map(action => {
    switch (action.type) {
      case 'LINE': return `LINE ${action.fromCellIndex} ${action.toCellIndex} ${action.weight}`;
      case 'BEACON': return `BEACON ${action.cellIndex} ${action.weight}`;
      case 'MESSAGE': return `MESSAGE ${action.text}`;
      default: return action.type;
    }
  });
  console.log(commands.join(';') || 'WAIT');
}
