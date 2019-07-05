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

function jump() {
	// It takes 300ms to jump and 300ms to fall,
	// so wait 700ms before actually starting the jump
	setTimeout(() => {
		const marioElement = document.getElementById('mario');
		marioElement
			.getElementsByTagName('img')[0]
			.setAttribute('src', 'images/smb1-mario-jump-sprite.png');
			marioElement.classList.add('jump');
			setTimeout(() => {
			marioElement
				.getElementsByTagName('img')[0]
				.setAttribute('src', 'images/smb1-mario-sprite.png');
			marioElement.classList.remove('jump')
		}, 600);
	}, 700)
}

function startMarioBuzz() {
	const { hour, minute, second, epoch } = getTime();
	paintTime(hour, minute, second, epoch);
	if (second === 59) {
		jump();
	}
	setTimeout(startMarioBuzz, 1000)
}

startMarioBuzz();
