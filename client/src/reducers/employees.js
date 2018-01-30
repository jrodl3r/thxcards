import * as types from '../types';

const initialState = {
	items: [],
  importItems: [],
  activeEmployee: { _id: '', firstname: '', lastname: '', email: '' },
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  let error;

	switch (action.type) {

    case types.GET_EMPLOYEES:
    case types.ADD_EMPLOYEE:
    case types.UPDATE_EMPLOYEE:
    case types.REMOVE_EMPLOYEE:
    case types.IMPORT_EMPLOYEES:
      return {...state, loading: true};

    case types.GET_EMPLOYEES_SUCCESS:
      return {...state, items: action.data, loading: false, error: null};

    case types.ADD_EMPLOYEE_SUCCESS:
      return {...state,
        items: [...state.items, action.data],
        activeEmployee: {_id: '', firstname: '', lastname: '', email: ''},
        loading: false,
        error: null
      };

    case types.UPDATE_EMPLOYEE_SUCCESS:
      return {...state,
        items: state.items.map(item => item._id === action.data._id
          ? {_id: action.data._id, firstname: action.data.firstname, lastname: action.data.lastname, email: action.data.email}
          : item),
        activeEmployee: {_id: '', firstname: '', lastname: '', email: ''},
        loading: false,
        error: null
      };

    case types.REMOVE_EMPLOYEE_SUCCESS:
      return {...state,
        items: state.items.filter(item => item._id !== action.data._id),
        activeEmployee: {_id: '', firstname: '', lastname: '', email: ''},
        loading: false,
        error: null
      };

    case types.IMPORT_EMPLOYEES_SUCCESS:
      return {...state,
        items: [...state.items, ...action.data],
        importItems: [],
        loading: false,
        error: null
      };

    case types.CACHE_EMPLOYEE_IMPORTS:
      return {...state, importItems: action.data};

    case types.CLEAR_EMPLOYEE_IMPORTS:
      return {...state, importItems: []};

    case types.GET_EMPLOYEES_FAILURE:
    case types.ADD_EMPLOYEE_FAILURE:
    case types.UPDATE_EMPLOYEE_FAILURE:
    case types.REMOVE_EMPLOYEE_FAILURE:
    case types.IMPORT_EMPLOYEES_FAILURE:
      error = action.data || {message: action.data.message};
      return {...state, loading: false, error};

    case types.SET_ACTIVE_EMPLOYEE:
      return {...state, activeEmployee: action.data};

    case types.SET_ACTIVE_EMPLOYEE_FIRSTNAME:
      return {...state, activeEmployee: {...state.activeEmployee, firstname: action.data}};

    case types.SET_ACTIVE_EMPLOYEE_LASTNAME:
      return {...state, activeEmployee: {...state.activeEmployee, lastname: action.data}};

    case types.SET_ACTIVE_EMPLOYEE_EMAIL:
      return {...state, activeEmployee: {...state.activeEmployee, email: action.data}};

    case types.CLEAR_ACTIVE_EMPLOYEE:
      return {...state, activeEmployee: {_id: '', firstname: '', lastname: '', email: ''}};

		default:
			return state;
	}
};
