/* global toastr */
import axios from 'axios';
import { closeModal, resetImportModal } from '../utils/ui';
import * as types from '../types';

export const setActiveClient = (client) => {
  return { type: types.SET_ACTIVE_CLIENT, data: client }
}

export const setActiveClientName = (name) => {
  return { type: types.SET_ACTIVE_CLIENT_NAME, data: name }
}

export const setActiveClientAddress = (address) => {
  return { type: types.SET_ACTIVE_CLIENT_ADDRESS, data: address }
}

export const clearActiveClient = () => {
  return { type: types.CLEAR_ACTIVE_CLIENT }
}

export const getClients = (dispatch) => {
  return (dispatch) => {
    dispatch({ type: types.GET_CLIENTS });
    axios.get('/api/clients')
      .then(res => dispatch(getClientsSuccess(res.data)))
      .catch(error => dispatch(getClientsFailure(error)));
  };
}

const getClientsSuccess = (clients) => {
  return { type: types.GET_CLIENTS_SUCCESS, data: clients }
}

const getClientsFailure = (error) => {
  return { type: types.GET_CLIENTS_FAILURE, data: error }
}

export const addClient = (client) => {
  return (dispatch) => {
    dispatch({ type: types.ADD_CLIENT });
    axios.post('/api/clients', client)
      .then(res => {
        toastr.success(`Added ${client.name} to Clients`);
        dispatch(addClientSuccess(res.data));
        closeModal('addClientModal');
      })
      .catch(error => {
        dispatch(addClientFailure(error));
        toastr.error(`Add Client Failed (${client.name})`);
      });
  }
}

const addClientSuccess = (client) => {
  return { type: types.ADD_CLIENT_SUCCESS, data: client }
}

const addClientFailure = (error) => {
  return { type: types.UPDATE_CLIENT_FAILURE, data: error }
}

export const updateClient = (client) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_CLIENT });
    axios.put('/api/clients/' + client._id, client)
      .then(res => {
        toastr.success(`Client Updated (${client.name})`);
        dispatch(updateClientSuccess(client));
        closeModal('editClientModal');
      })
      .catch(error => {
        dispatch(updateClientFailure(error));
        toastr.error(`Update Client Failed (${client.name})`);
      });
  }
}

const updateClientSuccess = (client) => {
  return { type: types.UPDATE_CLIENT_SUCCESS, data: client }
}

const updateClientFailure = (error) => {
  return { type: types.UPDATE_CLIENT_FAILURE, data: error }
}

export const removeClient = (client) => {
  return (dispatch) => {
    dispatch({ type: types.REMOVE_CLIENT });
    axios.delete('/api/clients/' + client._id, { clientID: client._id })
      .then(res => {
        toastr.success(`Client Removed (${client.name})`);
        dispatch(removeClientSuccess(client));
        closeModal('editClientModal');
        closeModal('removeClientModal');
      })
      .catch(error => {
        dispatch(removeClientFailure(error));
        toastr.error(`Remove Client Failed (${client.name})`);
      });
  }
}

const removeClientSuccess = (client) => {
  return { type: types.REMOVE_CLIENT_SUCCESS, data: client }
}

const removeClientFailure = (error) => {
  return { type: types.REMOVE_CLIENT_FAILURE, data: error }
}

export const importClients = (clients) => {
  return (dispatch) => {
    dispatch({ type: types.IMPORT_CLIENTS });
    axios.post('/api/clients/import', clients)
      .then(res => {
        toastr.success('Imported New Clients');
        dispatch(importClientsSuccess(res.data));
        closeModal('importClientsModal');
        setTimeout(() => {
          resetImportModal('clients');
        }, 300);
      })
      .catch(error => {
        dispatch(importClientsFailure(error));
        toastr.error(`Clients Import Failed`);
      });
  }
}

export const importClientsSuccess = (clients) => {
  return { type: types.IMPORT_CLIENTS_SUCCESS, data: clients }
}

export const importClientsFailure = (error) => {
  return { type: types.IMPORT_CLIENTS_FAILURE, data: error }
}

export const cacheClientImports = (clients) => {
  return { type: types.CACHE_CLIENT_IMPORTS, data: clients }
}
