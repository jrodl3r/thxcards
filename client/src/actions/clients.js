import * as types from '../types';

export const addClient = (client) => {
  return {
    type: types.ADD_CLIENT,
    client
  };
}
