import React from 'react';
import '../App.css';
import Board from './Board';

class Game extends React.Component {
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
