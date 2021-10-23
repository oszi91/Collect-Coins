class VariablesFromHTML {
	static game = document.querySelector('.game');
	static score = document.querySelector('.score__number');
	static speed = document.querySelector('.speed__number');
	static coins = document.querySelector('.coins__number');

	static keyUp = document.querySelector('.keyboard__up');
	static keyDown = document.querySelector('.keyboard__down');
	static keyLeft = document.querySelector('.keyboard__left');
	static keyRight = document.querySelector('.keyboard__right');

	static gameOverBoard = document.querySelector('.game-over');
	static gameOverBtn = document.querySelector('.game-over__restart');
	static backgroundMusic = document.querySelector('.background-music');

	static gameOverText = document.querySelector('.game-over__text');
	static winText = document.querySelector('.win-game');

	static startGame = document.querySelector('.start-game');
	static playBtn = document.querySelector('.start-game__btn');
	static musicIcon = document.querySelector('.start-game__music');
	static levelBtns = document.querySelectorAll('.level');
	static icon = this.musicIcon.querySelector('.fas');
}

export default VariablesFromHTML;
