/* global toastr */
import axios from 'axios';
import * as types from '../types';
import { closeNav } from '../utils/ui';

export const zeroDB = (dispatch) => {
  return (dispatch) => {
    dispatch({ type: types.ZERO_DATABASE });
    axios.all([
      axios.get('/api/clients/wipe'),
      axios.get('/api/employees/wipe'),
      axios.get('/api/history/wipe')
    ])
    .then(() => {
      toastr.success('Database Wiped');
      dispatch(zeroDBSuccess());
      closeNav();
    })
    .catch(error => dispatch(zeroDBFailure(error)));
  }
}

const zeroDBSuccess = () => {
  return { type: types.ZERO_DATABASE_SUCCESS }
}

const zeroDBFailure = (error) => {
  return { type: types.ZERO_DATABASE_FAILURE, data: error }
}
