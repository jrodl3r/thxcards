import axios from 'axios';
import * as types from '../types';

export const getHistory = (dispatch) => {
  return (dispatch) => {
    dispatch({ type: types.GET_HISTORY });
    axios.get('/api/history')
      .then(res => dispatch(getHistorySuccess(res.data)))
      .catch(error => dispatch(getHistoryFailure(error)));
  };
}

const getHistorySuccess = (history) => {
  return { type: types.GET_HISTORY_SUCCESS, data: history }
}

const getHistoryFailure = (error) => {
  return { type: types.GET_HISTORY_FAILURE, data: error }
}
