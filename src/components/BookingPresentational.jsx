/******************************************
*	Name : BookingPresentational  
*	Parent : Booking.jsx
*	Children: N/A
*	Description : Presentational component for booking a time-slot
*******************************************/
import React from 'react';
import { dateOptions } from '../resources/common';

const BookingPresentational = ({
	date,
	slotDetails,
	formData,
	handleChange,
	handleSubmit,
	handleCancel,
	preventAlpha,
	error }) => {

	return (
		<div className="container body-margins">
			<div className="row">
				<div className="col-sm-12 col-md-6 offset-md-3">
					<hr />
					<h5><small className="text-muted">{new Date(date).toLocaleDateString("en-US", dateOptions)}</small></h5>
					<h6 className="text-primary">{slotDetails.slotName}</h6>
					<hr />
				</div>
				<div className="col-sm-12 col-md-6 offset-md-3">
					<div className="form-group has-danger text-left">
						<label className="form-control-label" htmlFor="firstName">First Name</label>
						<input
							type="text"
							value={formData.firstName}
							className={`form-control ${error.firstName ? 'is-invalid' : null}`}
							id="firstName"
							name="firstName"
							onChange={e => handleChange(e)}
						/>
						{error.firstName ? <div className="invalid-feedback">{error.firstName}</div> : null}
					</div>
					<div className="form-group has-danger text-left">
						<label className="form-control-label" htmlFor="lastName">Last Name</label>
						<input
							type="text"
							value={formData.lastName}
							className={`form-control ${error.lastName ? 'is-invalid' : null}`}
							id="lastName"
							name="lastName"
							onChange={e => handleChange(e)}
						/>
						{error.lastName ? <div className="invalid-feedback">{error.lastName}</div> : null}
					</div>
					<div className="form-group has-danger text-left">
						<label className="form-control-label" htmlFor="phoneNumber">Phone</label>
						<input
							type="number"
							value={formData.phoneNumber}
							onKeyDown={e => preventAlpha(e)}
							className={`form-control ${error.phoneNumber ? 'is-invalid' : null}`}
							id="phoneNumber"
							name="phoneNumber"
							onChange={e => handleChange(e)}
						/>
						{error.phoneNumber ? <div className="invalid-feedback">{error.phoneNumber}</div> : null}
					</div>
				</div>
				<div className="col-sm-12 col-md-6 offset-md-3">
					<div className="container-flu">
						<div className="row">
							<div className="col-md-6 col-sm-12 button-padding">
								<button className="btn btn-primary btn-block" onClick={e => handleSubmit(e)}>
									SAVE
								</button>
							</div>
							<div className="col-md-6 col-sm-12 button-padding">
								<button className="btn btn-danger btn-block" onClick={() => handleCancel()}>
									CANCEL
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}

export default BookingPresentational;