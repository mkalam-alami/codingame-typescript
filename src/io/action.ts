export function logAction(action: Action) {
  let params = '';

  if (action.type === 'MOVE') {
    params = `${action.x} ${action.y}`;

  } else if (action.type === 'SPELL') {
    switch (action.spell) {
      case 'WIND': params = `${action.spell} ${action.x} ${action.y}`; break;
      case 'SHIELD': params = `${action.spell} ${action.entityId}`; break;
      case 'CONTROL': params = `${action.spell} ${action.entityId} ${action.x} ${action.y}`; break;
    }
  }

  console.log(`${action.type} ${params} ${action.caption || ''}`);
}

export interface MoveAction {
  type: 'MOVE';
  x: number;
  y: number;
  caption?: string;
}

export interface SpellWindAction {
  type: 'SPELL';
  spell: 'WIND';
  x: number;
  y: number;
  caption?: string;
}

export interface SpellShieldAction {
  type: 'SPELL';
  spell: 'SHIELD';
  entityId: number;
  caption?: string;
}

export interface SpellControlAction {
  type: 'SPELL';
  spell: 'CONTROL';
  entityId: number;
  x: number;
  y: number;
  caption?: string;
}

export interface WaitAction {
  type: 'WAIT';
  caption?: string;
}

export type SpellAction = SpellWindAction | SpellShieldAction | SpellControlAction;
export type Action = MoveAction | SpellAction | WaitAction;
