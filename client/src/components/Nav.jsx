import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeNav, toggleModal } from '../utils/ui';
import { zeroDB } from '../actions/app';
import logo from '../images/logo.svg';

class Nav extends Component {
  openScheduleModal = (event) => {
    event.preventDefault();
    closeNav();
    toggleModal('updateScheduleModal');
  }

  openImportClientsModal = (event) => {
    event.preventDefault();
    closeNav();
    toggleModal('importClientsModal');
  }

  openImportEmployeesModal = (event) => {
    event.preventDefault();
    closeNav();
    toggleModal('importEmployeesModal');
  }

  zeroDB = (event) => {
    event.preventDefault();
    this.props.zeroDB();
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
              <a className="nav-link" href="" onClick={this.openScheduleModal}>Schedule</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" onClick={this.openImportClientsModal}>Import Clients</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" onClick={this.openImportEmployeesModal}>Import Employees</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help" onClick={closeNav}>Help</Link>
            </li>
            <li className="nav-item opaque">
              <a className="nav-link" href="">Fast Forward</a>
            </li>
            <li className="nav-item opaque">
              <a className="nav-link" href="" onClick={this.zeroDB}>Zero Database</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  zeroDB: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ zeroDB }, dispatch);

export default connect(null, mapDispatchToProps)(Nav);
