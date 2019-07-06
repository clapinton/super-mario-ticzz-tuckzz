function getTime() {
	const dateNow = new Date();
	const date = dateNow.toDateString();
	const hour = dateNow.getHours();
	const minute = dateNow.getMinutes();
	const second = dateNow.getSeconds();
	const epoch = dateNow.getTime();

	return { date, hour, minute, second, epoch };
}

function paintTime(date, hour, minute, second, epoch) {
	let hourToUse = hour;
	if (hour < 10) {
		hourToUse = `0${hour}`;
	}

	let minuteToUse = minute;
	if (minute < 10) {
		minuteToUse = `0${minute}`;
	}

	const epochToUse = Math.floor(epoch / 1000);
	document.getElementById('date-content').innerText = date;
	document.getElementById('hour-content').innerText = hourToUse;
	document.getElementById('minute-content').innerText = minuteToUse;
	document.getElementById('seconds-content').innerText = second;
	document.getElementById('epoch-content').innerText = epochToUse;
}

function nudgeBrick(brick) {
	const brickElement = document.getElementById(brick);
		brickElement.classList.add('brick-nudge');
		setTimeout(() => {
			brickElement.classList.remove('brick-nudge')
	}, 250);
}

function jump(hour, minute) {
	// It takes 300ms to jump and 300ms to fall,
	// so wait 700ms before actually starting the jump
	setTimeout(() => {
		const marioElement = document.getElementById('mario');
		marioElement
			.setAttribute('style', 'background-image: url("images/smb1-mario-jump-sprite.png")');
		marioElement.classList.add('jump');
		setTimeout(() => {
			nudgeBrick('minute');
			if (minute === 59) {
				nudgeBrick('hour');
			}
		}, 400);
		setTimeout(() => {
			marioElement
				.setAttribute('style', 'background-image: url("images/smb1-mario-sprite.png")');
			marioElement.classList.remove('jump')
		}, 800);
	}, 600)
}

function showGoomba() {
	const goombaElement = document.getElementById('goomba');
	goombaElement.classList.add('goomba-walk');
	setTimeout(() => goombaElement.classList.remove('goomba-walk'), 16000)
}

function startMarioBuzz() {
	const { date, hour, minute, second, epoch } = getTime();
	paintTime(date, hour, minute, second, epoch);
	if (second === 26) {
		showGoomba();
	}
	if (second === 29) {
		jump(hour, minute);
	}
	setTimeout(startMarioBuzz, 1000)
}

startMarioBuzz();
