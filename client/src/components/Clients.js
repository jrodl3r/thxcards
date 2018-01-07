import React, { Component } from 'react';

class Clients extends Component {
  state = { clients: [] }

  componentDidMount() {
    this.getClients();
  }

  getClients = () => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(clients => this.setState({ clients }));
  }

  // handleChange = (event) => {
  //   this.setState({msg: event.target.value});
  // }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('Message submitted: ' + this.state.msg);
  //   fetch('/msg', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       msg: this.state.msg
  //     })
  //   });
  // }

  render() {
    const { clients } = this.state;

    return (
      <section className="card mb-5">
        <div className="card-header aqua-gradient white-text">Clients</div>
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
                  <tr key={index}>
                    <td>{client.name}</td>
                    <td>{client.address}</td>
                    <td className="action">
                      <a href="" title="Edit" data-toggle="modal" data-target="#editClientModal">
                        <i className="fas fa-lg fa-user blue-grey-text"></i>
                      </a>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
            <div className="modal fade" id="editClientModal" tabindex="-1" role="dialog"
              aria-labelledby="editClientModallLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editClientModallLabel">Edit Client</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Edit Client
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ) : (
            <div className="card-body">
              <div className="empty-text">No Items</div>
            </div>
          )}
          {/* Render the passwords if we have them */}
          {/*passwords.length ? (
            <section className="card mb-5">
              <div className="card-header">
                  5 Passwords
              </div>
              <div className="card-body">
                <ul className="passwords">
                  {*//*
                    Generally it's bad to use "index" as a key.
                    It's ok for this example because there will always
                    be the same number of passwords, and they never
                    change positions in the array.
                  *//*}
                  {passwords.map((password, index) =>
                    <li key={index}>
                      {password}
                    </li>
                  )}
                </ul>
                <button type="button" className="btn btn-warning btn-rounded aqua-gradient"
                  onClick={this.getPasswords}>Get More</button>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Message:
                    <input type="text" value={this.state.msg} onChange={this.handleChange} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              </div>
            </section>
          ) : (
            // Render a helpful message otherwise
            <div>
              <h1>No passwords :(</h1>
              <button
                className="more"
                onClick={this.getPasswords}>
                Try Again?
              </button>
            </div>
          )*/}
      </section>
    );
  }
}

export default Clients;
