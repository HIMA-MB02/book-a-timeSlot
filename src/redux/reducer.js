import { INSERT_BOOKING, INSERT_LIST, INSERT_CURRENT_DATE, INSERT_CURRENT_TIMESLOT_ID} from './actions'
export const initialState = {
	currentDate: null,
	currentTimeslotID: null,
	applicationData: {}
};

const reducer = (prevState = initialState, action) => {
	switch(action.type) {
		case INSERT_LIST:
			return {
				...prevState,
				applicationData: {
					[action.payload.id] : action.payload.list
				}
			}
		case INSERT_BOOKING:
			let appData = prevState.applicationData;
			let currentList = appData[action.payload.date];
			let updatedList = currentList.filter(slot => slot.id !== action.payload.slot.id);
			return {
				...prevState,
				applicationData: {
					...prevState.applicationData,
					[action.payload.date]: [
						...updatedList,
						action.payload.slot
					]
				}
			}
		case INSERT_CURRENT_DATE:
			return {
				...prevState,
				currentDate: action.payload
			}
		case INSERT_CURRENT_TIMESLOT_ID:
			return {
				...prevState,
				currentTimeslotID: action.payload,
			}
		default:
			return prevState
	}
}

export default reducer;