export const dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

export const getSlotName = time => {
	let startTime = time;
	let endTime = time + 1;
	return `${convertTo12Hrs(startTime)} to ${convertTo12Hrs(endTime)}`
}

const convertTo12Hrs = time => {
	if (time < 12) {
		return `${time} a.m.`
	} else if (time === 12) {
		return `${time} p.m.`
	} else {
		return `${time - 12} p.m.`
	}
}