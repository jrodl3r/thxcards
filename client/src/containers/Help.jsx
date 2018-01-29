import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

const Help = ({ goHome }) => (
  <div className="container">
    <h1>Help</h1>
    <p>Coming Soon!</p>
    <p><button className="btn btn-primary waves-effect" onClick={() => goHome()}>Home</button></p>
  </div>
);

Help.propTypes = {
  goHome: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  goHome: () => push('/')
}, dispatch);

export default connect(null, mapDispatchToProps)(Help);
