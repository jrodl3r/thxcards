import * as types from '../types';

const initialState = {
	items: []
};

export default (state = initialState, action) => {
	switch (action.type) {

		case types.GET_CLIENTS_SUCCESS:
			return { items: action.data };

		case types.ADD_CLIENT:
      return {...state, items: [...state.items, action.data]};

		default:
			return state;
	}
};
