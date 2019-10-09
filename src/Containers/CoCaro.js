import { connect } from 'react-redux';
import {
  selectSquare,
  goToMove,
  changeMovesOrder,
  restartGame
} from '../Actions/index';
import Game from '../Components/Game';

const mapStateToProps = state => {
  console.log(state);
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onSquareClick: id => {
      dispatch(selectSquare(id));
    },
    jumpTo: step => {
      dispatch(goToMove(step));
    },
    sortMoves: () => {
      dispatch(changeMovesOrder());
    },
    restart: () => {
      dispatch(restartGame());
    }
  };
};

const CoCaro = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default CoCaro;
