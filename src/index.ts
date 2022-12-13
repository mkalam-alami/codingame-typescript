import { Action, playActions } from './io/action';
import { parseGameState, parseMapSize } from './io/parser';
import { randomPosition } from './util/random';

const MAP_SIZE = parseMapSize();

while (true) {
  const state = parseGameState(MAP_SIZE);

  const myUnits = state.tileList.filter(tile => tile.owner === 'me' && tile.units > 0);
  const actions: Action[] = myUnits.map(tile => {
    return { type: 'MOVE', from: tile.position, to: randomPosition(MAP_SIZE), amount: tile.units }
  });

  playActions(actions);
}
