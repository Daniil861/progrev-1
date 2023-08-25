import { deleteMoney, noMoney, checkRemoveAddClass, getDigFormat } from "./functions.js";
import { startData } from "./startData.js";
import { } from './script.js';



if (document.querySelector('.shop')) {
	drawStartCurrentItem();
	drawPrices();
	checkBoughtItems();
	removeSelectedItems();
	writeSelected();
	writeCurrentItems();
}

export function drawStartCurrentItem() {
	if (!localStorage.getItem('current-item')) localStorage.setItem('current-item', 0);
}

function drawPrices() {
	document.querySelector('[data-price="1"]').textContent = getDigFormat(startData.prices.price_1);
	document.querySelector('[data-price="2"]').textContent = getDigFormat(startData.prices.price_2);
}

function checkBoughtItems() {

	if (localStorage.getItem('item-1')) {
		if (!document.querySelector('[data-item="1"]').classList.contains('_selected')) {
			document.querySelector('[data-shop-button="1"] span').textContent = 'Select';
		}
		document.querySelector('[data-item="1"]').classList.add('_bought');
	}
	if (localStorage.getItem('item-2')) {
		if (!document.querySelector('[data-item="2"]').classList.contains('_selected')) {
			document.querySelector('[data-shop-button="2"] span').textContent = 'Select';
		}
		document.querySelector('[data-item="2"]').classList.add('_bought');
	}


}

function removeSelectedItems() {
	const blocks = document.querySelectorAll('.shop__item');

	blocks.forEach(block => {
		if (block.classList.contains('_selected')) block.classList.remove('_selected');
	})
}

function writeSelected() {
	document.querySelectorAll('[data-shop-button]').forEach(btn => {
		if (btn.closest('._bought') && !btn.closest('._selected')) btn.querySelector('span').textContent = 'Select';
	})

	if (+localStorage.getItem('current-item') === 1) {
		document.querySelector('[data-shop-button="1"] span').textContent = 'Selected';
		document.querySelector('[data-item="1"]').classList.add('_selected');
	} else if (+localStorage.getItem('current-item') === 2) {
		document.querySelector('[data-shop-button="2"] span').textContent = 'Selected';
		document.querySelector('[data-item="2"]').classList.add('_selected');
	}
	writeCurrentItems();
}

function writeCurrentHero() {
	const currentItem = +localStorage.getItem('current-item');

	if (currentItem > 0) {
		gameItem.forEach(item => {
			item.setAttribute('src', `img/shop/plane-${currentItem}.png`);
		})
	}

}
function writeCurrentItems() {
	const slotIcons = document.querySelectorAll('.reel3 .icons img');
	slotIcons.forEach((image, idx) => {
		image.setAttribute('src', `img/game/icons-${+localStorage.getItem('current-item') + 1}/slot-${idx + 1}.png`);
	})
	const selectIcons = document.querySelectorAll('[data-select] img');
	selectIcons.forEach((image, idx) => {
		image.setAttribute('src', `img/game/icons-${+localStorage.getItem('current-item') + 1}/slot-${idx + 1}.png`);
	})
}

function addHoldIfBuyingBonus() {
	const buttons = document.querySelectorAll('[data-shop-button]');
	const items = document.querySelectorAll('[data-item]');
	buttons.forEach(item => item.classList.contains('_hold') ? item.classList.remove('_hold') : false);

	if (configGame.busters.isBonus_1_Buying) {
		buttons[0].classList.add('_hold');
		items[0].classList.add('_bought');
	}
	if (configGame.busters.isBonus_2_Buying) {
		buttons[1].classList.add('_hold');
		items[1].classList.add('_bought');
	}
	if (configGame.busters.isBonus_3_Buying) {
		buttons[2].classList.add('_hold');
		items[2].classList.add('_bought');
	}
}


//========================================================================================================================================================
document.addEventListener('click', (e) => {
	const wrapper = document.querySelector('.wrapper');
	const targetElement = e.target;
	const money = +localStorage.getItem('money');

	if (targetElement.closest('[data-button="shop-home"]')) {
		wrapper.classList.remove('_shop');
	}

	if (targetElement.closest('[data-button="shop"]')) {
		wrapper.classList.add('_shop');
	}

	//===============
	// if (targetElement.closest('[data-shop-button="1"]')) {
	// 	if (money > startData.prices.price_1) {
	// 		deleteMoney(startData.prices.price_1, '.score');

	// 		localStorage.setItem('thing-3', true);
	// 	} else noMoney('.score');

	// }

	// if (targetElement.closest('[data-shop-button="2"]')) {
	// 	if (money > startData.prices.price_2) {
	// 		deleteMoney(startData.prices.price_2, '.score');
	// 		localStorage.setItem('thing-4', true);
	// 	} else noMoney('.score');
	// }

	// if (targetElement.closest('[data-shop-button="3"]') && !configGame.busters.isBonus_3_Buying) {
	// 	if (money > startData.prices.price_3) {
	// 		deleteMoney(startData.prices.price_3, '.score');
	// 		configGame.busters.isBonus_3_Buying = true;
	// 		addHoldIfBuyingBonus();
	// 	} else noMoney('.score');
	// }

	// if (targetElement.closest('.buster-item__button')) {
	// 	if (money >= startData.prices.price_5) {
	// 		deleteMoney(startData.prices.price_5, '.score');
	// 		let buster_5 = +localStorage.getItem('buster-5');
	// 		localStorage.setItem('buster-5', buster_5 + 1);
	// 		writeBusters();
	// 	} else noMoney('.score');
	// }


	if (targetElement.closest('[data-shop-button="1"]') && !targetElement.closest('[data-item="1"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_1) {
			deleteMoney(startData.prices.price_1, '.score');
			localStorage.setItem('item-1', true);
			checkBoughtItems();
			writeSelected();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="1"]') && targetElement.closest('[data-item="1"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="1"]'));
		localStorage.setItem('current-item', 1);
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="2"]') && !targetElement.closest('[data-item="2"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_2) {
			deleteMoney(startData.prices.price_2, '.score');
			localStorage.setItem('item-2', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="2"]') && targetElement.closest('[data-item="2"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="2"]'));
		localStorage.setItem('current-item', 2);
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="3"]') && !targetElement.closest('[data-item="3"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_3) {
			deleteMoney(startData.prices.price_3, '.score');
			localStorage.setItem('item-3', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="3"]') && targetElement.closest('[data-item="3"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="3"]'));
		localStorage.setItem('current-item', 3);
		writeSelected();
	}

})

