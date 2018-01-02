import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  state = { passwords: [], msg: '' }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  handleChange = (event) => {
    this.setState({msg: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Message submitted: ' + this.state.msg);
    fetch('/msg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        msg: this.state.msg
      })
    });
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col">1</div>
            <div className="col">2</div>
            <div className="col">3</div>
          </div>
        {/* Render the passwords if we have them */}
        {passwords.length ? (
          <section class="card">
            <div class="card-header">
                5 Passwords
            </div>
            <div class="card-body">
              <ul className="passwords">
                {/*
                  Generally it's bad to use "index" as a key.
                  It's ok for this example because there will always
                  be the same number of passwords, and they never
                  change positions in the array.
                */}
                {passwords.map((password, index) =>
                  <li key={index}>
                    {password}
                  </li>
                )}
              </ul>
              <button type="button" className="btn btn-warning btn-rounded aqua-gradient" onClick={this.getPasswords}>Get More</button>
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
        )}
        </div>
      </div>
    );
  }
}

export default App;

// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
