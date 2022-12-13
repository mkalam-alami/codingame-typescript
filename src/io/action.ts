import { Point } from "./parser";

export interface MoveAction {
  type: 'MOVE';
  from: Point;
  to: Point;
  amount: number;
}

export interface BuildAction {
  type: 'BUILD';
  position: Point;
}

export interface SpawnAction {
  type: 'SPAWN';
  position: Point;
  amount: number;
}

export interface WaitAction {
  type: 'WAIT';
}

export interface MessageAction {
  type: 'MESSAGE';
  text: string;
}

export type Action = MoveAction | BuildAction | SpawnAction | WaitAction | MessageAction;

export function playActions(actions: Action[]) {
  const commands = actions.map(action => {
    switch (action.type) {
      case 'MOVE': return `MOVE ${action.amount} ${action.from.x} ${action.from.y} ${action.to.x} ${action.to.y}`;
      case 'BUILD': return `BUILD ${action.position.x} ${action.position.y}`;
      case 'SPAWN': return `SPAWN ${action.amount} ${action.position.x} ${action.position.y}`;
      case 'MESSAGE': return `MESSAGE ${action.text}`;
      default: return action.type;
    }
  });
  console.log(commands.join(';') || 'WAIT');
}
