import Config from './Config';
import VariablesFromHTML from './VariablesFromHTML';

class Character{
    gridCenterPosition() {
        return Math.ceil(Config.GRID_SIZE / 2);
    };

    charPosition = {
        x: this.gridCenterPosition(),
        y: this.gridCenterPosition()
    };

    drawCharacter() {
        VariablesFromHTML.game.innerHTML = '';

        const charEl = document.createElement('div');
        charEl.style.gridColumnStart = this.charPosition.x;
        charEl.style.gridRowStart = this.charPosition.y;
        charEl.classList.add('character');
        VariablesFromHTML.game.appendChild(charEl);
    };
};

export default Character;