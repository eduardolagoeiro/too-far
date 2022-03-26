export function toRad(deg) {
	return (deg * Math.PI) / 180;
}

export function toDeg(rad) {
	return (rad * 180) / Math.PI;
}

export function calcCrow(pos1, pos2) {
	let R = 6371; // km
	let dLat = toRad(pos2.latitude - pos1.latitude);
	let dLon = toRad(pos2.longitude - pos1.longitude);
	const lat1 = toRad(pos1.latitude);
	const lat2 = toRad(pos2.latitude);

	let a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	let d = R * c;
	return d;
}

export function bearing(pos1, pos2) {
	const lat1 = toRad(pos1.latitude);
	const lat2 = toRad(pos2.latitude);
	const lon1 = toRad(pos1.longitude);
	const lon2 = toRad(pos2.longitude);
	let x = Math.cos(lat2) * Math.sin(lon2 - lon1);
	let y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
	const b = Math.atan2(x, y);
	const deg = toDeg(b);
	return deg;
}
