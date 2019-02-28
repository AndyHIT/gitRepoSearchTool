import { RECEIVE_RESULT } from '../actions/action.js';

const reducer = (state=[], action) => {
	switch (action.type) {
		case RECEIVE_RESULT:
			return {
				...state,
				result: action.result.items,
			}	
		default:
			return {...state}
	}
}

export default reducer