import { resetGameData } from './arkanoid.js';

const finalSc = document.querySelector('[data-final="score"].final');
const finalScore = document.querySelector('[data-final="score"] ._win-score');
const finalTitle = document.querySelector('[data-final="score"] .final__title');


export function showFinalScreen(score, status = 'lose') {

	if (status === 'win') {
		finalTitle.textContent = 'You Win';
		finalScore.textContent = `${score}`;
		// final.classList.add('_win');
	} else if (status === 'lose') {
		finalTitle.textContent = 'You lose';
		// finalTitle.textContent = 'You Lose';
		finalScore.textContent = `${score}`;
	}

	setTimeout(() => {
		finalSc.classList.add('_visible');
	}, 50);
}

document.addEventListener('click', (e) => {

	const targetElement = e.target;
	const wrapper = document.querySelector('.wrapper');
	if (targetElement.closest('.final__button')) {
		finalSc.classList.remove('_visible');
		wrapper.classList.remove('_game');
		resetGameData();
	}

	if (targetElement.closest('[data-button="final-home"]')) {
		finalSc.classList.remove('_visible');
		wrapper.classList.remove('_game');
		// resetGame();

	}
	if (targetElement.closest('[data-button="final-repeat"]')) {


		setTimeout(() => {
			finalSc.classList.remove('_visible');
		}, 550);
	}
	if (targetElement.closest('[data-button="final-bet"]')) {
		finalBt.classList.remove('_visible');
	}
})





