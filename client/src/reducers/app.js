import * as types from '../types';

const initialState = {
	loading: false,
  error: null
};

export default (state = initialState, action) => {
  let error;

	switch (action.type) {

    case types.ZERO_DATABASE:
      return {...state, loading: true};

    case types.ZERO_DATABASE_SUCCESS:
      return {loading: false, error: null};

    case types.ZERO_DATABASE_FAILURE:
      error = action.data || {message: action.data.message};
      return {loading: false, error};

		default:
			return state;
	}
};
