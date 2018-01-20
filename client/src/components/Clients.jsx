/* global $, toastr */
import React, { Component } from 'react';
import axios from 'axios';
import XLSX from 'xlsx';

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
      $('#editClientModal input').removeClass('validate').focus();
      setTimeout(() => {
        $('#editClientModal input').addClass('validate');
      }, 200);
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

  handleImportClients = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (e) => {
      let noErrors = true;
      const fileData = e.target.result;
      const wb = XLSX.read(fileData, {type: 'binary'});
      const ws = wb.Sheets[wb.SheetNames[0]];
      const importedClients = XLSX.utils.sheet_to_json(ws);

      if (importedClients !== undefined && importedClients.length) {
        importedClients.forEach((client, i) => {
          if (!client.hasOwnProperty('name') || !client.hasOwnProperty('address')) {
            $('#clientsImportLabel').addClass('red-text').text(`Missing Client Name or Address Field`).parent().removeClass('d-none');
            $('#clientsImportFile').removeClass('valid').addClass('invalid');
            noErrors = false;
          }
        });
        if (noErrors) {
          $('#clientsImportLabel').removeClass('red-text').text(`Importing Client Data`).parent().removeClass('d-none');
          $('#clientsImportFile').removeClass('invalid').addClass('valid');
          $('#clientsImportProgress').removeClass('d-none');
          $('.file-field').addClass('d-none');
          console.log(importedClients);
          // TODO: Diff Clients + Show Import Summary
          
        }
      } else {
        $('#clientsImportLabel').addClass('red-text').text(`Error Reading File`).parent().removeClass('d-none');
        $('#clientsImportFile').removeClass('valid').addClass('invalid');
      }
    };

    if (file instanceof Blob) {
      reader.readAsBinaryString(file);
    }
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
                      <button type="button" className="btn btn-secondary btn-responsive waves-effect" data-dismiss="modal">Cancel</button>
                      <input type="submit" className="btn btn-primary btn-responsive waves-effect" value="Save" />
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
                  <button type="button" className="btn btn-secondary btn-responsive waves-effect" data-dismiss="modal">Cancel</button>
                  <input type="submit" className="btn btn-primary btn-responsive waves-effect" value="Save" />
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
        <div className="modal fade" id="importClientsModal" tabIndex="-1" role="dialog" aria-labelledby="importDataModallLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header cyan darken-1 white-text">
                <h5 className="modal-title" id="importDataModallLabel">Import Clients</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="white-text">&times;</span>
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="file-field mt-4 mb-4">
                    <div className="btn btn-primary btn-sm">
                      <span>Choose file</span>
                      <input type="file" accept=".xls,.xlsx" onChange={this.handleImportClients} />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" id="clientsImportFile" type="text" placeholder="Choose your Clients.xlsx file" />
                    </div>
                  </div>
                  <div className="form-group mt-4 mb-3 d-none">
                    <label id="clientsImportLabel" htmlFor="clientsImportFile">Import Client Data</label>
                  </div>
                  <div className="progress primary-color mb-4 d-none" id="clientsImportProgress">
                    <div className="indeterminate"></div>
                  </div>
                </div>
                <div className="modal-footer blue-grey lighten-5">
                  <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal">Cancel</button>
                  <input type="submit" className="btn btn-primary waves-effect" value="Import" disabled />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Clients;
