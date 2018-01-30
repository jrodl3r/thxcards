/* global $, toastr */
import React, { Component } from 'react';
import axios from 'axios';
import XLSX from 'xlsx';

class Clients extends Component {
  state = {
    clients: [],
    importedClients: [],
    activeClient: { _id: '', name: '', address: '' }
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
    this.setState({activeClient: client});
    setTimeout(() => {
      $('#editClientModal input').removeClass('validate').focus();
      setTimeout(() => {
        $('#editClientModal input').addClass('validate');
      }, 200);
    }, 150);
  }

  clearActiveClient = () => {
    this.setState({activeClient: {_id: '', name: '', address: ''}});
  }

  handleChangeClientName = (event) => {
    this.setState({activeClient: {...this.state.activeClient, name: event.target.value}});
  }

  handleChangeClientAddress = (event) => {
    this.setState({activeClient: {...this.state.activeClient, address: event.target.value}});
  }

  handleSubmitNewClient = (event) => {
    const newClient = { name: this.state.activeClient.name, address: this.state.activeClient.address };
    event.preventDefault();
    axios.post('/api/clients', newClient)
      .then(res => {
        toastr.success(`Added ${newClient.name} to Clients`);
        this.clearActiveClient();
        this.getClients();
        $('#addClientModal').modal('hide');
        $('#addClientModal input').removeClass('valid invalid');
      })
      .catch(err => {
        toastr.error(`Add Client Failed (${newClient.name})`);
        console.log(err);
      });
  }

  handleUpdateClient = (event) => {
    const updatedClient = this.state.activeClient;
    event.preventDefault();
    axios.put('/api/clients/' + updatedClient._id, updatedClient)
      .then(() => {
        toastr.success(`Client Updated (${updatedClient.name})`);
        this.clearActiveClient();
        this.getClients();
        $('#editClientModal').modal('hide');
        $('#editClientModal input').removeClass('valid invalid');
      })
      .catch(err => {
        toastr.error(`Update Client Failed (${updatedClient.name})`);
        console.log(err);
      });
  }

  handleRemoveClient = (event) => {
    const activeClient = this.state.activeClient;
    event.preventDefault();
    axios.delete('/api/clients/' + activeClient._id, { clientID: activeClient._id })
      .then(() => {
        toastr.warning(`Client Removed (${activeClient.name})`);
        this.clearActiveClient();
        this.getClients();
        $('#editClientModal, #removeClientModal').modal('hide');
        $('#editClientModal input').removeClass('valid invalid');
      })
      .catch(err => {
        toastr.error(`Delete Client Failed (${activeClient.name})`);
        console.log(err);
      });
  }

  handleImportClients = (event) => {
    let reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (e) => {
      let noErrors = true;
      let haveImports = false;
      const fileData = e.target.result;
      const wb = XLSX.read(fileData, {type: 'binary'});
      const ws = wb.Sheets[wb.SheetNames[0]];
      const importedClients = XLSX.utils.sheet_to_json(ws);

      if (importedClients !== undefined && importedClients.length) {
        for (let i = 0; i < importedClients.length; i++) { // Check For Empty Fields
          if (!importedClients[i].hasOwnProperty('name') || !importedClients[i].hasOwnProperty('address')) {
            $('#clientsImportLabel').addClass('red-text').text('Missing Client Name or Address Field').parent().removeClass('d-none');
            $('#clientsImportFile').removeClass('valid').addClass('invalid');
            noErrors = false;
            break;
          }
          importedClients[i]._id = i;
        }
        if (noErrors) { // Diff Clients + Show Summary
          const activeClients = this.state.clients;
          importedClients.forEach((importClient) => {
            for (let i = 0; i < activeClients.length; i++) {
              if (importClient.name === activeClients[i].name) { // Client Exists
                importClient.status = 'exists';
                break;
              } else if (i === activeClients.length - 1) { // New Client
                importClient.status = 'new';
                haveImports = true;
              }
            }
          });
          if (haveImports) { // Import Ready
            this.setState({importedClients});
            $('.file-field').addClass('d-none');
            $('#clientsImportLabel').parent().addClass('d-none');
            $('#clientsImportSubmit').prop('disabled', false);
          } else {
            $('#clientsImportLabel').addClass('red-text').text('No New Clients Found').parent().removeClass('d-none');
          }
        }
      } else {
        $('#clientsImportLabel').addClass('red-text').text('Error Reading File').parent().removeClass('d-none');
        $('#clientsImportFile').removeClass('valid').addClass('invalid');
      }
    };

    if (file instanceof Blob) { reader.readAsBinaryString(file); }
    $('#clientsImportForm')[0].reset();
  }

