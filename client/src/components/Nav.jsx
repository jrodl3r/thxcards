/* global $ */
import React, { Component } from 'react';
import logo from '../images/logo.svg';

class Nav extends Component {
  state = {}

  openImportClientsModal = (event) => {
    event.preventDefault();
    $('#importClientsModal').modal('toggle');
  }

  openImportEmployeesModal = (event) => {
    event.preventDefault();
    $('#importEmployeesModal').modal('toggle');
  }

  render() {
    return (
      <nav className="navbar navbar-dark mb-5">
        <a className="navbar-brand" href="">
          <img src={logo} className="App-logo" alt="logo" />ThxCards
        </a>
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
              <a className="nav-link" href="">Zero Database</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">Fast Forward</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
