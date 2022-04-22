import { logAction } from "./io/action";
import { parseGameSettings, parseGameState } from "./io/parser";
import { randomPosition } from "./utils";

const settings = parseGameSettings();

while (true) {
    const state = parseGameState();

    const myHeroes = state.entities.filter(e => e.type === 'my-hero');
    for (const myHero of myHeroes) {
        const targetPosition = randomPosition();
        logAction({ type: 'MOVE', x: targetPosition.x, y: targetPosition.y });
    }
}
