import Config from './Config';
import VariablesFromHTML from './VariablesFromHTML';

function initGame(game) {

    function playGame() {
        VariablesFromHTML.startGame.classList.add('start-game-hide');
        game.coinPosition = game.randomCoinPositionGrid(Config.GRID_SIZE);
        game.init();
    };

    function isMusicOn() {
        if (game.musicOn) {
            game.musicOn = false;
            VariablesFromHTML.icon.className = 'fas fa-volume-mute';
        } else {
            game.musicOn = true;
            VariablesFromHTML.icon.className = 'fas fa-volume-up';
        };
    };

    function levelConfig(gridSize, gameSpeed, gameUpgrade, bonusCoinsArr){
        Config.GRID_SIZE = gridSize;
        Config.GAME_SPEED = gameSpeed;
        Config.GAME_SPEED_UPGRADE = gameUpgrade;
        Config.ADD_COINS_BONUS = bonusCoinsArr;
        game.coinPosition = game.randomCoinPositionGrid(Config.GRID_SIZE);
        game.gameSpeedDiffToHtml = gameSpeed;
    };

    VariablesFromHTML.levelBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            switch (e.target.dataset.level) {
                case 'easy': {
                    levelConfig(8,3,0.05,[1,2,4,6,8]);
                    break;
                };
            case 'medium': {
                game.coinPosition = game.randomCoinPositionGrid(Config.GRID_SIZE);
                break;
            };
            case 'hard': {
                levelConfig(6,6,0.15,[1, 1, 2, 3, 5]);
                break;
            };
            case 'extreme': {
                levelConfig(5,7,0.2,[1, 1, 2, 2, 5]);
                break;
            };
            };
        })
    });

    VariablesFromHTML.musicIcon.addEventListener('click', isMusicOn);
    VariablesFromHTML.playBtn.addEventListener('click', playGame);
};

export default initGame;