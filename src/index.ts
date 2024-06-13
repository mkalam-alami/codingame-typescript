import { playAction } from "./action";
import { parseCompetitionState, parseScore, parseMinigameStates } from "./parser";

const competition = parseCompetitionState();

while (true) {
    parseScore();

    const miniGame = parseMinigameStates(competition.nbGames)[0];
    const myPosition = miniGame['reg' + competition.playerIdx];

    if (miniGame.gpu[myPosition + 1] === '#') {
        playAction('UP')
    } else {
        playAction('LEFT')
    }
}
