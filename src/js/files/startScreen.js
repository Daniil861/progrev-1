import { checkRemoveAddClass } from './functions.js';
import { } from './script.js';
import { startData } from './startData.js';

const wrapper = document.querySelector('.wrapper');
const inputName = document.querySelector('.start-screen__input');
const userNameItem = document.querySelectorAll('[data-user-name]');
const userImages = document.querySelectorAll('.user-box__image img');

function initStartData() {
	if (!localStorage.getItem('user-name') && wrapper) {
		wrapper.classList.add('_start-screen');
	}
	if (!localStorage.getItem('user-avatar')) {
		localStorage.setItem('user-avatar', 2);
	}
	drawUserData();
}

initStartData();

// Объявляем слушатель событий "клик"
document.addEventListener('click', (e) => {

	const targetElement = e.target;

	if (targetElement.closest('[data-avatar]') && !targetElement.closest('[data-avatar]').classList.contains('_active')) {
		checkRemoveAddClass('[data-avatar]', '_active', targetElement.closest('[data-avatar]'));
		const avatar = +targetElement.closest('[data-avatar]').dataset.avatar;
		localStorage.setItem('user-avatar', avatar);
	}

	if (targetElement.closest('.start-screen__button')) {
		const userName = inputName.value;
		if (userName) {
			localStorage.setItem('user-name', userName);
			wrapper.classList.remove('_start-screen');
			if (inputName.classList.contains('_error')) inputName.classList.remove('_error');
			drawUserData();
		} else {
			inputName.classList.add('_error');
		}
	}

})

function drawUserData() {
	if (userNameItem.length) {
		userNameItem.forEach(user => user.textContent = localStorage.getItem('user-name'));
	}
	if (userImages.length) {
		userImages.forEach(image => image.setAttribute('src', `img/avatars/avatar-${localStorage.getItem('user-avatar')}.png`));
	}
}
