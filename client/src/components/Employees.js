/* global $, toastr */
import React, { Component } from 'react';

class Employees extends Component {
  state = {
    employees: [],
    activeEmployee: { name: '', email: '' }
  }

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(employees => this.setState({ employees }));
  }

  handleChangeEmployeeName = (event) => {
    this.setState({activeEmployee: {name: event.target.value, email: this.state.activeEmployee.email}});
  }

  handleChangeEmployeeEmail = (event) => {
    this.setState({activeEmployee: {name: this.state.activeEmployee.name, email: event.target.value}});
  }

  handleSubmitNewEmployee = (event) => {
    event.preventDefault();
    fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.activeEmployee.name,
        email: this.state.activeEmployee.email
      })
    })
    .then(() => {
      toastr.success('Added ' + this.state.activeEmployee.name + ' to Employees');
      this.setState({activeEmployee: {name: '', email: ''}});
      this.getEmployees();
      $('#addEmployeeModal').modal('hide');
      $('#addEmployeeModal input').removeClass('valid invalid');
    });
  }

  render() {
    const { employees, activeEmployee } = this.state;

    return (
      <section className="card mb-5">
        <div className="card-header employees-header white-text">
          Employees
          <a href="" title="Add Employee" data-toggle="modal" data-target="#addEmployeeModal">
            <i className="fas fa-lg fa-user-plus white-text"></i>
          </a>
        </div>
        {employees.length ? (
          <div className="card-body p-0">
            <table className="table table-sm mb-0">
              <thead>
                <tr className="mdb-color lighten-5 blue-grey-text">
                  <th>Name</th>
                  <th>Email</th>
                  <th className="action"></th>
                </tr>
              </thead>
            </table>
            <div className="table-wrapper table-fixed-header">
              <table className="table table-sm table-striped mb-0">
                <tbody>
                {employees.map((employee, index) => 
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td className="action">
                      <a href="" title="Edit" data-toggle="modal" data-target="#editEmployeeModal">
                        <i className="fas fa-lg fa-user blue-grey-text"></i>
                      </a>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
            <div className="modal fade" id="editEmployeeModal" tabIndex="-1" role="dialog"
              aria-labelledby="editEmployeeModallLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editEmployeeModalLabel">Edit Employee</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Edit Employee
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <div className="empty-text">No Items</div>
          </div>
        )}
        <div className="modal fade" id="addEmployeeModal" tabIndex="-1" role="dialog"
          aria-labelledby="addEmployeeModallLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header info-color-dark white-text">
                <h5 className="modal-title" id="addEmployeeModallLabel">Add Employee</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="white-text">&times;</span>
                </button>
              </div>
              <form onSubmit={this.handleSubmitNewEmployee}>
                <div className="modal-body">
                  <div className="md-form mt-4">
                    <input type="text" id="employeeName" className="form-control validate" pattern=".{1,}"
                      value={activeEmployee.name} onChange={this.handleChangeEmployeeName} required />
                    <label htmlFor="employeeName" data-error="1 characters minimum" data-success="ok">Name:</label>
                  </div>
                  <div className="md-form mt-5 mb-5">
                    <input type="text" id="employeeEmail" className="form-control validate" pattern=".{7,}"
                      value={activeEmployee.email} onChange={this.handleChangeEmployeeEmail} required />
                    <label htmlFor="employeeEmail" data-error="7 characters minimum" data-success="ok">Email:</label>
                  </div>
                </div>
                <div className="modal-footer blue-grey lighten-5">
                  <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal">Cancel</button>
                  <input type="submit" className="btn btn-primary waves-effect" value="Save" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Employees;
