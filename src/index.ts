import { Action, playActions } from './io/action';
import { parseGameState, parseMapSize } from './io/parser';
import { randomPosition } from './util/random';

const mapSize = parseMapSize();

while (true) {
  const state = parseGameState(mapSize);

  const myUnits = state.tileList.filter(tile => tile.owner === 'me' && tile.units > 0);
  const actions: Action[] = myUnits.map(tile => {
    return { type: 'MOVE', from: tile.position, to: randomPosition(mapSize), amount: tile.units }
  });

  playActions(actions);
}
