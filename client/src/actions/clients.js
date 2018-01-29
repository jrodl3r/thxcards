/* global toastr */
import axios from 'axios';
import { closeModal } from '../ui';
import * as types from '../types';

export const getClients = (dispatch) => {
  return (dispatch) => {
    dispatch({type: types.GET_CLIENTS});
    axios.get('/api/clients')
      .then(res => dispatch(getClientsSuccess(res.data)))
      .catch(error => dispatch(getClientsFailure(error)));
  };
}

const getClientsSuccess = (clients) => {
  return { type: types.GET_CLIENTS_SUCCESS, payload: clients }
}

const getClientsFailure = (error) => {
  return { type: types.GET_CLIENTS_FAILURE, payload: error }
}

export const addClient = (client) => {
  return (dispatch) => {
    dispatch({type: types.ADD_CLIENT});
    axios.post('/api/clients', client)
      .then(res => {
        toastr.success(`Added ${client.name} to Clients`);
        dispatch(addClientSuccess(res.data));
        dispatch(clearActiveClient());
        closeModal('addClientModal');
      })
      .catch(error => {
        dispatch(addClientFailure(error));
        toastr.error(`Add Client Failed (${client.name})`);
      });
  }
}

const addClientSuccess = (client) => {
  return { type: types.ADD_CLIENT_SUCCESS, payload: client }
}

const addClientFailure = (error) => {
  return { type: types.UPDATE_CLIENT_FAILURE, payload: error }
}

export const updateClient = (client) => {
  return (dispatch) => {
    dispatch({type: types.UPDATE_CLIENT});
    axios.put('/api/clients/' + client._id, client)
      .then(res => {
        toastr.success(`Client Updated (${client.name})`);
        dispatch(updateClientSuccess(res.data));
        closeModal('editClientModal');
      })
      .catch(error => {
        dispatch(updateClientFailure(error));
        toastr.error(`Update Client Failed (${client.name})`);
      });
  }
}

const updateClientSuccess = (client) => {
  return { type: types.UPDATE_CLIENT_SUCCESS, payload: client }
}

const updateClientFailure = (error) => {
  return { type: types.UPDATE_CLIENT_FAILURE, payload: error }
}

export const setActiveClient = (client) => {
  return { type: types.SET_ACTIVE_CLIENT, payload: client }
}

export const setActiveClientName = (name) => {
  return { type: types.SET_ACTIVE_CLIENT_NAME, payload: name }
}

export const setActiveClientAddress = (address) => {
  return { type: types.SET_ACTIVE_CLIENT_ADDRESS, payload: address }
}

export const clearActiveClient = () => {
  return { type: types.CLEAR_ACTIVE_CLIENT }
}
