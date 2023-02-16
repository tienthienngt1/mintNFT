export function convertStoH(s: number) {
	var h = Math.floor(s / 3600);
	var m = Math.floor((s % 3600) / 60);
	var s = Math.floor((s % 3600) % 60);

	var hDisplay = h > 0 ? h + "h" : "00h";
	var mDisplay = m > 0 ? m + "m" : "00m";
	var sDisplay = s > 0 ? s + "s" : "00s";
	return hDisplay + mDisplay + sDisplay;
}
