import React from 'react';
import '../App.css';

class Square extends React.Component {
    render() {
        const className = 'square' + (this.props.isHighlight ? ' highlight' : '');
        return (
            <button className={className} onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;
