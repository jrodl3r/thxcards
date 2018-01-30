import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import clients from './clients';
import employees from './employees';

const rootReducer = combineReducers({
  clients,
  employees,
  routing
});

export default rootReducer;
