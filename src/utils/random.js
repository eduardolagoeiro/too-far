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

function mulberry32(a) {
	return function () {
		var t = (a += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export function gen(size, n) {
	var rand = mulberry32(n);
	return new Array(
		...new Set([n % size, ...new Array(10).fill(0).map(() => Math.floor(rand() * size) % size)])
	).splice(0, 6);
}
