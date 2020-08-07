import { bindActionCreators } from "redux";

export const INSERT_LIST = "INSERT_LIST";
export const INSERT_BOOKING = "INSERT_BOOKING";
export const INSERT_CURRENT_DATE = "INSERT_CURRENT_DATE";
export const INSERT_CURRENT_TIMESLOT_ID = "INSERT_CURRENT_TIMESLOT_ID"


export const insertTimeSlots = (id, list) => {
	return {
		type: INSERT_LIST,
		payload: {
			id,
			list,
		}
	}
}

export const insertCurrentDate = date => {
	return {
		type: INSERT_CURRENT_DATE,
		payload: date,
	}
}

export const insertBooking = (date, slot) => {
	return {
		type: INSERT_BOOKING,
		payload: {
			date,
			slot,
		}
	}
}

export const insertTimeSlotID = id => {
	return {
		type: INSERT_CURRENT_TIMESLOT_ID,
		payload: id,
	}
}