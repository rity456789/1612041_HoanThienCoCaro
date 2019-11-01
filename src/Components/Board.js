/* eslint-disable react/destructuring-assignment */
import React from 'react';
import '../App.css';
import Square from './Square';

class Board extends React.Component {
  readerTable() {
    const table = [];
    const { winLine } = this.props;
    // Outer loop to create parent
    for (let i = 0; i < 20; i += 1) {
      const row = [];
      // Inner loop to create row
      for (let j = 0; j < 20; j += 1) {
        row.push(
          <Square
            key={20 * i + j}
            value={this.props.squares[20 * i + j]}
            onSquareClick={() => this.props.onSquareClick(20 * i + j)}
            isHighlight={winLine && winLine.includes(20 * i + j)}
          />
        );
      }
      // Create the parent and add the row
      table.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return table;
  }

  render() {
    return <div>{this.readerTable()}</div>;
  }
}

export default Board;
