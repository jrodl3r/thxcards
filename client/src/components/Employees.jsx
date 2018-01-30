import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ui from '../utils/ui';
import { cacheEmployeeImports, importEmployees, getEmployees, addEmployee, updateEmployee, removeEmployee, setActiveEmployee,
  clearActiveEmployee, setActiveEmployeeFirstName, setActiveEmployeeLastName, setActiveEmployeeEmail } from '../actions/employees';

class Employees extends Component {
  componentWillMount = () => {
    this.props.getEmployees();
  }

  updateActiveEmployee = (employee) => {
    this.props.setActiveEmployee(employee);
    ui.clearValidation('editEmployeeModal');
  }

  clearActiveEmployee = () => {
    this.props.clearActiveEmployee();
    ui.clearValidation('addEmployeeModal');
  }

  updateActiveEmployeeFirstName = (e) => {
    this.props.setActiveEmployeeFirstName(e.target.value);
  }

  updateActiveEmployeeLastName = (e) => {
    this.props.setActiveEmployeeLastName(e.target.value);
  }

  updateActiveEmployeeEmail = (e) => {
    this.props.setActiveEmployeeEmail(e.target.value);
  }

  updateEmployee = (e) => {
    const { activeEmployee } = this.props;
    e.preventDefault();
    this.props.updateEmployee(activeEmployee);
  }

  addEmployee = (e) => {
    const activeEmployee = this.props.activeEmployee;
    const newEmployee = { firstname: activeEmployee.firstname, lastname: activeEmployee.lastname, email: activeEmployee.email };
    e.preventDefault();
    this.props.addEmployee(newEmployee);
  }

  removeEmployee = (e) => {
    const { activeEmployee } = this.props;
    e.preventDefault();
    this.props.removeEmployee(activeEmployee);
  }

  cacheEmployeeImports = (e) => {
    let reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (e) => {
      let noErrors = true;
      let haveImports = false;
      const fileData = e.target.result;
      const wb = XLSX.read(fileData, {type: 'binary'});
      const ws = wb.Sheets[wb.SheetNames[0]];
      const importItems = XLSX.utils.sheet_to_json(ws);

      if (importItems !== undefined && importItems.length) {
        for (let i = 0; i < importItems.length; i++) { // Check For Emptys
          if (!importItems[i].hasOwnProperty('firstname') || !importItems[i].hasOwnProperty('lastname') || !importItems[i].hasOwnProperty('email')) {
            ui.importError('employees', 'Missing Employee Name or Email Field');
            noErrors = false;
            break;
          }
          importItems[i]._id = i;
        }
        if (noErrors) { // Diff + Show Summary
          const activeEmployees = this.props.employees;
          importItems.forEach(item => {
            for (let i = 0; i < activeEmployees.length; i++) {
              if (item.firstname === activeEmployees[i].firstname && item.lastname === activeEmployees[i].lastname) { // Exists
                item.status = 'exists';
                break;
              } else if (i === activeEmployees.length - 1) { // New
                item.status = 'new';
                haveImports = true;
              }
            }
          });
          if (haveImports) { // Ready
            this.props.cacheEmployeeImports(importItems);
            ui.hideImportInput('employees');
          } else { ui.importError('employees', 'No New Employees Found'); }
        }
      } else { ui.importError('employees', 'Error Reading File'); }
    };

    if (file instanceof Blob) { reader.readAsBinaryString(file); }
    ui.resetForm('employeesImportForm');
  }

  importEmployees = (e) => {
    let newEmployees = [];
    const importedEmployees = this.props.importedEmployees;

    e.preventDefault();
    ui.importMessage('employees', 'Importing Employee Data');
    ui.importShowProgress('employees');
    importedEmployees.forEach(employee => {
      if (employee.status === 'new') {
        newEmployees.push({firstname: employee.firstname, lastname: employee.lastname, email: employee.email});
      }
    });
    this.props.importEmployees(newEmployees);
  }

  discardImport = () => {
    ui.closeModal('importEmployeesModal');
    setTimeout(() => {
      ui.resetImportModal('employees');
    }, 300);
  }

