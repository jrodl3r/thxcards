/* global $, toastr */
import React, { Component } from 'react';
import axios from 'axios';

class Clients extends Component {
  state = {
    clients: [],
    activeClient: { id: '', name: '', address: '' }
  }

  componentDidMount() {
    this.getClients();
  }

  getClients = () => {
    axios.get('/api/clients')
      .then(res => this.setState({clients: res.data}))
      .catch(err => console.log(err));
  }

  setActiveClient = (client) => {
    this.setState({activeClient: {id: client._id, name: client.name, address: client.address}});
    setTimeout(() => {
      $('#editClientModal input').focus().focus().blur().removeClass('valid invalid');
    }, 150);
  }

  handleChangeClientName = (event) => {
    this.setState({activeClient: {id: this.state.activeClient.id, name: event.target.value, address: this.state.activeClient.address}});
  }

  handleChangeClientAddress = (event) => {
    this.setState({activeClient: {id: this.state.activeClient.id, name: this.state.activeClient.name, address: event.target.value}});
  }

  handleSubmitNewClient = (event) => {
    const newClient = { name: this.state.activeClient.name, address: this.state.activeClient.address };
    event.preventDefault();
    axios.post('/api/clients', newClient)
      .then(res => {
        toastr.success('Added ' + this.state.activeClient.name + ' to Clients');
        this.setState({activeClient: {name: '', address: ''}});
        this.getClients();
        $('#addClientModal').modal('hide');
        $('#addClientModal input').removeClass('valid invalid');
      })
      .catch(err => {
        toastr.error('Submit Failed (' + this.state.activeClient.name + ')');
        console.log(err);
      });
  }

  handleUpdateClient = (event) => {
    const updatedClient = { name: this.state.activeClient.name, address: this.state.activeClient.address };
    event.preventDefault();
    axios.put('/api/clients/' + this.state.activeClient.id, updatedClient)
      .then(() => {
        toastr.success('Client Updated (' + this.state.activeClient.name + ')');
        this.setState({activeClient: {id: '', name: '', address: ''}});
        this.getClients();
        $('#editClientModal').modal('hide');
        $('#editClientModal input').removeClass('valid invalid');
      })
      .catch(err => {
        toastr.error('Update Failed (' + this.state.activeClient.name + ')');
        console.log(err);
      });
  }

  handleRemoveClient = (event) => {
    event.preventDefault();
    axios.delete('/api/clients/' + this.state.activeClient.id, { clientID: this.state.activeClient.id })
      .then(() => {
        toastr.success('Client Removed (' + this.state.activeClient.name + ')');
        this.setState({activeClient: {id: '', name: '', address: ''}});
        this.getClients();
        $('#editClientModal, #removeClientModal').modal('hide');
        $('#editClientModal input').removeClass('valid invalid');
      })
      .catch(err => {
        toastr.error('Delete Failed (' + this.state.activeClient.name + ')');
        console.log(err);
      });
  }

  render() {
    const { clients, activeClient } = this.state;

    return (
      <section className="card mb-5">
        <div className="card-header clients-header white-text">
          Clients
          <a href="" title="Add Client" data-toggle="modal" data-target="#addClientModal">
            <i className="fas fa-lg fa-user-plus white-text"></i>
          </a>
        </div>
        {clients.length ? (
          <div className="card-body p-0">
            <table className="table table-sm mb-0">
              <thead>
                <tr className="mdb-color lighten-5 blue-grey-text">
                  <th>Name</th>
                  <th>Address</th>
                  <th className="action"></th>
                </tr>
              </thead>
            </table>
            <div className="table-wrapper table-fixed-header">
              <table className="table table-sm table-striped mb-0">
                <tbody>
                {clients.map((client, index) =>
                  <tr key={client._id}>
                    <td>{client.name || 'empty'}</td>
                    <td>{client.address || 'empty'}</td>
                    <td className="action">
                      <a href="" title="Edit" data-toggle="modal" data-target="#editClientModal" onClick={() => this.setActiveClient(client)}>
                        <i className="fas fa-lg fa-user blue-grey-text"></i>
                      </a>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
            <div className="modal fade" id="editClientModal" tabIndex="-1" role="dialog" aria-labelledby="editClientModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header cyan darken-1 white-text">
                    <h5 className="modal-title" id="editClientModalLabel">Edit Client</h5>
                    <button type="button" className="close white-text" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form onSubmit={this.handleUpdateClient}>
                    <div className="modal-body">
                      <div className="md-form mt-4">
                        <input type="text" id="clientNameEdit" className="form-control validate" pattern=".{3,}"
                          value={activeClient.name} onChange={this.handleChangeClientName} required />
                        <label htmlFor="clientNameEdit" data-error="3 characters minimum" data-success="ok">Name:</label>
                      </div>
                      <div className="md-form mt-5 mb-5">
                        <input type="text" id="clientAddressEdit" className="form-control validate" pattern=".{10,}"
                          value={activeClient.address} onChange={this.handleChangeClientAddress} required />
                        <label htmlFor="clientAddressEdit" data-error="10 characters minimum" data-success="ok">Address:</label>
                      </div>
                    </div>
                    <div className="modal-footer blue-grey lighten-5">
                      <p><small><a href="" className="red-text" data-toggle="modal" data-target="#removeClientModal">Remove Client</a></small></p>
                      <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal">Cancel</button>
                      <input type="submit" className="btn btn-primary waves-effect" value="Save" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <div className="empty-text">No Items</div>
          </div>
        )}
        <div className="modal fade" id="addClientModal" tabIndex="-1" role="dialog" aria-labelledby="addClientModallLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header cyan darken-1 white-text">
                <h5 className="modal-title" id="addClientModallLabel">Add Client</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="white-text">&times;</span>
                </button>
              </div>
              <form onSubmit={this.handleSubmitNewClient}>
                <div className="modal-body">
                  <div className="md-form mt-4">
                    <input type="text" id="clientName" className="form-control validate" pattern=".{3,}"
                      value={activeClient.name} onChange={this.handleChangeClientName} required />
                    <label htmlFor="clientName" data-error="3 characters minimum" data-success="ok">Name:</label>
                  </div>
                  <div className="md-form mt-5 mb-5">
                    <input type="text" id="clientAddress" className="form-control validate" pattern=".{10,}"
                      value={activeClient.address} onChange={this.handleChangeClientAddress} required />
                    <label htmlFor="clientAddress" data-error="10 characters minimum" data-success="ok">Address:</label>
                  </div>
                </div>
                <div className="modal-footer blue-grey lighten-5">
                  <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal">Cancel</button>
                  <input type="submit" className="btn btn-primary waves-effect" value="Save" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal fade" id="removeClientModal" tabIndex="-1" role="dialog" aria-labelledby="removeClientModal" aria-hidden="true">
          <div className="modal-dialog modal-sm modal-notify modal-danger" role="document">
            <div className="modal-content text-center">
              <div className="modal-header d-flex justify-content-center">
                <p className="heading">Are you sure?</p>
              </div>
              <div className="modal-body">
                <i className="fa fa-times fa-4x animated rotateIn"></i>
              </div>
              <div className="modal-footer flex-center">
                <a href="" className="btn btn-outline-secondary-modal" onClick={this.handleRemoveClient}>Yes</a>
                <a type="button" className="btn btn-primary-modal waves-effect" data-dismiss="modal">No</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Clients;
