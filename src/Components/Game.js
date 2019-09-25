import React from 'react';
import '../App.css';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
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
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = this.state.winner;
        if (winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    latestMoveSquare: i
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
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
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        squares[i] = this.state.xIsNext ? "X" : "O";
        var length = 1;
        var chanDauTren = false;
        var chanDauDuoi = false;
        var line = new Array();
        line.push(i);

        //check upper
        //co the lap het squares r check line nhung se ton chi phi
        for (let j = i - 20; j >= 0; j -= 20) {
            if (squares[j] == null) break;
            if (squares[j] != squares[i]) {
                chanDauTren = true;
                break;
            }
            length++;
            line.push(j);
        }

        //check lower
        for (let j = i + 20; j < 400; j += 20) {
            if (squares[j] == null) break;
            if (squares[j] != squares[i]) {
                chanDauDuoi = true;
                break;
            }
            length++;
            line.push(j);
        }
        //win
        if (length >= 5 && (!chanDauTren || !chanDauDuoi)) {
            this.setState({
                winner: squares[i],
                winLine: line,
            })
        }
    }

    checkWinHorizontalLine(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        squares[i] = this.state.xIsNext ? "X" : "O";
        var length = 1;
        var chanDauTrai = false;
        var chanDauPhai = false;
        var line = new Array();
        line.push(i);

        //check left
        //co the lap het squares r check line nhung se ton chi phi
        for (let j = i - 1; parseInt(j / 20) == parseInt(i / 20); j--) {
            if (squares[j] == null) break;
            if (squares[j] != squares[i]) {
                chanDauTrai = true;
                break;
            }
            length++;
            line.push(j);
        }

        //check right
        for (let j = i + 1; parseInt(j / 20) == parseInt(i / 20); j++) {
            if (squares[j] == null) break;
            if (squares[j] != squares[i]) {
                chanDauPhai = true;
                break;
            }
            length++;
            line.push(j);
        }
        //win
        if (length >= 5 && (!chanDauTrai || !chanDauPhai)) {
            this.setState({
                winner: squares[i],
                winLine: line,
            })
        }
    }

    checkWinFirstDiagonalLine(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        squares[i] = this.state.xIsNext ? "X" : "O";
        var length = 1;
        var chanDauTren = false;
        var chanDauDuoi = false;
        var line = new Array();
        line.push(i);

        //check upper
        //co the lap het squares r check line nhung se ton chi phi
        for (let j = i - 21; j >= 0; j -= 21) {
            if (squares[j] == null) break;
            if (squares[j] != squares[i]) {
                chanDauTren = true;
                break;
            }
            length++;
            line.push(j);
        }

        //check lower
        for (let j = i + 21; j < 400; j += 21) {
            if (squares[j] == null) break;
            if (squares[j] != squares[i]) {
                chanDauDuoi = true;
                break;
            }
            length++;
            line.push(j);
        }
        //win
        if (length >= 5 && (!chanDauTren || !chanDauDuoi)) {
            this.setState({
                winner: squares[i],
                winLine: line,
            })
        }
    }

    checkWinSecondDiagonalLine(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        squares[i] = this.state.xIsNext ? "X" : "O";
        var length = 1;
        var chanDauTren = false;
        var chanDauDuoi = false;
        var line = new Array();
        line.push(i);

        //check upper
        //co the lap het squares r check line nhung se ton chi phi
        for (let j = i - 19; j >= 0; j -= 19) {
            if (squares[j] == null) break;
            if (squares[j] != squares[i]) {
                chanDauTren = true;
                break;
            }
            length++;
            line.push(j);
        }

        //check lower
        for (let j = i + 19; j < 400; j += 19) {
            if (squares[j] == null) break;
            if (squares[j] != squares[i]) {
                chanDauDuoi = true;
                break;
            }
            length++;
            line.push(j);
        }
        //win
        if (length >= 5 && (!chanDauTren || !chanDauDuoi)) {
            this.setState({
                winner: squares[i],
                winLine: line,
            })
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    handleSortToggle() {
        this.setState({
            isAscending: !this.state.isAscending
        });
    }


    restart() {
        this.setState({
            history: [
                {
                    squares: Array(400).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            winner: null,
            winLine: null,
            isAscending: true
        })
    }

    renderRestartBtn() {
        return <button className="btnRestart" onClick={() => this.restart()}>Restart</button>
    }

    render() {
        const history = this.state.history;
        const stepNumber = this.state.stepNumber;
        const current = history[stepNumber];
        const winner = this.state.winner;
        const winLine = this.state.winLine;

        let moves = history.map((step, move) => {
            const latestMoveSquare = step.latestMoveSquare;
            const col = 1 + latestMoveSquare % 20;
            const row = 1 + Math.floor(latestMoveSquare / 20);
            const desc = move ?
                `Go to move #${move} (col: ${col}, row: ${row})` :
                'Go to game start';
            return (
                <li key={move}>
                    {/* Bold the currently selected item */}
                    <button
                        className={move === stepNumber ? 'move-list-selected' : ''}
                        onClick={() => this.jumpTo(move)}>{desc}
                    </button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        const isAscending = this.state.isAscending;
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
                        <button onClick={() => this.handleSortToggle()}>
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
