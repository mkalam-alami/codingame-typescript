import { playAction } from "./action";
import { parseCompetitionState, parseScore, parseMinigameStates } from "./parser";

const { playerIdx, nbGames } = parseCompetitionState();

while (true) {
    parseScore();

    const miniGame = parseMinigameStates(nbGames)[0];
    const myPosition = miniGame['reg' + playerIdx];
    const inFrontOfMe = miniGame.gpu[myPosition + 1];
    
    playAction(inFrontOfMe === '#' ? 'UP' : 'LEFT');
}
