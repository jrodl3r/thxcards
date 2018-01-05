import React, { Component } from 'react';
import './styles/App.css';

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
        {/*Navbar*/}
        <nav className="navbar navbar-expand-lg navbar-light aqua-gradient">
          {/* Navbar brand */}
          <a className="navbar-brand" href="">Navbar</a>
          {/* Collapse button */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {/* Links */}
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">Pricing</a>
                </li>
                {/* Dropdown */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                  <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="">Action</a>
                    <a className="dropdown-item" href="">Another action</a>
                    <a className="dropdown-item" href="">Something else here</a>
                  </div>
                </li>
              </ul>
              {/* Links */}
              {/* Search form */}
              <form className="form-inline">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              </form>
          </div>
          {/* Collapsible content */}
        </nav>
        {/*Navbar*/}
        <div className="container">
          <div className="row">
            <div className="col">1</div>
            <div className="col">2</div>
            <div className="col">3</div>
          </div>
        {/* Render the passwords if we have them */}
        {passwords.length ? (
          <section className="card">
            <div className="card-header">
                5 Passwords
            </div>
            <div className="card-body">
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
// import logo from './images/logo.svg';
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
