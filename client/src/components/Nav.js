import React, { Component } from 'react';
import logo from '../images/logo.svg';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark mb-5">
        <a className="navbar-brand" href="">
          <img src={logo} className="App-logo" alt="logo" />ThxCards
        </a>
        {/*<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="">Reset Database</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">Trigger Action Date</a>
            </li>
          </ul>
        </div>*/}
      </nav>
    );
  }
}

export default Nav;
