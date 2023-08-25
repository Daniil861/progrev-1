
import { getRandom, getDigFormat, shuffle } from '../files/functions.js';
import { startData } from './startData.js';



export function initStartData() {

	if (!localStorage.getItem('money')) {
		localStorage.setItem('money', startData.bank);
	}
	writeScore();

	// if (!localStorage.getItem('resource')) {
	// 	localStorage.setItem('resource', 0);
	// }
	// writeResource();


	if (!localStorage.getItem('current-bet')) {
		localStorage.setItem('current-bet', startData.countBet);
	}
	writeBet();

	// if (!localStorage.getItem('level')) {
	// 	localStorage.setItem('level', 1);
	// }

	if (!localStorage.getItem('opened-level')) {
		localStorage.setItem('opened-level', 1);
	}
	openNewLevel();
}


function writeScore() {
	if (document.querySelectorAll('.score').length) {
		let money = getDigFormat(+localStorage.getItem('money'));
		document.querySelectorAll('.score').forEach(el => {
			el.textContent = money;
		})
	}
}

// function writeResource() {
// 	if (document.querySelector('.resource')) {
// 		let money = getDigFormat(+localStorage.getItem('resource'));
// 		document.querySelectorAll('.resource').forEach(el => {
// 			el.textContent = money;
// 		})
// 	}
// }

export function writeBet() {
	if (document.querySelector(startData.nameItemBet)) {
		document.querySelectorAll(startData.nameItemBet).forEach(el => {
			el.textContent = localStorage.getItem('current-bet');
		})
	}
}

export function openNewLevel() {
	const levelsBlocks = document.querySelectorAll('[data-level-button]');
	const openedLevels = +localStorage.getItem('opened-level');
	if (levelsBlocks.length) {
		for (let i = 0; i < openedLevels; i++) {
			if (levelsBlocks[i].classList.contains('_disabled')) levelsBlocks[i].classList.remove('_disabled');
		}
	}
}


initStartData();


//========================================================================================================================================================
// Функция присвоения случайного класса анимациии money icon
const anim_items = document.querySelectorAll('.icon-game');

function getRandomAnimate() {
	let number = getRandom(0, 3);
	let arr = ['jump', 'scale', 'rotate'];
	let random_item = getRandom(0, anim_items.length);
	anim_items.forEach(el => {
		if (el.classList.contains('_anim-icon-jump')) {
			el.classList.remove('_anim-icon-jump');
		} else if (el.classList.contains('_anim-icon-scale')) {
			el.classList.remove('_anim-icon-scale');
		} else if (el.classList.contains('_anim-icon-rotate')) {
			el.classList.remove('_anim-icon-rotate');
		}
	})
	setTimeout(() => {
		anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
	}, 100);
}

if (anim_items.length) {
	setInterval(() => {
		getRandomAnimate();
	}, 20000);
}

//========================================================================================================================================================
// game

export const configGame = {
	state: 1, // 1 - not starting, 2 - alredy play
	currentLevel: 1,
	startArr: [1, 1, 2, 2, 3, 3, 4, 4, 0, 5, 5, 6, 6, 7, 7],
	arrGame: [],
	arrCompare: [],

	winCountOnePare: 50,
	winCountLevel: 500,

	timeConst: 30,
	timeCurrent: 0,
	timer: false
}
const timeBlock = document.querySelector('.timer-game__time');
const fieldItems = document.querySelector('.field__items');
const pictureItems = document.querySelectorAll('[data-picture]');
const game = document.querySelector('.game');


export function startMemoryGame() {
	game.classList.add(`_game-${configGame.currentLevel}`);

	// Перемешиваем массив
	configGame.arrGame = shuffle(configGame.startArr);


	// Записываем картинки в блоки
	writePicturesStartData();

	// Показываем на 0,5 сек картинки и скрываем
	setTimeout(() => {
		showHideAllImages();
	}, 1000);

	setTimeout(() => {
		configGame.state = 2;
		timer();
	}, 2000);
}



function writePicturesStartData() {
	configGame.arrGame.forEach((number, i) => {
		pictureItems[i].setAttribute('data-picture', number);
		document.querySelectorAll('[data-picture] img')[i].setAttribute('src', `img/game/game-${configGame.currentLevel}/frame-${number}.png`);
		if (number === 0) pictureItems[i].classList.add('_empty');

	})
}