  handleConfirmImport = (event) => {
    let newClients = [];
    const importedClients = this.state.importedClients;

    event.preventDefault();
    $('#clientsImportLabel').removeClass('red-text').text('Importing Client Data').parent().removeClass('d-none');
    $('#clientsImportFile').removeClass('invalid').addClass('valid');
    $('#clientsImportProgress').removeClass('d-none');
    $('#importClientsModal .modal-footer').addClass('d-none');

    importedClients.forEach(client => {
      if (client.status === 'new') {
        newClients.push({name: client.name, address: client.address});
      }
    });

    axios.post('/api/clients/import', newClients)
      .then(res => {
        toastr.success('Imported New Clients');
        this.handleDiscardImport();
        this.getClients();
        $('#navbarToggler').addClass('collapsed');
        $('#navbarSupportedContent').removeClass('show');
      })
      .catch(err => {
        toastr.error('Import Failed');
        console.log(err);
      });
  }

  handleDiscardImport = () => {
    $('#importClientsModal').modal('hide');
    setTimeout(() => {
      $('#clientsImportLabel').removeClass('red-text green-text').text('').parent().addClass('d-none');
      $('#clientsImportFile').removeClass('invalid valid');
      $('#clientsImportProgress').addClass('d-none');
      $('#importClientsModal .modal-footer, .file-field').removeClass('d-none');
      this.setState({importedClients: []});
    }, 300);
  }

  render() {
    const { clients, importedClients, activeClient } = this.state;

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
                    <button type="button" className="close white-text" data-dismiss="modal" aria-label="Close" onClick={() => this.clearActiveClient()}>
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
                      <p><small><a href="" className="red-text" data-toggle="modal" data-target="#removeClientModal">Remove</a></small></p>
                      <button type="button" className="btn btn-secondary btn-responsive waves-effect" data-dismiss="modal" onClick={() => this.clearActiveClient()}>Cancel</button>
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
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.clearActiveClient()}>
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
                  <button type="button" className="btn btn-secondary btn-responsive waves-effect" data-dismiss="modal" onClick={() => this.clearActiveClient()}>Cancel</button>
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
              <form id="clientsImportForm" onSubmit={this.handleConfirmImport}>
                <div className="modal-body">
                  <div className="file-field mt-4 mb-4">
                    <div className="btn btn-primary btn-sm">
                      <span>Choose file</span>
                      <input type="file" accept=".xls,.xlsx" onChange={this.handleImportClients} />
                    </div>
                    <div className="file-path-wrapper">
                      <input type="text" className="file-path validate" id="clientsImportFile" placeholder="Choose your Clients.xlsx file" />
                    </div>
                  </div>
                  <div className="form-group mt-4 mb-3 d-none">
                    <label id="clientsImportLabel" htmlFor="clientsImportFile"></label>
                  </div>
                  <div className="progress primary-color mb-5 d-none" id="clientsImportProgress">
                    <div className="indeterminate"></div>
                  </div>
                  {importedClients.length ? (
                    <div className="clients-summary mt-3 mb-4" id="clientsImportSummary">
                      <h6 className="blue-gray-text mb-4">Import Summary</h6>
                      <table className="table table-sm table-striped mb-0">
                        <tbody>
                        {importedClients.map((client, index) =>
                          <tr key={client._id}>
                            <td>{client.name || 'empty'}</td>
                            <td>{client.address || 'empty'}</td>
                            <td className={(client.status === 'exists' ? 'grey-text' : 'green-text') + ' status'}>{client.status}</td>
                          </tr>
                        )}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
                <div className="modal-footer blue-grey lighten-5">
                  <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal"
                    onClick={this.handleDiscardImport}>Cancel</button>
                  <input type="submit" className="btn btn-primary waves-effect" id="clientsImportSubmit" value="Import" disabled />
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