  render() {
    const { employees, importedEmployees, activeEmployee } = this.props;

    return (
      <section className="card mb-5">
        <div className="card-header employees-header white-text">
          Employees
          <a href="" title="Add Employee" data-toggle="modal" data-target="#addEmployeeModal" onClick={this.clearActiveEmployee}>
            <i className="fas fa-lg fa-user-plus white-text"></i>
          </a>
        </div>
        {employees.length ? (
          <div className="card-body p-0">
            <table className="table table-sm mb-0">
              <thead>
                <tr className="mdb-color lighten-5 blue-grey-text">
                  <th>Name</th>
                  <th>Address</th>
                  <th className="action"></th>
                </tr>
              </thead>
            </table>
            <div className="table-wrapper table-fixed-header">
              <table className="table table-sm table-striped mb-0">
                <tbody>
                {employees.map((employee, index) =>
                  <tr key={employee._id}>
                    <td>{`${employee.lastname}, ${employee.firstname}` || 'empty'}</td>
                    <td>{employee.email || 'empty'}</td>
                    <td className="action">
                      <a href="" title="Edit" data-toggle="modal" data-target="#editEmployeeModal" onClick={() => this.updateActiveEmployee(employee)}>
                        <i className="fas fa-lg fa-user blue-grey-text"></i>
                      </a>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <div className="empty-text">No Items</div>
          </div>
        )}
        <div className="modal fade" id="editEmployeeModal" tabIndex="-1" role="dialog" aria-labelledby="editEmployeeModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header cyan darken-1 white-text">
                <h5 className="modal-title" id="editEmployeeModalLabel">Edit Employee</h5>
                <button type="button" className="close white-text" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.updateEmployee}>
                <div className="modal-body">
                  <div className="md-form mt-4">
                    <input type="text" id="employeeFirstNameEdit" className="form-control validate" pattern=".{3,}"
                      value={activeEmployee.firstname} onChange={this.updateActiveEmployeeFirstName} required />
                    <label htmlFor="employeeFirstNameEdit" data-error="3 characters minimum" data-success="ok">First Name:</label>
                  </div>
                  <div className="md-form mt-5">
                    <input type="text" id="employeeLastNameEdit" className="form-control validate" pattern=".{3,}"
                      value={activeEmployee.lastname} onChange={this.updateActiveEmployeeLastName} required />
                    <label htmlFor="employeeLastNameEdit" data-error="3 characters minimum" data-success="ok">Last Name:</label>
                  </div>
                  <div className="md-form mt-5 mb-5">
                    <input type="text" id="employeeEmailEdit" className="form-control validate" pattern=".{7,}"
                      value={activeEmployee.email} onChange={this.updateActiveEmployeeEmail} required />
                    <label htmlFor="employeeEmailEdit" data-error="7 characters minimum" data-success="ok">Email:</label>
                  </div>
                </div>
                <div className="modal-footer blue-grey lighten-5">
                  <p><small><a className="red-text" data-toggle="modal" data-target="#removeEmployeeModal">Remove</a></small></p>
                  <button type="button" className="btn btn-secondary btn-responsive waves-effect" data-dismiss="modal">Cancel</button>
                  <input type="submit" className="btn btn-primary btn-responsive waves-effect" value="Save" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal fade" id="addEmployeeModal" tabIndex="-1" role="dialog" aria-labelledby="addEmployeeModallLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header cyan darken-1 white-text">
                <h5 className="modal-title" id="addEmployeeModallLabel">Add Employee</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="white-text">&times;</span>
                </button>
              </div>
              <form onSubmit={this.addEmployee}>
                <div className="modal-body">
                  <div className="md-form mt-4">
                    <input type="text" id="employeeFirstName" className="form-control validate" pattern=".{3,}"
                      value={activeEmployee.firstname} onChange={this.updateActiveEmployeeFirstName} required />
                    <label htmlFor="employeeFirstName" data-error="3 characters minimum" data-success="ok">First Name:</label>
                  </div>
                  <div className="md-form mt-5">
                    <input type="text" id="employeeLastName" className="form-control validate" pattern=".{3,}"
                      value={activeEmployee.lastname} onChange={this.updateActiveEmployeeLastName} required />
                    <label htmlFor="employeeLastName" data-error="3 characters minimum" data-success="ok">Last Name:</label>
                  </div>
                  <div className="md-form mt-5 mb-5">
                    <input type="text" id="employeeEmail" className="form-control validate" pattern=".{7,}"
                      value={activeEmployee.email} onChange={this.updateActiveEmployeeEmail} required />
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
                <a href="" className="btn btn-outline-secondary-modal" onClick={this.removeEmployee}>Yes</a>
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
              <form id="employeesImportForm" onSubmit={this.importEmployees}>
                <div className="modal-body">
                  <div className="file-field mt-4 mb-4" id="employeesImportFileInput">
                    <div className="btn btn-primary btn-sm">
                      <span>Choose file</span>
                      <input type="file" accept=".xls,.xlsx" onChange={this.cacheEmployeeImports} />
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
                            <td>{`${employee.lastname}, ${employee.firstname}` || 'empty'}</td>
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
                  <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal" onClick={this.discardImport}>Cancel</button>
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

Employees.propTypes = {
  cacheEmployeeImports: PropTypes.func.isRequired,
  importEmployees: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired,
  addEmployee: PropTypes.func.isRequired,
  updateEmployee: PropTypes.func.isRequired,
  removeEmployee: PropTypes.func.isRequired,
  setActiveEmployee: PropTypes.func.isRequired,
  setActiveEmployeeFirstName: PropTypes.func.isRequired,
  setActiveEmployeeLastName: PropTypes.func.isRequired,
  setActiveEmployeeEmail: PropTypes.func.isRequired,
  clearActiveEmployee: PropTypes.func.isRequired,
  employees: PropTypes.array.isRequired,
  importedEmployees: PropTypes.array.isRequired,
  activeEmployee: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employees: state.employees.items,
  importedEmployees: state.employees.importItems,
  activeEmployee: state.employees.activeEmployee
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  cacheEmployeeImports,
  importEmployees,
  getEmployees,
  addEmployee,
  updateEmployee,
  removeEmployee,
  setActiveEmployee,
  setActiveEmployeeFirstName,
  setActiveEmployeeLastName,
  setActiveEmployeeEmail,
  clearActiveEmployee
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
