import { createStore } from 'redux';
import reducer from './reducer'
import {initialState} from './reducer'

const persistedState = localStorage.getItem('reduxState')
	? JSON.parse(localStorage.getItem('reduxState'))
	: initialState
const store = createStore(reducer, persistedState);
store.subscribe(() => {
	localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store;