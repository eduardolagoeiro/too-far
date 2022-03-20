export function randomNum(max = 10, min = 0) {
	return (max - min) * Math.random() + min;
}

export function randomInt(max = 10, min = 0) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export function randomLat() {
	return randomInt(90, -90);
}

export function randomLong() {
	return randomInt(180, 180);
}