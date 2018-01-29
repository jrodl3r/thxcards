import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetModal } from '../ui';
import { getClients, addClient, updateClient, setActiveClient,
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

  render() {
    const { clients, activeClient } = this.props;

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
      </section>
    );
  }
}

Clients.propTypes = {
  getClients: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  addClient: PropTypes.func.isRequired,
  setActiveClient: PropTypes.func.isRequired,
  setActiveClientName: PropTypes.func.isRequired,
  setActiveClientAddress: PropTypes.func.isRequired,
  clearActiveClient: PropTypes.func.isRequired,
  activeClient: PropTypes.object.isRequired,
  clients: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  clients: state.clients.items,
  activeClient: state.clients.activeClient
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getClients,
  updateClient,
  addClient,
  setActiveClient,
  setActiveClientName,
  setActiveClientAddress,
  clearActiveClient
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
