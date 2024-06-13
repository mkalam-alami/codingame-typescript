import { playAction } from "./action";
import { parseCompetitionState, parseScores, parseMinigameStates } from "./parser";

const { playerIdx, nbGames } = parseCompetitionState();

while (true) {
    parseScores();

    const miniGame = parseMinigameStates(nbGames)[0];
    const myPosition = miniGame['reg' + playerIdx];
    const inFrontOfMe = miniGame.gpu[myPosition + 1];
    
    playAction(inFrontOfMe === '#' ? 'UP' : 'LEFT');
}
