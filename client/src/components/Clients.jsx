import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetModal } from '../ui';
import { getClients, addClient, updateClient, removeClient, setActiveClient,
  setActiveClientName, setActiveClientAddress, clearActiveClient } from '../actions/clients';

class Clients extends Component {
  componentWillMount = () => {
    this.props.getClients();
  }

  updateActiveClient = (client) => {
    this.props.setActiveClient(client);
    resetModal('editClientModal');
  }

  clearActiveClient = () => {
    this.props.clearActiveClient();
    resetModal('addClientModal');
  }

  updateActiveClientName = (e) => {
    this.props.setActiveClientName(e.target.value);
  }

  updateActiveClientAddress = (e) => {
    this.props.setActiveClientAddress(e.target.value);
  }

  updateClient = (e) => {
    const { activeClient } = this.props;
    e.preventDefault();
    this.props.updateClient(activeClient);
  }

  addClient = (e) => {
    const newClient = { name: this.props.activeClient.name, address: this.props.activeClient.address };
    e.preventDefault();
    this.props.addClient(newClient);
  }

  removeClient = (e) => {
    const { activeClient } = this.props;
    e.preventDefault();
    this.props.removeClient(activeClient);
  }

  confirmImport = () => {

  }

  importClients = () => {

  }

  discardImport = () => {

  }


  render() {
    const { clients, importedClients, activeClient } = this.props;

    return (
      <section className="card mb-5">
        <div className="card-header clients-header white-text">
          Clients
          <a href="" title="Add Client" data-toggle="modal" data-target="#addClientModal" onClick={this.clearActiveClient}>
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
                      <a href="" title="Edit" data-toggle="modal" data-target="#editClientModal" onClick={() => this.updateActiveClient(client)}>
                        <i className="fas fa-lg fa-user blue-grey-text"></i>
                      </a>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <div className="empty-text">No Items</div>
          </div>
        )}
        <div className="modal fade" id="editClientModal" tabIndex="-1" role="dialog" aria-labelledby="editClientModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header cyan darken-1 white-text">
                <h5 className="modal-title" id="editClientModalLabel">Edit Client</h5>
                <button type="button" className="close white-text" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.updateClient}>
                <div className="modal-body">
                  <div className="md-form mt-4">
                    <input type="text" id="clientNameEdit" className="form-control validate" pattern=".{3,}"
                      value={activeClient.name} onChange={this.updateActiveClientName} required />
                    <label htmlFor="clientNameEdit" data-error="3 characters minimum" data-success="ok">Name:</label>
                  </div>
                  <div className="md-form mt-5 mb-5">
                    <input type="text" id="clientAddressEdit" className="form-control validate" pattern=".{10,}"
                      value={activeClient.address} onChange={this.updateActiveClientAddress} required />
                    <label htmlFor="clientAddressEdit" data-error="10 characters minimum" data-success="ok">Address:</label>
                  </div>
                </div>
                <div className="modal-footer blue-grey lighten-5">
                  <p><small><a className="red-text" data-toggle="modal" data-target="#removeClientModal">Remove</a></small></p>
                  <button type="button" className="btn btn-secondary btn-responsive waves-effect" data-dismiss="modal">Cancel</button>
                  <input type="submit" className="btn btn-primary btn-responsive waves-effect" value="Save" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal fade" id="addClientModal" tabIndex="-1" role="dialog" aria-labelledby="addClientModallLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header cyan darken-1 white-text">
                <h5 className="modal-title" id="addClientModallLabel">Add Client</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="white-text">&times;</span>
                </button>
              </div>
              <form onSubmit={this.addClient}>
                <div className="modal-body">
                  <div className="md-form mt-4">
                    <input type="text" id="clientName" className="form-control validate" pattern=".{3,}"
                      value={activeClient.name} onChange={this.updateActiveClientName} required />
                    <label htmlFor="clientName" data-error="3 characters minimum" data-success="ok">Name:</label>
                  </div>
                  <div className="md-form mt-5 mb-5">
                    <input type="text" id="clientAddress" className="form-control validate" pattern=".{10,}"
                      value={activeClient.address} onChange={this.updateActiveClientAddress} required />
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
                <a href="" className="btn btn-outline-secondary-modal" onClick={this.removeClient}>Yes</a>
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
              <form id="clientsImportForm" onSubmit={this.confirmImport}>
                <div className="modal-body">
                  <div className="file-field mt-4 mb-4">
                    <div className="btn btn-primary btn-sm">
                      <span>Choose file</span>
                      <input type="file" accept=".xls,.xlsx" onChange={this.importClients} />
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
                    onClick={this.discardImport}>Cancel</button>
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

Clients.propTypes = {
  getClients: PropTypes.func.isRequired,
  addClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  removeClient: PropTypes.func.isRequired,
  setActiveClient: PropTypes.func.isRequired,
  setActiveClientName: PropTypes.func.isRequired,
  setActiveClientAddress: PropTypes.func.isRequired,
  clearActiveClient: PropTypes.func.isRequired,
  activeClient: PropTypes.object.isRequired,
  clients: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  clients: state.clients.items,
  importedClients: state.clients.importItems,
  activeClient: state.clients.activeClient
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getClients,
  addClient,
  updateClient,
  removeClient,
  setActiveClient,
  setActiveClientName,
  setActiveClientAddress,
  clearActiveClient
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
