export type Action = 'UP' | 'LEFT' | 'RIGHT' | 'DOWN';

export function playAction(action: Action) {
    console.log(action);
}
