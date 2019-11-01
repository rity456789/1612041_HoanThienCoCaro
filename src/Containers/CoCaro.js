import { connect } from 'react-redux';
import {
  selectSquare,
  goToMove,
  changeMovesOrder,
  restartGame
} from '../Actions/index';
import Game from '../Components/Game';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onSquareClick: i => {
      dispatch(selectSquare(i));
    },
    jumpTo: step => {
      dispatch(goToMove(step));
    },
    handleSortToggle: () => {
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
