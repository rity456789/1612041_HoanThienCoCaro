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

function CoCaro(state = initialState, action) {
  switch (action.type) {
    case MOVES_ORDER:
      return { ...state, isAscending: !state.isAscending };

    case GO_TO_MOVE:
      return {
        ...state,
        history: state.history.slice(0, action.step + 1),
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
      const { historyTable, stepNumber } = state;
      const history = historyTable.slice(0, stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const { winner } = state;
      if (winner || squares[i]) {
        break;
      }
      const { xIsNext } = state;
      squares[action.index] = xIsNext ? 'X' : 'O';
      this.calculateWinner(i);
      return {
        ...state,
        historyTable: historyTable.concat([
          {
            squares,
            latestMoveSquare: i
          }
        ]),
        stepNumber: historyTable.length,
        xIsNext: !xIsNext
      };

    default:
      return state;
  }
}

calculateWinner = i => {
  // check win vertical line
  this.checkWinVerticalLine(i);
  // check win horizontal line
  this.checkWinHorizontalLine(i);
  // check win first (\) diagonal line
  this.checkWinFirstDiagonalLine(i);
  // check win second (/) diagonal line
  this.checkWinSecondDiagonalLine(i);
};

checkWinVerticalLine = i => {
  const { historyTable, stepNumber } = this.state;
  const history = historyTable.slice(0, stepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  const { xIsNext } = this.state;
  squares[i] = xIsNext ? 'X' : 'O';
  let length = 1;
  let chanDauTren = false;
  let chanDauDuoi = false;
  const line = new Array(20);
  line.push(i);

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
    this.setState({
      winner: squares[i],
      winLine: line
    });
  }
};

checkWinHorizontalLine = i => {
  const { historyTable, stepNumber } = this.state;
  const history = historyTable.slice(0, stepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  const { xIsNext } = this.state;
  squares[i] = xIsNext ? 'X' : 'O';
  let length = 1;
  let chanDauTrai = false;
  let chanDauPhai = false;
  const line = new Array(20);
  line.push(i);

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
    this.setState({
      winner: squares[i],
      winLine: line
    });
  }
};

checkWinFirstDiagonalLine = i => {
  const { historyTable, stepNumber } = this.state;
  const history = historyTable.slice(0, stepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  const { xIsNext } = this.state;
  squares[i] = xIsNext ? 'X' : 'O';
  let length = 1;
  let chanDauTren = false;
  let chanDauDuoi = false;
  const line = new Array(20);
  line.push(i);

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
    this.setState({
      winner: squares[i],
      winLine: line
    });
  }
};

checkWinSecondDiagonalLine = i => {
  const { historyTable, stepNumber } = this.state;
  const history = historyTable.slice(0, stepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  const { xIsNext } = this.state;
  squares[i] = xIsNext ? 'X' : 'O';
  let length = 1;
  let chanDauTren = false;
  let chanDauDuoi = false;
  const line = new Array(20);
  line.push(i);

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
    this.setState({
      winner: squares[i],
      winLine: line
    });
  }
};

export default CoCaro;
