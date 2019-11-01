import React from 'react';
import '../App.css';

class Square extends React.PureComponent {
  render() {
    const { isHighlight, onSquareClick, value } = this.props;
    const className = `square${isHighlight ? ' highlight' : ''}`;
    return (
      <button
        type="button"
        className={className}
        onClick={() => onSquareClick()}
      >
        {value}
      </button>
    );
  }
}

export default Square;
