import React from 'react';
import '../App.css';
import Board from './Board';

class Game extends React.Component {
  renderRestartBtn() {
    const { restart } = this.props;
    return (
      <button type="button" className="btnRestart" onClick={() => restart()}>
        Restart
      </button>
    );
  }

  render() {
    const { historyTable } = this.props;
    const { stepNumber } = this.props;
    const current = historyTable[stepNumber];
    const { winner } = this.props;
    const { winLine } = this.props;
    const { jumpTo } = this.props;

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
            onClick={() => jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    const { xIsNext } = this.props;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    const { isAscending } = this.props;
    if (!isAscending) {
      moves.reverse();
    }

    const { onSquareClick } = this.props;
    const { handleSortToggle } = this.props;

    return (
      <div>
        <h1 className="title">Ban co caro Viet Nam</h1>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onSquareClick={i => onSquareClick(i)}
              winLine={winLine}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>{this.renderRestartBtn()}</div>
            <div>
              <button type="button" onClick={() => handleSortToggle()}>
                {isAscending ? 'descending' : 'ascending'}
              </button>
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
