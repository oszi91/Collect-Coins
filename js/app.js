import '../sass/main.scss';

class Game {

    game = document.querySelector('.game');
    score = document.querySelector('.score__number');
    speed = document.querySelector('.speed__number');
    coins = document.querySelector('.coins__number');
    gameOverBoard = document.querySelector('.game-over');
    gameOverBtn = document.querySelector('.game-over__restart');
    gameStatus = false;
    stopGame = false;

    gridSize = 6;
    counter = 0;
    wonScore = 100;
    coinsBonusNumber = [1,2,3,4,5];

    charPosition = {
        x: this.gridCenterPosition(),
        y: this.gridCenterPosition()
    };

    coinPosition = this.randomCoinPositionGrid();

    charDirection = {
        x: 0,
        y: 0
    };

    charLastDirection = {
        x: 0,
        y: 0
    }

    beforeTime = performance.now();

    gameSpeed = 6;
    gameSpeedDiffToHtml = this.gameSpeed;
    gameSpeedUpgrade = 0.1;

    gameMusic;

    init() {
        this.gameMusic = new Audio();
        this.gameMusic.src = './../sounds/retrowave.mp3';
        this.gameMusic.play();
        this.setGameboardSize();
        this.play();
        this.controls();
    };

    setGameboardSize() {
        this.game.style.gridTemplateRows = `repeat(${this.gridSize+1}, 1fr)`;
        this.game.style.gridTemplateColumns = `repeat(${this.gridSize+1}, 1fr)`;
    }

    randomCoinPosition() {
        return {
            x: Math.floor(Math.random() * this.gridSize) + 1,
            y: Math.floor(Math.random() * this.gridSize) + 1
        }
    };

    randomCoinPositionGrid() {
        let coinPosition;
        while (!coinPosition || this.isOnTheSamePosition(coinPosition)) {
            coinPosition = this.randomCoinPosition();
        };
        return coinPosition;
    }

    gridCenterPosition() {
        return Math.ceil(this.gridSize / 2);
    };

    gameSpeedUpdate() {
        let actualSpeedGame = this.gameSpeed += this.gameSpeedUpgrade;
        return actualSpeedGame;
    };

    play(currTime) {
        if (this.stopGame) return;

        const secSinceRender = (currTime - this.beforeTime) / 1000;
        requestAnimationFrame((currTime) => this.play(currTime));

        if (secSinceRender < 1 / this.gameSpeed) return;

        this.beforeTime = currTime;
        this.update();
    }

    update() {
        this.gameStatus = this.gameOver();

        if (this.counter >= this.wonScore) {
            this.stopGame = true;
            document.querySelector('.game-over__text').innerHTML = `Wow, 100 coins! <br/> You Won!`;
            this.gameOverBoard.classList.add('game-over--visible');
            this.gameOverBtn.addEventListener('click', () => location.reload());
        } else if (this.gameStatus) {
            this.stopGame = true;
            this.gameMusic.pause();
            const gameOver = new Audio();
            gameOver.src = './../sounds/game-over.wav';
            gameOver.play();
            this.gameOverBoard.classList.add('game-over--visible');
            this.gameOverBtn.addEventListener('click', () => location.reload());
            return;
        } else {
            this.updateCharacter();
            this.updateCoin();
            this.drawCharacter();
            this.drawCoin();
        }
    };

    keyUp = document.querySelector('.keyboard__up');
    keyDown = document.querySelector('.keyboard__down');
    keyLeft = document.querySelector('.keyboard__left');
    keyRight = document.querySelector('.keyboard__right');

    controls() {
  
        const keydown = ['keydown', 'ArrowUp','ArrowDown', 'ArrowLeft', 'ArrowRight', 'e.key'];
        const onClick = ['click', this.keyUp, this.keyDown, this.keyLeft, this.keyRight, 'e.target'];

        const controlUpd = (kind, up, down, left, right, ekind) => {
            window.addEventListener(kind, e => {
                let eswitch;
                if(ekind === 'e.key'){
                    eswitch = e.key;
                } else if (ekind === 'e.target'){
                    eswitch = e.target;
                }

                switch (eswitch) {
                    case up: {
                        if (this.charLastDirection.y !== 0) break;
                        this.charDirection = {
                            x: 0,
                            y: -1
                        };
                        break;
                    }
                    case down: {
                        if (this.charLastDirection.y !== 0) break;
                        this.charDirection = {
                            x: 0,
                            y: 1
                        };
                        break;
                    }
                    case left: {
                        if (this.charLastDirection.x !== 0) break;
                        this.charDirection = {
                            x: -1,
                            y: 0
                        };
                        break;
                    }
                    case right: {
                        if (this.charLastDirection.x !== 0) break;
                        this.charDirection = {
                            x: 1,
                            y: 0
                        };
                    }
                    break;
                }
            })
        }
        controlUpd(onClick[0],onClick[1],onClick[2],onClick[3],onClick[4], onClick[5]);
        controlUpd(keydown[0],keydown[1],keydown[2],keydown[3],keydown[4], keydown[5]);
    };

    controlDirectionUpdate() {
        this.charLastDirection = this.charDirection;
        return this.charLastDirection;
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
        this.controlDirectionUpdate();
        this.charPosition.x += this.charDirection.x
        this.charPosition.y += this.charDirection.y
    };

    gameOver() {
        return (this.charPosition.x < 1 || this.charPosition.y < 1 || this.charPosition.x > this.gridSize || this.charPosition.y > this.gridSize)
    };

    drawCoin() {
        const coinEl = document.createElement('div');
        coinEl.style.gridColumnStart = this.coinPosition.x;
        coinEl.style.gridRowStart = this.coinPosition.y;
        coinEl.classList.add('coin');
        this.game.appendChild(coinEl);
    };

    isOnTheSamePosition(coinPos) {
        return coinPos.x === this.charPosition.x && coinPos.y === this.charPosition.y
    };

    updateCoin() {
        const checkPosition = this.isOnTheSamePosition(this.coinPosition);
        let coinsBonus;

        if (checkPosition) {
            const coinSound = new Audio();
            coinSound.src = './../sounds/coin-collect.wav';
            coinSound.play();
            this.gameSpeedUpdate();
            this.coinPosition = this.randomCoinPositionGrid();

            let speedGame = this.gameSpeed.toFixed(1);
            let gameSpeedHtml = (speedGame - this.gameSpeedDiffToHtml + 1).toFixed(1);

            if (speedGame > this.gameSpeedDiffToHtml+1 && speedGame <= (this.gameSpeedDiffToHtml+2)) {
                coinsBonus = this.coinsBonusNumber[1];
                this.counter += coinsBonus;
            } else if (speedGame > (this.gameSpeedDiffToHtml+2) && speedGame <= (this.gameSpeedDiffToHtml+3)) {
                coinsBonus = this.coinsBonusNumber[2];
                this.counter += coinsBonus;
            } else if (speedGame > (this.gameSpeedDiffToHtml+3) && speedGame <= (this.gameSpeedDiffToHtml+4)) {
                coinsBonus = this.coinsBonusNumber[3];
                this.counter += coinsBonus;
            } else if (speedGame > this.gameSpeedDiffToHtml+4) {
                coinsBonus = this.coinsBonusNumber[4];
                this.counter += coinsBonus;
            } else {
                coinsBonus = this.coinsBonusNumber[0];
                this.counter++;
            };

            this.speed.textContent = `x${gameSpeedHtml}`;
            this.coins.textContent = `x${coinsBonus}`;
        };
        this.score.textContent = this.counter;
    };

};

const game = new Game();
game.init();