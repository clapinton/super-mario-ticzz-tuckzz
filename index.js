const SMB_THEMES = {
	smb1: 'smb1',
	smb3: 'smb3',
	smb5: 'smb5'
};

// Start empty
let activeTheme = '';

const JUMP_DURATION = 400;
const JUMP_DELAY = 1000 - JUMP_DURATION;

function changeTheme(theme) {
	// Wait for the jump up and only change it once we hit the block
	setTimeout(() => {
		const wrapperElement = document.getElementsByClassName('wrapper')[0];
		wrapperElement.className = '';
		wrapperElement.classList.add('wrapper', theme);
		activeTheme = theme;
	}, 1000);
}

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
	// It takes 400ms to jump and 400ms to fall,
	// so wait 600ms before actually starting the jump
	setTimeout(() => {
		const marioElement = document.getElementById('mario');
		marioElement.classList.add('jump');
		setTimeout(() => {
			nudgeBrick('minute');
			if (minute === 59) {
				nudgeBrick('hour');
			}
		}, JUMP_DURATION);
		setTimeout(() => {
			marioElement.classList.remove('jump')
		}, JUMP_DURATION * 2);
	}, JUMP_DELAY)
}

function showGoomba() {
	const goombaElement = document.getElementById('goomba');
	goombaElement.classList.add('goomba-walk');
	setTimeout(() => goombaElement.classList.remove('goomba-walk'), 7700)
}

function checkTheme(minute) {
	if (minute % 5 === 0) {
		changeTheme(SMB_THEMES.smb5);
		return;
	}

	if (minute % 3 === 0) {
		changeTheme(SMB_THEMES.smb3);
		return;
	}

	// Else, if the active theme is not smb1 already, change it
	if (activeTheme !== SMB_THEMES.smb1) {
		changeTheme(SMB_THEMES.smb1);
	}
}

function startMarioBuzz() {
	const { date, hour, minute, second, epoch } = getTime();
	paintTime(date, hour, minute, second, epoch);
	if (second === 56) {
		showGoomba();
	}
	if (second === 59) {
		jump(hour, minute);
		// Check if we should change the theme for the next minute
		checkTheme(minute + 1);
	}
	setTimeout(startMarioBuzz, 1000)
}

// Check which theme to start with
const { date, hour, minute, second, epoch } = getTime();
checkTheme(minute);

startMarioBuzz();
