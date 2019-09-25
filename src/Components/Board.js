import React from 'react';
import '../App.css';
import Square from './Square';

class Board extends React.Component {


    readerTable() {
        let table = []
        const winLine = this.props.winLine;
        // Outer loop to create parent
        for (let i = 0; i < 20; i++) {
            let row = []
            //Inner loop to create row
            for (let j = 0; j < 20; j++) {
                row.push(<Square
                    key={20 * i + j}
                    value={this.props.squares[20 * i + j]}
                    onClick={() => this.props.onClick(20 * i + j)}
                    isHighlight={winLine && winLine.includes(20 * i + j)}
                />)
            }
            //Create the parent and add the row
            table.push(<div key={i} className="board-row">{row}</div>)
        }
        return table
    }

    render() {
        return (
            <div>
                {this.readerTable()}
            </div>
        );
    }
}

export default Board;
