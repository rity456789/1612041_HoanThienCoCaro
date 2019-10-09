import React from 'react';
import '../App.css';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleClick(i) {
    const { historyTable, stepNumber } = this.state;
    const history = historyTable.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const { winner } = this.state;
    if (winner || squares[i]) {
      return;
    }
    const { xIsNext } = this.state;
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      historyTable: historyTable.concat([
        {
          squares,
          latestMoveSquare: i
        }
      ]),
      stepNumber: historyTable.length,
      xIsNext: !xIsNext
    });
    this.calculateWinner(i);
  }

  calculateWinner(i) {
    // check win vertical line
    this.checkWinVerticalLine(i);
    // check win horizontal line
    this.checkWinHorizontalLine(i);
    // check win first (\) diagonal line
    this.checkWinFirstDiagonalLine(i);
    // check win second (/) diagonal line
    this.checkWinSecondDiagonalLine(i);
  }

  checkWinVerticalLine(i) {
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
  }

  checkWinHorizontalLine(i) {
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
  }

  checkWinFirstDiagonalLine(i) {
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
  }

  checkWinSecondDiagonalLine(i) {
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
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  handleSortToggle() {
    const { isLastAscending } = this.state;
    this.setState({
      isAscending: isLastAscending
    });
  }

  restart() {
    this.setState({
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
    });
  }

  renderRestartBtn() {
    return (
      <button
        type="button"
        className="btnRestart"
        onClick={() => this.restart()}
      >
        Restart
      </button>
    );
  }

  render() {
    const { historyTable } = this.state;
    const { stepNumber } = this.state;
    const current = historyTable[stepNumber];
    const { winner } = this.state;
    const { winLine } = this.state;

    const moves = historyTable.map((step, move) => {
      const { latestMoveSquare } = step;
      const col = 1 + (latestMoveSquare % 20);
      const row = 1 + Math.floor(latestMoveSquare / 20);
      const desc = move
        ? `Go to move #${move} (col: ${col}, row: ${row})`
        : 'Go to game start';
      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={move}>
          {/* Bold the currently selected item */}
          <button
            type="button"
            className={move === stepNumber ? 'move-list-selected' : ''}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    const { xIsNext } = this.state;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    const { isAscending } = this.state;
    if (!isAscending) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winLine={winLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{this.renderRestartBtn()}</div>
          <div>
            <button type="button" onClick={() => this.handleSortToggle()}>
              {isAscending ? 'descending' : 'ascending'}
            </button>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