function showHideAllImages() {
	pictureItems.forEach(item => item.classList.contains('_hide') ? item.classList.remove('_hide') : null);

	setTimeout(() => {
		pictureItems.forEach(item => !item.classList.contains('_hide') ? item.classList.add('_hide') : null);
	}, 1000);
}

// Запускаем таймер и отслеживаем завершение времени
function timer() {
	configGame.timeCurrent = configGame.timeConst;
	configGame.timer = setInterval(() => {
		--configGame.timeCurrent;

		if (configGame.timeCurrent >= 10) timeBlock.textContent = `${configGame.timeCurrent}s`;
		else timeBlock.textContent = `0${configGame.timeCurrent}s`;

		// Если время закончилось
		if (configGame.timeCurrent <= 0) {
			// Добавляем небольшую подсветку для поля - показываем что проиграли
			fieldItems.classList.add('_lose');
			stopGame();
			resetGame();
		}
	}, 1000);
}

export function addNewOpenedPicture(item) {
	const number = +item.dataset.picture;

	item.classList.remove('_hide');
	configGame.arrCompare.push(number);

	if (configGame.arrCompare.length > 1) {
		if (checkCollision()) {
			resetCompareArr();
			// addMoney(configGame.winCountOnePare, '.score', 500, 1500);

			if (checkClosedPictures()) {
				// Добавляем небольшую подсветку для поля - показываем что выиграли
				fieldItems.classList.add('_active');
				stopGame();
				// addMoney(configGame.winCountLevel, '.score', 500, 1500);
				resetGame();
			}
		} else {
			setTimeout(() => {
				hideOpenedItems();
			}, 250);
		}
	}
}

export function useBonus1() {
	if (configGame.arrCompare.length === 1) {
		const number = configGame.arrCompare[0];
		if (number > 0) {
			console.log(number);
			const findItem = Array.from(pictureItems).find(item => +item.dataset.picture === number && item.classList.contains('_hide'));
			findItem.classList.add('_shake');
			setTimeout(() => {
				findItem.classList.remove('_shake');
			}, 1000);
		} else {
			shakeTwoItems();
		}

	} else if (configGame.arrCompare.length === 0) {
		shakeTwoItems()
	}
}
function shakeTwoItems() {
	let number;
	pictureItems.forEach(item => {
		if (item.classList.contains('_hide') && +item.dataset.picture > 0) number = +item.dataset.picture;
	})
	pictureItems.forEach(item => {
		if (+item.dataset.picture === number) item.classList.add('_shake');
	})
	setTimeout(() => {
		pictureItems.forEach(item => {
			if (item.classList.contains('_shake')) item.classList.remove('_shake');
		})
	}, 750);
}

function checkCollision() {
	if (configGame.arrCompare[0] === configGame.arrCompare[1]) {
		return true;
	}
	return false;
}
function checkClosedPictures() {
	for (let i = 0; i < pictureItems.length; i++) {
		if (pictureItems[i].classList.contains('_hide') && !pictureItems[i].classList.contains('_empty')) return false;
	}
	return true;
}

function hideOpenedItems() {
	pictureItems.forEach(item => {
		const number = +item.dataset.picture;
		if (!item.classList.contains('_hide') && configGame.arrCompare.includes(number)) item.classList.add('_hide');
	});
	resetCompareArr();
}
function hideAllItems() {
	pictureItems.forEach(item => {
		if (!item.classList.contains('_hide')) item.classList.add('_hide');
		if (item.classList.contains('_empty')) item.classList.remove('_empty');
	});
	resetCompareArr();
}
function resetCompareArr() {
	configGame.arrCompare.splice(0);
}

export function stopGame() {
	configGame.state = 1;
	clearInterval(configGame.timer);
}

export function resetGame() {

	setTimeout(() => {
		document.querySelector('.wrapper').classList.remove('_game');
	}, 1000);

	setTimeout(() => {
		timeBlock.textContent = `0:${configGame.timeConst}`;
		fieldItems.setAttribute('class', 'field__items');
		game.setAttribute('class', 'wrapper__game game');
		document.querySelectorAll('.footer-game__button').forEach(button => button.classList.contains('_hold') ? button.classList.remove('_hold') : false)

		hideAllItems();
	}, 1000);
}