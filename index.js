function getTime() {
	const dateNow = new Date();
	const hour = dateNow.getHours();
	const minute = dateNow.getMinutes();
	const second = dateNow.getSeconds();
	const epoch = dateNow.getTime();

	return { hour, minute, second, epoch };
}

function paintTime(hour, minute, second, epoch) {
	let hourToUse = hour;
	if (hour < 10) {
		hourToUse = `0${hour}`;
	}

	let minuteToUse = minute;
	if (minute < 10) {
		minuteToUse = `0${minute}`;
	}

	const epochToUse = Math.floor(epoch / 1000);
	document.getElementById('hour-text').innerText = hourToUse;
	document.getElementById('minute-text').innerText = minuteToUse;
	document.getElementById('epoch-time').innerText = second;
}

function nudgeBrick(brick) {
	const brickElement = document.getElementById(brick);
		brickElement.classList.add('nudge-brick');
		setTimeout(() => {
			brickElement.classList.remove('nudge-brick')
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
		}, 300);
		setTimeout(() => {
			marioElement
				.setAttribute('style', 'background-image: url("images/smb1-mario-sprite.png")');
			marioElement.classList.remove('jump')
		}, 600);
	}, 700)
}

function startMarioBuzz() {
	const { hour, minute, second, epoch } = getTime();
	paintTime(hour, minute, second, epoch);
	if (second === 59) {
		jump(hour, minute);
	}
	setTimeout(startMarioBuzz, 1000)
}

startMarioBuzz();
