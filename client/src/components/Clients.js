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
