/******************************************
*	Name : DisplayTimeslots  
*	Parent : App.jsx
*	Children: N/A
*	Description : Displays list of time-slots available for the day
*******************************************/
import React, { useState, useEffect } from 'react';
import { dateOptions } from '../resources/common';
import { connect } from 'react-redux'
import { insertTimeSlots, insertTimeSlotID } from '../redux/actions'
import { ROUTES } from '../resources/constants'

const mapStateToProps = (state) => {
	let slotList = []
	let date = new Date();
	slotList = state.applicationData[date.toISOString().slice(0, 10)];
	return { 
		slotList, 
		date: state.currentDate,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		insertTimeSlots: (date, list) => {
			dispatch(insertTimeSlots(date, list))
		},
		insertTimeSlotID: id => {
			dispatch(insertTimeSlotID(id))
		}
	}
}

const DisplayTimeslots = ({ date, slotList, insertTimeSlotID, history }) => {
	const [timeSlots, setTimeSlots] = useState([])

	useEffect(() => {
		if(slotList !== undefined) {
			setTimeSlots(slotList.sort(function (a, b) {
				return a.id - b.id;
			}))
		}
	}, [slotList])

	const displayBooking = slotID => {
		insertTimeSlotID(slotID)
		history.push({
			pathname: ROUTES.BOOKING,
		})
	}
	const renderAvailableTimeslots = () => {
		if (timeSlots !== undefined) {
			return timeSlots.map(timeSlot => {
				return (
					<div key={timeSlot.id} className="col-sm-12 col-md-6 offset-md-3 button-padding">
						<button className={`btn btn-block ${timeSlot.booked ? `btn-outline-danger` : `btn-outline-primary`}`} onClick={() => displayBooking(timeSlot.id)}>
							<span className={`${timeSlot.booked ? 'strike-through' : null}`}>{timeSlot.slotName}</span>
						</button>
					</div>
				)
			})
		}
	}
	return (
		<div className="body-margins">
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-6 offset-md-3">
						<hr />
						<h5><small className="text-muted">{new Date(date).toLocaleDateString("en-US", dateOptions)}</small></h5>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-6 offset-md-3">
						<p><i>Please book an available timeslot.</i></p>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					{renderAvailableTimeslots()}
				</div>
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTimeslots);