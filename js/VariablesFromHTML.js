class VariablesFromHTML{
    static game = document.querySelector('.game');
    static score = document.querySelector('.score__number');
    static speed = document.querySelector('.speed__number');
    static coins = document.querySelector('.coins__number');
    
    static gameOverBoard = document.querySelector('.game-over');
    static gameOverBtn = document.querySelector('.game-over__restart');
    static backgroundMusic = document.querySelector('.background-music');

    static gameOverText = document.querySelector('.game-over__text');
    static winText = document.querySelector('.win-game');
    
};

export default VariablesFromHTML;