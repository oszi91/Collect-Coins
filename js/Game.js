import CharacterControl from './CharacterControl';
import Config from './Config';
import VariablesFromHTML from './VariablesFromHTML';
import Character from './Character';
import Coin from './Coin';
import GameBoard from './GameBoard';

class Game {
    characterControl = new CharacterControl();
    character = new Character();
    coin = new Coin();
    
    gameStatus = false;
    stopGame = false;
    musicOn = true;

    scoreCounter = 0;
    gameSpeedDiffToHtml = Config.GAME_SPEED;

    coinPosition;

    beforeTime = performance.now();
    gameMusic;

    sound(sound,src){
        sound = new Audio();
        sound.src = src;
        sound.play();
    }

    randomCoinPositionGrid() {
        let coinPosition;
        while (!coinPosition || this.isOnTheSamePosition(coinPosition)) {
            coinPosition = this.coin.randomCoinPosition(Config.GRID_SIZE);
        };
        return coinPosition;
    }

    gameSpeedUpdate() {
        let actualSpeedGame = Config.GAME_SPEED += Config.GAME_SPEED_UPGRADE;
        return actualSpeedGame;
    };

    play(currTime) {
        if (this.stopGame) return;

        const secSinceRender = (currTime - this.beforeTime) / 1000;
        requestAnimationFrame((currTime) => this.play(currTime));

        if (secSinceRender < 1 / Config.GAME_SPEED) return;

        this.beforeTime = currTime;
        this.update();
    }

    update() {
        this.gameStatus = this.gameOver();

        if (this.scoreCounter >= Config.SCORE_TO_WIN) {
            this.stopGame = true;
            
            VariablesFromHTML.gameOverText.innerHTML = '';
            VariablesFromHTML.winText.innerHTML = `Wow, ${this.scoreCounter} coins! <br/> You Won!`;
            VariablesFromHTML.gameOverBoard.classList.add('game-over--visible');
            VariablesFromHTML.gameOverBtn.addEventListener('click', () => location.reload());
        } else if (this.gameStatus) {
            this.stopGame = true;

            if(this.musicOn){
                VariablesFromHTML.backgroundMusic.pause();
                this.sound(this.gameMusic, './sounds/game-over.wav')
            };

            VariablesFromHTML.gameOverBoard.classList.add('game-over--visible');
            VariablesFromHTML.gameOverBtn.addEventListener('click', () => location.reload());
            return;
        } else {
            this.updateCharacter();
            this.updateCoin();
            this.character.drawCharacter();
            this.coin.drawCoin(this.coinPosition);
        };
    };

    isOnTheSamePosition(coinPos) {
        return coinPos.x === this.character.charPosition.x && coinPos.y === this.character.charPosition.y;
    };

    updateCharacter() {
        this.characterControl.controlDirectionUpdate();
        this.character.charPosition.x += this.characterControl.charDirection.x;
        this.character.charPosition.y += this.characterControl.charDirection.y;
    };

    updateCoin() {
        const checkPosition = this.isOnTheSamePosition(this.coinPosition);
        let coinsBonus;

        if (checkPosition) {
            if(this.musicOn){
                this.sound(this.gameMusic, './sounds/coin-collect.wav');
            }
            this.gameSpeedUpdate();
            this.coinPosition = this.randomCoinPositionGrid();

            let speedGame = Config.GAME_SPEED.toFixed(1);
            let gameSpeedHtml = (speedGame - this.gameSpeedDiffToHtml + 1).toFixed(1);
         
            if (speedGame > this.gameSpeedDiffToHtml + 1 && speedGame <= (this.gameSpeedDiffToHtml + 2)) {
                coinsBonus = Config.ADD_COINS_BONUS[1];
                this.scoreCounter += coinsBonus;
            } else if (speedGame > (this.gameSpeedDiffToHtml + 2) && speedGame <= (this.gameSpeedDiffToHtml + 3)) {
                coinsBonus = Config.ADD_COINS_BONUS[2];
                this.scoreCounter += coinsBonus;
            } else if (speedGame > (this.gameSpeedDiffToHtml + 3) && speedGame <= (this.gameSpeedDiffToHtml + 4)) {
                coinsBonus = Config.ADD_COINS_BONUS[3];
                this.scoreCounter += coinsBonus;
            } else if (speedGame > this.gameSpeedDiffToHtml + 4) {
                coinsBonus = Config.ADD_COINS_BONUS[4];
                this.scoreCounter += coinsBonus;
            } else {
                coinsBonus = Config.ADD_COINS_BONUS[0];
                this.scoreCounter++;
            };

            VariablesFromHTML.speed.textContent = `x${gameSpeedHtml}`;
            VariablesFromHTML.coins.textContent = `x${coinsBonus}`;
        };
        VariablesFromHTML.score.textContent = this.scoreCounter;
    };

    gameOver() {
        return (this.character.charPosition.x < 1 || this.character.charPosition.y < 1 || this.character.charPosition.x > Config.GRID_SIZE || this.character.charPosition.y > Config.GRID_SIZE);
    };

    init() {
        if(this.musicOn){
            VariablesFromHTML.backgroundMusic.play();
        };
        GameBoard.setGameboardSize();
        this.play();
        this.characterControl.controls();
    };
};

export default Game;