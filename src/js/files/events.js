
import { configGame, startMemoryGame, addNewOpenedPicture, stopGame, resetGame } from './script.js';
import { startData } from './startData.js';


// Объявляем слушатель событий "клик"
document.addEventListener('click', (e) => {

	const wrapper = document.querySelector('.wrapper');

	const targetElement = e.target;

	const money = +localStorage.getItem('money');
	const bet = +localStorage.getItem('current-bet');

	// privacy screen
	if (targetElement.closest('.preloader__button')) {
		location.href = 'main.html';
	}

	// main screen
	if (targetElement.closest('[data-button="privacy"]')) {
		location.href = 'index.html';
	}

	if (targetElement.closest('[data-button="game-1"]')) {
		configGame.currentLevel = 1;
		startMemoryGame();
		setTimeout(() => {
			wrapper.classList.add('_game');
		}, 500);
	}
	if (targetElement.closest('[data-button="game-2"]')) {
		configGame.currentLevel = 2;
		startMemoryGame();
		setTimeout(() => {
			wrapper.classList.add('_game');
		}, 500);
	}
	if (targetElement.closest('[data-button="game-3"]')) {
		configGame.currentLevel = 3;
		startMemoryGame();
		setTimeout(() => {
			wrapper.classList.add('_game');
		}, 500);
	}

	if (targetElement.closest('[data-button="home"]')) {
		wrapper.setAttribute('class', 'wrapper');
		stopGame();
		resetGame();
	}

	//========================================================================================================================================================
	// game
	if (targetElement.closest('[data-picture]') &&
		configGame.state === 2 &&
		targetElement.closest('[data-picture]').classList.contains('_hide')) {
		addNewOpenedPicture(targetElement.closest('[data-picture]'));
	}
})
