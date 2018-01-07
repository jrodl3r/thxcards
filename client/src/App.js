import React, { Component } from 'react';
import Nav from './components/Nav';
import Clients from './components/Clients';
import Employees from './components/Employees';
import History from './components/History';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Clients />
            </div>
            <div className="col-md-6">
              <Employees />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <History />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
