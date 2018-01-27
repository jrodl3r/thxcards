import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import clients from './clients';

const rootReducer = combineReducers({
  clients,
  routing
});

export default rootReducer;
