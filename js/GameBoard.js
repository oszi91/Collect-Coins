import Config from './Config';
import VariablesFromHTML from './VariablesFromHTML';

class GameBoard {
	static setGameboardSize() {
		VariablesFromHTML.game.style.gridTemplateRows = `repeat(${
			Config.GRID_SIZE + 1
		}, 1fr)`;
		VariablesFromHTML.game.style.gridTemplateColumns = `repeat(${
			Config.GRID_SIZE + 1
		}, 1fr)`;
	}
}

export default GameBoard;
