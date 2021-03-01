import '../sass/main.scss';

class Game {

    game = document.querySelector('.game');
    score = document.querySelector('.score__number')

    gridSize = 11;
    counter = 0;

    charPosition = {
        x: this.gridCenterPosition(),
        y: this.gridCenterPosition()
    };

    coinPosition = this.randomCoinPosition()

    charDirection = {
        x: 0,
        y: 0
    };

    beforeTime = performance.now();
    gameSpeed = 5;

    init() {
        this.play();
        this.controls();
    }

    randomCoinPosition() {
        return {
            x: Math.floor(Math.random() * this.gridSize) + 1,
            y: Math.floor(Math.random() * this.gridSize) + 1
        }
    };

    gridCenterPosition() {
        return Math.ceil(this.gridSize / 2);
    }

    play(currTime) {
        const secSinceRender = (currTime - this.beforeTime) / 1000;
        requestAnimationFrame((currTime) => this.play(currTime));

        if (secSinceRender < 1 / this.gameSpeed) return;

        this.beforeTime = currTime;
        this.update();
    }

    update() {
        this.updateCoin();
        this.drawCharacter();
        this.updateCharacter();
        this.drawCoin();
    };

    controls() {
        window.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowUp': {
                    this.charDirection = {
                        x: 0,
                        y: -1
                    };
                }
                break;
            case 'ArrowDown': {
                this.charDirection = {
                    x: 0,
                    y: 1
                };
            }
            break;
            case 'ArrowLeft': {
                this.charDirection = {
                    x: -1,
                    y: 0
                };
            }
            break;
            case 'ArrowRight': {
                this.charDirection = {
                    x: 1,
                    y: 0
                };
            }
            break;
            }
        })
    };

    drawCharacter() {
        this.game.innerHTML = '';

        const charEl = document.createElement('div');
        charEl.style.gridColumnStart = this.charPosition.x;
        charEl.style.gridRowStart = this.charPosition.y;
        charEl.classList.add('character');
        this.game.appendChild(charEl);
    };

    updateCharacter() {
        this.charPosition.x += this.charDirection.x
        this.charPosition.y += this.charDirection.y
    }

    drawCoin() {
        const coinEl = document.createElement('div');
        coinEl.style.gridColumnStart = this.coinPosition.x;
        coinEl.style.gridRowStart = this.coinPosition.y;
        coinEl.classList.add('coin');
        this.game.appendChild(coinEl);
    };

    isOnTheSamePosition(){
        return this.coinPosition.x === this.charPosition.x && this.coinPosition.y === this.charPosition.y
    }

    updateCoin() {
        if(this.isOnTheSamePosition()){
            this.coinPosition = this.randomCoinPosition();
            this.counter++;
        }
        this.score.textContent = this.counter;
    }

};

const game = new Game();
game.init();