import * as types from '../types';

const initialState = {
	items: [],
  importItems: [],
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
    case types.IMPORT_CLIENTS:
      return {...state, loading: true};

    case types.GET_CLIENTS_SUCCESS:
      return {...state, items: action.data, loading: false, error: null};

    case types.ADD_CLIENT_SUCCESS:
      return {...state,
        items: [...state.items, action.data],
        activeClient: {_id: '', name: '', address: ''},
        loading: false,
        error: null
      };

    case types.UPDATE_CLIENT_SUCCESS:
      return {...state,
        items: state.items.map(item => item._id === action.data._id
          ? {_id: action.data._id, name: action.data.name, address: action.data.address}
          : item),
        activeClient: {_id: '', name: '', address: ''},
        loading: false,
        error: null
      };

    case types.REMOVE_CLIENT_SUCCESS:
      return {...state,
        items: state.items.filter(item => item._id !== action.data._id),
        activeClient: {_id: '', name: '', address: ''},
        loading: false,
        error: null
      };

    case types.IMPORT_CLIENTS_SUCCESS:
      return {...state,
        items: [...state.items, ...action.data],
        importItems: [],
        loading: false,
        error: null
      };

    case types.CACHE_CLIENT_IMPORTS:
      return {...state, importItems: action.data};

    case types.CLEAR_CLIENT_IMPORTS:
      return {...state, importItems: []};

    case types.GET_CLIENTS_FAILURE:
    case types.ADD_CLIENT_FAILURE:
    case types.UPDATE_CLIENT_FAILURE:
    case types.REMOVE_CLIENT_FAILURE:
    case types.IMPORT_CLIENTS_FAILURE:
      error = action.data || {message: action.data.message};
      return {...state, loading: false, error};

    case types.SET_ACTIVE_CLIENT:
      return {...state, activeClient: action.data};

    case types.SET_ACTIVE_CLIENT_NAME:
      return {...state, activeClient: {...state.activeClient, name: action.data}};

    case types.SET_ACTIVE_CLIENT_ADDRESS:
      return {...state, activeClient: {...state.activeClient, address: action.data}};

    case types.CLEAR_ACTIVE_CLIENT:
      return {...state, activeClient: {_id: '', name: '', address: ''}};

    case types.ZERO_DATABASE_SUCCESS:
      return {items: [], importItems: [], activeClient: {_id: '', name: '', address: ''}, loading: false, error: null};

		default:
			return state;
	}
};
