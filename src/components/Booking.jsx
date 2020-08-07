/******************************************
*	Name : Booking  
*	Parent : App.jsx
*	Children: BookingPresentational
*	Description : Container component for booking a time-slot
*******************************************/
import React, { useState, useEffect } from 'react';
import BookingPresentational from './BookingPresentational';
import { ROUTES, INVALIDCHARS } from '../resources/constants'
import { connect } from 'react-redux'
import { insertBooking, insertTimeSlotID } from '../redux/actions'

const mapStateToProps = (state, ownProps) => {

	let timeSlot = null;
	let timeSlots = state.applicationData[state.currentDate];
	if(state.currentTimeslotID !== null) {
		timeSlot = timeSlots.find(one => one.id === state.currentTimeslotID);
	}

	return {
		timeSlot: timeSlot,
		date: state.currentDate,
		currentTimeslotID: state.currentTimeslotID,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		insertBooking: (date, slot) => {
			dispatch(insertBooking(date, slot))
		},
		insertTimeSlotID: id => {
			dispatch(insertTimeSlotID(id))
		}
	}
}

const Booking = ({ history, timeSlot, insertBooking, date, currentTimeslotID }) => {
	const [slotDetails, setSlotDetails] = useState({
		id: '',
		slotName: '',
		bookingDetails: {
			firstName: '',
			lastName: '',
			phoneNumber: '',
		}
	})
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
	})

	const [error, setError] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
	})

	useEffect(() => {
		if (currentTimeslotID !== null) {
			setFormData(timeSlot.bookingDetails)
			setSlotDetails(timeSlot)
		} else {
			history.push(ROUTES.TIMESLOTS)
		}
		return () => {
			insertTimeSlotID(null)
		}
	}, [])

	const handleChange = e => {
		let name = e.target.name;
		let value = e.target.value;
		if (name === "phoneNumber") {
			if (value.toString().length > 10) {
				return;
			}
		}
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const preventAlpha = e => {
		if (INVALIDCHARS.includes(e.key)) {
			e.preventDefault();
		}
	}
	const hasValidationError = () => {
		let {
			firstName,
			lastName,
			phoneNumber
		} = formData;
		let errorL = {
			firstName: "",
			lastName: "",
			phoneNumber: ""
		}

		let hasError = false;

		if (firstName === '') {
			hasError = true;
			errorL.firstName = "Please enter a first name."
		}

		if (lastName === '') {
			hasError = true;
			errorL.lastName = "Please enter a last name."
		}

		let regex = /^[0-9]{10}$/
		if (phoneNumber === '') {
			hasError = true;
			errorL.phoneNumber = "Please enter a phone number."
		} else if (phoneNumber.length !== 10) {
			hasError = true;
			errorL.phoneNumber = "Please enter a 10 digit phone number."
		} else if (!regex.test(phoneNumber)) {
			hasError = true;
			errorL.phoneNumber = "Please enter a valid 10 digit phone number."
		}

		setError(errorL);
		return hasError;
	}

	const handleSubmit = e => {
		e.preventDefault();
		if (!hasValidationError()) {
			let slot = {
				...slotDetails,
				booked: true,
				bookingDetails: {
					...formData
				}
			}
			insertBooking(date, slot)
			history.push(ROUTES.TIMESLOTS)
		}
	}

	const handleCancel = () => {
		history.push(ROUTES.TIMESLOTS)
	}

	return (
		<BookingPresentational
			date={date}
			slotDetails={slotDetails}
			formData={formData}
			handleChange={handleChange}
			handleCancel={handleCancel}
			handleSubmit={handleSubmit}
			preventAlpha={preventAlpha}
			error={error} />
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);