/******************************************
*	Name : App.jsx  
*	Parent : index.js
*	Children: Booking.jsx, DisplayTimeslots.jsx, Header.jsx, Footer.jsx
*	Description : Controls the routing for the application, initializes state in redux and 
*					  calls on the header and footer for the application
*******************************************/
import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import DisplayTimeslots from './components/DisplayTimeslots'
import Booking from './components/Booking'
import { ROUTES, timeSlotObject } from './resources/constants'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { insertTimeSlots, insertCurrentDate } from './redux/actions'
import { connect } from 'react-redux'
import { getSlotName } from './resources/common';

const mapStateToProps = state => {
	return {
		date: state.currentDate,
		applicationData: state.applicationData,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		insertTimeSlots: (date, list) => {
			dispatch(insertTimeSlots(date, list))
		},
		insertCurrentDate: date => {
			dispatch(insertCurrentDate(date))
		}
	}
}

const App = ({ insertTimeSlots, insertCurrentDate, startTime = 9, endTime = 17, date, applicationData }) => {
	useEffect(() => {
		let newDate = new Date().toISOString().slice(0, 10);
		if(applicationData[newDate] === undefined) {
			let createdSlots = [];
			for (let time = startTime; time <= endTime - 1; time++) {
				createdSlots.push({
					...timeSlotObject,
					id: time,
					slotName: getSlotName(time),
				})
			}
			insertTimeSlots(newDate, createdSlots)
			insertCurrentDate(newDate)
		}
	}, [])
	return (
		<Router>
			<div className="App">
				<Header />
				<Switch>
					<Route exact path={ROUTES.HOME} component={DisplayTimeslots} />
					<Route exact path={ROUTES.TIMESLOTS} component={DisplayTimeslots} />
					<Route exact path={ROUTES.Booking} component={Booking} />
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
