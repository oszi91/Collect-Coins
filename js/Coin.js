import VariablesFromHTML from './VariablesFromHTML';
import Config from './Config';

class Coin{
    randomCoinPosition() {
        return {
            x: Math.floor(Math.random() * Config.GRID_SIZE) + 1,
            y: Math.floor(Math.random() * Config.GRID_SIZE) + 1
        }
    };

    drawCoin(coinPosition) {
        const coinEl = document.createElement('div');
        coinEl.style.gridColumnStart = coinPosition.x;
        coinEl.style.gridRowStart = coinPosition.y;
        coinEl.classList.add('coin');
        VariablesFromHTML.game.appendChild(coinEl);
    };
}

export default Coin;