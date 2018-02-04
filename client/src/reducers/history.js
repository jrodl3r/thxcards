import * as types from '../types';

const initialState = {
	items: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  let error;

	switch (action.type) {

    case types.GET_HISTORY:
      return {...state, loading: true};

    case types.GET_HISTORY_SUCCESS:
      return {...state, items: action.data, loading: false, error: null};

    case types.GET_HISTORY_FAILURE:
      error = action.data || {message: action.data.message};
      return {...state, loading: false, error};

    case types.ZERO_DATABASE_SUCCESS:
      return {items: [], loading: false, error: null};

		default:
			return state;
	}
};
