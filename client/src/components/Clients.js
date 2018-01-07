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

  render() {
    const { clients } = this.state;

    return (
      <section className="card mb-5">
        <div className="card-header info-color-dark white-text">Clients</div>
        <div className="card-body">
          {clients.length ? (
            <ul>
              {clients.map((client, index) =>
                <li key={index}>{client.name}, {client.address}</li>
              )}
            </ul>
          ) : (
            <div className="empty-text">No Items</div>
          )}
        </div>
      </section>
    );
  }
}

export default Clients;
