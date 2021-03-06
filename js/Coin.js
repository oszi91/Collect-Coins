import VariablesFromHTML from './VariablesFromHTML';

class Coin{
    randomCoinPosition(gridSize) {
        return {
            x: Math.floor(Math.random() * gridSize) + 1,
            y: Math.floor(Math.random() * gridSize) + 1
        };
    };

    drawCoin(coinPosition) {
        const coinEl = document.createElement('div');
        coinEl.style.gridColumnStart = coinPosition.x;
        coinEl.style.gridRowStart = coinPosition.y;
        coinEl.classList.add('coin');
        VariablesFromHTML.game.appendChild(coinEl);
    };
};

export default Coin;