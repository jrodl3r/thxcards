/* global $, toastr */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { closeNav } from '../ui';
import logo from '../images/logo.svg';

class Nav extends Component {
  state = {}

  openImportClientsModal = (event) => {
    event.preventDefault();
    closeNav();
    $('#importClientsModal').modal('toggle');
  }

  openImportEmployeesModal = (event) => {
    event.preventDefault();
    closeNav();
    $('#importEmployeesModal').modal('toggle');
  }

  handleZeroDB = (event) => {
    event.preventDefault();
    axios.all([
      axios.get('/api/clients/wipe'),
      axios.get('/api/employees/wipe'),
      axios.get('/api/history/wipe')
    ])
    .then(() => {
      toastr.success('Database Wiped');
      closeNav();
      // TODO: After Redux is implemented, clear state for components
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <nav className="navbar navbar-dark mb-5">
        <Link className="navbar-brand" to="/" onClick={closeNav}>
          <img src={logo} className="App-logo" alt="logo" />ThxCards
        </Link>
        <button className="navbar-toggler" id="navbarToggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="" onClick={this.openImportClientsModal}>Import Clients</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" onClick={this.openImportEmployeesModal}>Import Employees</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" onClick={this.handleZeroDB}>Zero Database</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">Fast Forward</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help" onClick={closeNav}>Help</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
