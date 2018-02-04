import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import app from './app';
import clients from './clients';
import employees from './employees';
import history from './history';

const rootReducer = combineReducers({
  app,
  clients,
  employees,
  history,
  routing
});

export default rootReducer;
