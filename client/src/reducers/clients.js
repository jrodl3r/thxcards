import * as types from '../types';

const initialState = {
	items: [],
  importedClients: [],
  activeClient: { _id: '', name: '', address: '' },
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  let error;

	switch (action.type) {

    case types.GET_CLIENTS:
    case types.ADD_CLIENT:
    case types.UPDATE_CLIENT:
    case types.REMOVE_CLIENT:
      return {...state, loading: true};

    case types.GET_CLIENTS_SUCCESS:
      return {...state, items: action.payload, loading: false, error: null};

    case types.ADD_CLIENT_SUCCESS:
      return {...state,
        items: [...state.items, action.payload],
        activeClient: {_id: '', name: '', address: ''},
        loading: false,
        error: null
      };

    case types.UPDATE_CLIENT_SUCCESS:
      return {...state,
        items: state.items.map(item => item._id === action.payload._id
          ? {_id: action.payload._id, name: action.payload.name, address: action.payload.address}
          : item),
        activeClient: {_id: '', name: '', address: ''},
        loading: false,
        error: null
      };

    case types.REMOVE_CLIENT_SUCCESS:
      return {...state,
        items: state.items.filter(item => item._id !== action.payload._id),
        activeClient: {_id: '', name: '', address: ''},
        loading: false,
        error: null
      };

    case types.GET_CLIENTS_FAILURE:
    case types.ADD_CLIENT_FAILURE:
    case types.UPDATE_CLIENT_FAILURE:
    case types.REMOVE_CLIENT_FAILURE:
      error = action.payload || {message: action.payload.message};
      return {...state, loading: false, error};

    case types.SET_ACTIVE_CLIENT:
      return {...state, activeClient: action.payload};

    case types.SET_ACTIVE_CLIENT_NAME:
      return {...state, activeClient: {...state.activeClient, name: action.payload}};

    case types.SET_ACTIVE_CLIENT_ADDRESS:
      return {...state, activeClient: {...state.activeClient, address: action.payload}};

    case types.CLEAR_ACTIVE_CLIENT:
      return {...state, activeClient: {_id: '', name: '', address: ''}};

		default:
			return state;
	}
};
