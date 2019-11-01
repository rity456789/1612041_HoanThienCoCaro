import {
  SELECT_SQUARE,
  MOVES_ORDER,
  GO_TO_MOVE,
  RESTART_GAME
} from '../Actions/index';

const initialState = {
  historyTable: [
    {
      squares: Array(400).fill(null)
    }
  ],
  stepNumber: 0,
  xIsNext: true,
  winner: null,
  winLine: null,
  isAscending: true
};

function checkWinVerticalLine(i, squares) {
  let length = 1;
  let chanDauTren = false;
  let chanDauDuoi = false;
  const line = new Array(20);
  line.push(i);

  const res = {
    winner: null,
    winLine: null
  };

  // check upper
  // co the lap het squares r check line nhung se ton chi phi
  for (let j = i - 20; j >= 0; j -= 20) {
    if (squares[j] == null) break;
    if (squares[j] !== squares[i]) {
      chanDauTren = true;
      break;
    }
    length += 1;
    line.push(j);
  }

  // check lower
  for (let j = i + 20; j < 400; j += 20) {
    if (squares[j] == null) break;
    if (squares[j] !== squares[i]) {
      chanDauDuoi = true;
      break;
    }
    length += 1;
    line.push(j);
  }
  // win
  if (length >= 5 && (!chanDauTren || !chanDauDuoi)) {
    res.winner = squares[i];
    res.winLine = line;
  }
  return res;
}

function checkWinHorizontalLine(i, squares) {
  let length = 1;
  let chanDauTrai = false;
  let chanDauPhai = false;
  const line = new Array(20);
  line.push(i);

  const res = {
    winner: null,
    winLine: null
  };

  // check left
  // co the lap het squares r check line nhung se ton chi phi
  for (let j = i - 1; parseInt(j / 20, 10) === parseInt(i / 20, 10); j -= 1) {
    if (squares[j] == null) break;
    if (squares[j] !== squares[i]) {
      chanDauTrai = true;
      break;
    }
    length += 1;
    line.push(j);
  }

  // check right
  for (let j = i + 1; parseInt(j / 20, 10) === parseInt(i / 20, 10); j += 1) {
    if (squares[j] == null) break;
    if (squares[j] !== squares[i]) {
      chanDauPhai = true;
      break;
    }
    length += 1;
    line.push(j);
  }
  // win
  if (length >= 5 && (!chanDauTrai || !chanDauPhai)) {
    res.winner = squares[i];
    res.winLine = line;
  }
  return res;
}

function checkWinFirstDiagonalLine(i, squares) {
  let length = 1;
  let chanDauTren = false;
  let chanDauDuoi = false;
  const line = new Array(20);
  line.push(i);

  const res = {
    winner: null,
    winLine: null
  };

  // check upper
  // co the lap het squares r check line nhung se ton chi phi
  for (let j = i - 21; j >= 0; j -= 21) {
    if (squares[j] == null) break;
    if (squares[j] !== squares[i]) {
      chanDauTren = true;
      break;
    }
    length += 1;
    line.push(j);
  }

  // check lower
  for (let j = i + 21; j < 400; j += 21) {
    if (squares[j] == null) break;
    if (squares[j] !== squares[i]) {
      chanDauDuoi = true;
      break;
    }
    length += 1;
    line.push(j);
  }
  // win
  if (length >= 5 && (!chanDauTren || !chanDauDuoi)) {
    res.winner = squares[i];
    res.winLine = line;
  }
  return res;
}

function checkWinSecondDiagonalLine(i, squares) {
  let length = 1;
  let chanDauTren = false;
  let chanDauDuoi = false;
  const line = new Array(20);
  line.push(i);

  const res = {
    winner: null,
    winLine: null
  };

  // check upper
  // co the lap het squares r check line nhung se ton chi phi
  for (let j = i - 19; j >= 0; j -= 19) {
    if (squares[j] == null) break;
    if (squares[j] !== squares[i]) {
      chanDauTren = true;
      break;
    }
    length += 1;
    line.push(j);
  }

  // check lower
  for (let j = i + 19; j < 400; j += 19) {
    if (squares[j] == null) break;
    if (squares[j] !== squares[i]) {
      chanDauDuoi = true;
      break;
    }
    length += 1;
    line.push(j);
  }
  // win
  if (length >= 5 && (!chanDauTren || !chanDauDuoi)) {
    res.winner = squares[i];
    res.winLine = line;
  }
  return res;
}

function calculateWinner(i, squares) {
  let res = {
    winner: null,
    winLine: null
  };
  // check win vertical line
  res = checkWinVerticalLine(i, squares);
  if (res.winner != null) return res;

  // check win horizontal line
  res = checkWinHorizontalLine(i, squares);
  if (res.winner != null) return res;

  // check win first (\) diagonal line
  res = checkWinFirstDiagonalLine(i, squares);
  if (res.winner != null) return res;

  // check win second (/) diagonal line
  res = checkWinSecondDiagonalLine(i, squares);
  return res;
}

function CoCaro(state = initialState, action) {
  switch (action.type) {
    case MOVES_ORDER:
      return { ...state, isAscending: !state.isAscending };

    case GO_TO_MOVE:
      if (state.winner) return state;
      return {
        ...state,
        historyTable: state.historyTable.slice(0, action.step + 1),
        stepNumber: action.step,
        xIsNext: action.step % 2 === 0
      };

    case RESTART_GAME:
      return {
        ...state,
        historyTable: [
          {
            squares: Array(400).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        winner: null,
        winLine: null,
        isAscending: true
      };

    case SELECT_SQUARE:
      const i = action.i;
      const { historyTable } = state;
      const current = historyTable[historyTable.length - 1];
      const squares = current.squares.slice();
      const { winner } = state;
      if (winner || squares[i]) {
        return state;
      }
      const { xIsNext } = state;
      squares[action.i] = xIsNext ? 'X' : 'O';
      const res = calculateWinner(i, squares);
      return {
        ...state,
        historyTable: historyTable.concat([
          {
            squares,
            latestMoveSquare: i
          }
        ]),
        stepNumber: historyTable.length,
        xIsNext: !xIsNext,
        winner: res.winner,
        winLine: res.winLine
      };

    default:
      return state;
  }
}

export default CoCaro;
