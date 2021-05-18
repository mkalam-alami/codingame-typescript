import Connect4State, { Connect4Board, Connect4Move } from "./model/state";
import { Minimax } from "./search/minimax";
import { Move, MoveHeuristic } from "./search/move";
import { StateHeuristic } from "./search/state";

const moveHeuristic: MoveHeuristic<Connect4Board, Connect4Move> = (move: Move, state: Connect4State): number => {
  return 0; // TODO Prefer moves connecting with own pieces
}

const stateHeuristic: StateHeuristic<Connect4Board, Connect4Move> = (state: Connect4State): number => {
  return 0; // TODO Evaluate state with long strings and gaps
}

const connect4minimax = new Minimax(stateHeuristic, moveHeuristic, { maxDepth: 5 });

export default connect4minimax;
