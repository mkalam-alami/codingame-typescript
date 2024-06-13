export interface CompetitionState {
    playerIdx: number;
    nbGames: number;
}

export function parseCompetitionState(): CompetitionState {
    const playerIdx = parseInt(readline());
    const nbGames = parseInt(readline());

    return {
        playerIdx,
        nbGames
    };
}

export interface Score {
    globalScore: number;
    goldMedals: number;
    silverMedals: number;
    bronzeMedals: number
}

export function parseScore(): Score[] {
    const medailles: Score[] = [];
    for (let i = 0; i < 3; i++) {
        const inputs = readline().split(' ');
        medailles.push({
            globalScore: parseInt(inputs[0]),
            goldMedals: parseInt(inputs[1]),
            silverMedals: parseInt(inputs[2]),
            bronzeMedals: parseInt(inputs[3]),
        });
    }
    return medailles;
}

export interface MinigameState {
    gpu: string;
    reg0: number;
    reg1: number;
    reg2: number;
    reg3: number;
    reg4: number;
    reg5: number;
    reg6: number;
}

export function parseMinigameStates(nbGames: number): MinigameState[] {
    const minigameStates: MinigameState[] = [];

    for (let i = 1; i <= nbGames; i++) {
        const inputs = readline().split(' ');
        minigameStates.push({
            gpu: inputs[0],
            reg0: parseInt(inputs[1]),
            reg1: parseInt(inputs[2]),
            reg2: parseInt(inputs[3]),
            reg3: parseInt(inputs[4]),
            reg4: parseInt(inputs[5]),
            reg5: parseInt(inputs[6]),
            reg6: parseInt(inputs[7])
        });
    }

    return minigameStates;
}
