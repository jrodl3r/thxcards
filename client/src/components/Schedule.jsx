import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Schedule extends Component {
  render() {
    return (
      <div className="modal fade" id="updateScheduleModal" tabIndex="-1" role="dialog" aria-labelledby="updateScheduleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header cyan darken-1 white-text">
              <h5 className="modal-title" id="updateScheduleModalLabel">Schedule</h5>
              <button type="button" className="close white-text" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            {/*<form onSubmit={this.updateClient}>*/}
              <div className="md-form mt-4">
                {/*<div id="datepicker" data-date="12/03/2012"></div>*/}
                <input type="text" id="scheduleDatePicker" className="form-control datepicker" placeholder="Select Date" />
                <label htmlFor="scheduleDatePicker">Calendar</label>
              </div>
              <div className="md-form mt-5 mb-5">
                <input type="text" id="scheduleTimePicker" className="form-control timepicker" placeholder="Select Time" />
                <label htmlFor="scheduleTimePicker">Select Time</label>
              </div>
            </div>
            <div className="modal-footer blue-grey lighten-5">
              <button type="button" className="btn btn-secondary btn-responsive waves-effect" data-dismiss="modal">Cancel</button>
              <input type="submit" className="btn btn-primary btn-responsive waves-effect" value="Save" />
            </div>
            {/*</form>*/}
          </div>
        </div>
      </div>
    );
  }
}

// Schedule.propTypes = {};

// const mapStateToProps = state => ({});

// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

export default Schedule;
