export const SELECT_SQUARE = 'SELECT_SQUARE';
export const MOVES_ORDER = 'MOVES_ORDER';
export const GO_TO_MOVE = 'GO_TO_MOVE';
export const RESTART_GAME = 'RESTART_GAME';

export function selectSquare(i) {
  return { type: SELECT_SQUARE, i };
}

export function changeMovesOrder() {
  return { type: MOVES_ORDER };
}

export function goToMove(step) {
  return { type: GO_TO_MOVE, step };
}

export function restartGame() {
  return { type: RESTART_GAME };
}
