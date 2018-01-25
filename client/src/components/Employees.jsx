/* global $, toastr */
import React, { Component } from 'react';
import axios from 'axios';
import XLSX from 'xlsx';

class Employees extends Component {
  state = {
    employees: [],
    importedEmployees: [],
    activeEmployee: { id: '', name: '', email: '' }
  }

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    axios.get('/api/employees')
      .then((res) => this.setState({employees: res.data}))
      .catch(err => console.log(err));
  }

  setActiveEmployee = (employee) => {
    this.setState({activeEmployee: {id: employee._id, name: employee.name, email: employee.email}});
    setTimeout(() => {
      $('#editEmployeeModal input').removeClass('validate').focus();
      setTimeout(() => {
        $('#editEmployeeModal input').addClass('validate');
      }, 200);
    }, 150);
  }

  handleChangeEmployeeName = (event) => {
    this.setState({activeEmployee: {id: this.state.activeEmployee.id, name: event.target.value, email: this.state.activeEmployee.email}});
  }

  handleChangeEmployeeEmail = (event) => {
    this.setState({activeEmployee: {id: this.state.activeEmployee.id, name: this.state.activeEmployee.name, email: event.target.value}});
  }

  handleSubmitNewEmployee = (event) => {
    const newEmployee = { name: this.state.activeEmployee.name, email: this.state.activeEmployee.email };
    event.preventDefault();
    axios.post('/api/employees', newEmployee)
      .then(res => {
        toastr.success('Added ' + this.state.activeEmployee.name + ' to Employees');
        this.setState({activeEmployee: {name: '', email: ''}});
        this.getEmployees();
        $('#addEmployeeModal').modal('hide');
        $('#addEmployeeModal input').removeClass('valid invalid');
      })
      .catch(err => {
        toastr.error('Submit Failed (' + this.state.activeEmployee.name + ')');
        console.log(err);
      });
  }

  handleUpdateEmployee = (event) => {
    const updatedEmployee = { name: this.state.activeEmployee.name, email: this.state.activeEmployee.email };
    event.preventDefault();
    axios.put('/api/employees/' + this.state.activeEmployee.id, updatedEmployee)
      .then(() => {
        toastr.success('Employee Updated (' + this.state.activeEmployee.name + ')');
        this.setState({activeEmployee: {id: '', name: '', email: ''}});
        this.getEmployees();
        $('#editEmployeeModal').modal('hide');
        $('#editEmployeeModal input').removeClass('valid invalid');
      })
      .catch(err => {
        toastr.error('Update Failed (' + this.state.activeEmployee.name + ')');
        console.log(err);
      });
  }

  handleRemoveEmployee = (event) => {
    event.preventDefault();
    axios.delete('/api/employees/' + this.state.activeEmployee.id, { employeeID: this.state.activeEmployee.id })
      .then(() => {
        toastr.success('Employee Removed (' + this.state.activeEmployee.name + ')');
        this.setState({activeEmployee: {id: '', name: '', email: ''}});
        this.getEmployees();
        $('#editEmployeeModal, #removeEmployeeModal').modal('hide');
        $('#editEmployeeModal input').removeClass('valid invalid');
      })
      .catch(err => {
        toastr.error('Delete Failed (' + this.state.activeEmployee.name + ')');
        console.log(err);
      });
  }

  handleImportEmployees = (event) => {
    let reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (e) => {
      let noErrors = true;
      let haveImports = false;
      const fileData = e.target.result;
      const wb = XLSX.read(fileData, {type: 'binary'});
      const ws = wb.Sheets[wb.SheetNames[0]];
      const importedEmployees = XLSX.utils.sheet_to_json(ws);

      if (importedEmployees !== undefined && importedEmployees.length) {
        for (let i = 0; i < importedEmployees.length; i++) { // Check For Empty Fields
          if (!importedEmployees[i].hasOwnProperty('name') || !importedEmployees[i].hasOwnProperty('email')) {
            $('#employeesImportLabel').addClass('red-text').text('Missing Employee Name or Email Field').parent().removeClass('d-none');
            $('#employeesImportFile').removeClass('valid').addClass('invalid');
            noErrors = false;
            break;
          }
          importedEmployees[i]._id = i;
        }
        if (noErrors) { // Diff Employees + Show Summary
          const activeEmployees = this.state.employees;
          importedEmployees.forEach((importEmployee) => {
            for (let i = 0; i < activeEmployees.length; i++) {
              if (importEmployee.name === activeEmployees[i].name) { // Employee Exists
                importEmployee.status = 'exists';
                break;
              } else if (i === activeEmployees.length - 1) { // New Employee
                importEmployee.status = 'new';
                haveImports = true;
              }
            }
          });
          this.setState({importedEmployees});
          if (haveImports) { // Import Ready
            $('.file-field').addClass('d-none');
            $('#employeesImportLabel').parent().addClass('d-none');
            $('#employeesImportSubmit').prop('disabled', false);
          }
        }
      } else {
        $('#employeesImportLabel').addClass('red-text').text('Error Reading File').parent().removeClass('d-none');
        $('#employeesImportFile').removeClass('valid').addClass('invalid');
      }
    };

    if (file instanceof Blob) { reader.readAsBinaryString(file); }
    $('#employeesImportForm')[0].reset();
  }

  handleConfirmImport = (event) => {
    let newEmployees = [];
    const importedEmployees = this.state.importedEmployees;

    event.preventDefault();
    $('#employeesImportLabel').removeClass('red-text').text('Importing Employee Data').parent().removeClass('d-none');
    $('#employeesImportFile').removeClass('invalid').addClass('valid');
    $('#employeesImportProgress').removeClass('d-none');
    $('#importEmployeesModal .modal-footer').addClass('d-none');

    importedEmployees.forEach(employee => {
      if (employee.status === 'new') {
        newEmployees.push({name: employee.name, email: employee.email});
      }
    });

    axios.post('/api/employees/import', newEmployees)
      .then(res => {
        toastr.success('Imported New Employees');
        this.handleDiscardImport();
        this.getEmployees();
        $('#navbarToggler').addClass('collapsed');
        $('#navbarSupportedContent').removeClass('show');
      })
      .catch(err => {
        toastr.error('Import Failed');
        console.log(err);
      });
  }

  handleDiscardImport = () => {
    $('#importEmployeesModal').modal('hide');
    setTimeout(() => {
      $('#employeesImportLabel').removeClass('red-text green-text').text('').parent().addClass('d-none');
      $('#employeesImportFile').removeClass('invalid valid');
      $('#employeesImportProgress').addClass('d-none');
      $('#importEmployeesModal .modal-footer, .file-field').removeClass('d-none');
      this.setState({importedEmployees: []});
    }, 300);
  }

  render() {
    const { employees, importedEmployees, activeEmployee } = this.state;

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
                    <td>{employee.name || 'empty'}</td>
                    <td>{employee.email || 'empty'}</td>
                    <td className="action">
                      <a href="" title="Edit" data-toggle="modal" data-target="#editEmployeeModal" onClick={() => this.setActiveEmployee(employee)}>
                        <i className="fas fa-lg fa-user blue-grey-text"></i>
                      </a>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
            <div className="modal fade" id="editEmployeeModal" tabIndex="-1" role="dialog" aria-labelledby="editEmployeeModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header light-blue darken-1 white-text">
                    <h5 className="modal-title" id="editEmployeeModalLabel">Edit Employee</h5>
                    <button type="button" className="close white-text" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form onSubmit={this.handleUpdateEmployee}>
                    <div className="modal-body">
                      <div className="md-form mt-4">
                        <input type="text" id="employeeNameEdit" className="form-control validate" pattern=".{3,}"
                          value={activeEmployee.name} onChange={this.handleChangeEmployeeName} required />
                        <label htmlFor="employeeNameEdit" data-error="3 characters minimum" data-success="ok">Name:</label>
                      </div>
                      <div className="md-form mt-5 mb-5">
                        <input type="text" id="employeeEmailEdit" className="form-control validate" pattern=".{10,}"
                          value={activeEmployee.email} onChange={this.handleChangeEmployeeEmail} required />
                        <label htmlFor="employeeEmailEdit" data-error="10 characters minimum" data-success="ok">Email:</label>
                      </div>
                    </div>
                    <div className="modal-footer blue-grey lighten-5">
                      <p><small><a href="" className="red-text" data-toggle="modal" data-target="#removeEmployeeModal">Remove Employee</a></small></p>
                      <button type="button" className="btn btn-secondary btn-responsive waves-effect" data-dismiss="modal">Cancel</button>
                      <input type="submit" className="btn btn-primary btn-responsive waves-effect" value="Save" />
                    </div>
                  </form>
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
              <div className="modal-header light-blue darken-1 white-text">
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
                  <button type="button" className="btn btn-secondary btn-responsive waves-effect" data-dismiss="modal">Cancel</button>
                  <input type="submit" className="btn btn-primary btn-responsive waves-effect" value="Save" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal fade" id="removeEmployeeModal" tabIndex="-1" role="dialog" aria-labelledby="removeEmployeeModal" aria-hidden="true">
          <div className="modal-dialog modal-sm modal-notify modal-danger" role="document">
            <div className="modal-content text-center">
              <div className="modal-header d-flex justify-content-center">
                <p className="heading">Are you sure?</p>
              </div>
              <div className="modal-body">
                <i className="fa fa-times fa-4x animated rotateIn"></i>
              </div>
              <div className="modal-footer flex-center">
                <a href="" className="btn btn-outline-secondary-modal" onClick={this.handleRemoveEmployee}>Yes</a>
                <a type="button" className="btn btn-primary-modal waves-effect" data-dismiss="modal">No</a>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="importEmployeesModal" tabIndex="-1" role="dialog" aria-labelledby="importDataModallLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header cyan darken-1 white-text">
                <h5 className="modal-title" id="importDataModallLabel">Import Employees</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="white-text">&times;</span>
                </button>
              </div>
              <form id="employeesImportForm" onSubmit={this.handleConfirmImport}>
                <div className="modal-body">
                  <div className="file-field mt-4 mb-4">
                    <div className="btn btn-primary btn-sm">
                      <span>Choose file</span>
                      <input type="file" accept=".xls,.xlsx" onChange={this.handleImportEmployees} />
                    </div>
                    <div className="file-path-wrapper">
                      <input type="text" className="file-path validate" id="employeesImportFile" placeholder="Choose your Employees.xlsx file" />
                    </div>
                  </div>
                  <div className="form-group mt-4 mb-3 d-none">
                    <label id="employeesImportLabel" htmlFor="employeesImportFile"></label>
                  </div>
                  <div className="progress primary-color mb-5 d-none" id="employeesImportProgress">
                    <div className="indeterminate"></div>
                  </div>
                  {importedEmployees.length ? (
                    <div className="employees-summary mt-3 mb-4" id="employeesImportSummary">
                      <h6 className="blue-gray-text mb-4">Import Summary</h6>
                      <table className="table table-sm table-striped mb-0">
                        <tbody>
                        {importedEmployees.map((employee, index) =>
                          <tr key={employee._id}>
                            <td>{employee.name || 'empty'}</td>
                            <td>{employee.email || 'empty'}</td>
                            <td className={(employee.status === 'exists' ? 'grey-text' : 'green-text') + ' status'}>{employee.status}</td>
                          </tr>
                        )}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
                <div className="modal-footer blue-grey lighten-5">
                  <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal"
                    onClick={this.handleDiscardImport}>Cancel</button>
                  <input type="submit" className="btn btn-primary waves-effect" id="employeesImportSubmit" value="Import" disabled />
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
