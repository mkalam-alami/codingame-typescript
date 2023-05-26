import { Action, playActions } from './io/action';
import { parseMap, parseMapState } from './io/parser';

const map = parseMap();

while (true) {
  const state = parseMapState(map);

  const actions: Action[] = [];
  for (const cell of state.cells) {
    actions.push({ type: 'BEACON', cellIndex: cell.index, weight: 1 });
  }

  playActions(actions);
}
