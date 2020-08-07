export const ROUTES = {
	HOME: '/',
	TIMESLOTS: '/timeSlots',
	BOOKING: '/booking'
}
export const timeSlotObject = {
	slotName: '',
	booked: false,
	bookingDetails: {
		firstName: '',
		lastName: '',
		phoneNumber: '',
	}
}

export const INVALIDCHARS = [
	"-",
	"+",
	"e",
];