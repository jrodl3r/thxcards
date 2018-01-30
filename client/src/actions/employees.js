/* global toastr */
import axios from 'axios';
import { closeModal, resetImportModal } from '../utils/ui';
import * as types from '../types';

export const setActiveEmployee = (employee) => {
  return { type: types.SET_ACTIVE_EMPLOYEE, data: employee }
}

export const setActiveEmployeeFirstName = (firstname) => {
  return { type: types.SET_ACTIVE_EMPLOYEE_FIRSTNAME, data: firstname }
}

export const setActiveEmployeeLastName = (lastname) => {
  return { type: types.SET_ACTIVE_EMPLOYEE_LASTNAME, data: lastname }
}

export const setActiveEmployeeEmail = (email) => {
  return { type: types.SET_ACTIVE_EMPLOYEE_EMAIL, data: email }
}

export const clearActiveEmployee = () => {
  return { type: types.CLEAR_ACTIVE_EMPLOYEE }
}

export const getEmployees = (dispatch) => {
  return (dispatch) => {
    dispatch({ type: types.GET_EMPLOYEES });
    axios.get('/api/employees')
      .then(res => dispatch(getEmployeesSuccess(res.data)))
      .catch(error => dispatch(getEmployeesFailure(error)));
  };
}

const getEmployeesSuccess = (employees) => {
  return { type: types.GET_EMPLOYEES_SUCCESS, data: employees }
}

const getEmployeesFailure = (error) => {
  return { type: types.GET_EMPLOYEES_FAILURE, data: error }
}

export const addEmployee = (employee) => {
  return (dispatch) => {
    dispatch({ type: types.ADD_EMPLOYEE });
    axios.post('/api/employees', employee)
      .then(res => {
        toastr.success(`Added ${employee.firstname} ${employee.lastname} to Employees`);
        dispatch(addEmployeeSuccess(res.data));
        closeModal('addEmployeeModal');
      })
      .catch(error => {
        dispatch(addEmployeeFailure(error));
        toastr.error(`Add Employee Failed (${employee.firstname} ${employee.lastname})`);
      });
  }
}

const addEmployeeSuccess = (employee) => {
  return { type: types.ADD_EMPLOYEE_SUCCESS, data: employee }
}

const addEmployeeFailure = (error) => {
  return { type: types.UPDATE_EMPLOYEE_FAILURE, data: error }
}

export const updateEmployee = (employee) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_EMPLOYEE });
    axios.put('/api/employees/' + employee._id, employee)
      .then(res => {
        toastr.success(`Employee Updated (${employee.firstname} ${employee.lastname})`);
        dispatch(updateEmployeeSuccess(employee));
        closeModal('editEmployeeModal');
      })
      .catch(error => {
        dispatch(updateEmployeeFailure(error));
        toastr.error(`Update Employee Failed (${employee.firstname} ${employee.lastname})`);
      });
  }
}

const updateEmployeeSuccess = (employee) => {
  return { type: types.UPDATE_EMPLOYEE_SUCCESS, data: employee }
}

const updateEmployeeFailure = (error) => {
  return { type: types.UPDATE_EMPLOYEE_FAILURE, data: error }
}

export const removeEmployee = (employee) => {
  return (dispatch) => {
    dispatch({ type: types.REMOVE_EMPLOYEE });
    axios.delete('/api/employees/' + employee._id, { employeeID: employee._id })
      .then(res => {
        toastr.success(`Employee Removed (${employee.firstname} ${employee.lastname})`);
        dispatch(removeEmployeeSuccess(employee));
        closeModal('editEmployeeModal');
        closeModal('removeEmployeeModal');
      })
      .catch(error => {
        dispatch(removeEmployeeFailure(error));
        toastr.error(`Remove Employee Failed (${employee.firstname} ${employee.lastname})`);
      });
  }
}

const removeEmployeeSuccess = (employee) => {
  return { type: types.REMOVE_EMPLOYEE_SUCCESS, data: employee }
}

const removeEmployeeFailure = (error) => {
  return { type: types.REMOVE_EMPLOYEE_FAILURE, data: error }
}

export const importEmployees = (employees) => {
  return (dispatch) => {
    dispatch({ type: types.IMPORT_EMPLOYEES });
    axios.post('/api/employees/import', employees)
      .then(res => {
        toastr.success('Imported New Employees');
        dispatch(importEmployeesSuccess(res.data));
        closeModal('importEmployeesModal');
        setTimeout(() => {
          resetImportModal('employees');
        }, 300);
      })
      .catch(error => {
        dispatch(importEmployeesFailure(error));
        toastr.error(`Employees Import Failed`);
      });
  }
}

export const importEmployeesSuccess = (employees) => {
  return { type: types.IMPORT_EMPLOYEES_SUCCESS, data: employees }
}

export const importEmployeesFailure = (error) => {
  return { type: types.IMPORT_EMPLOYEES_FAILURE, data: error }
}

export const cacheEmployeeImports = (employees) => {
  return { type: types.CACHE_EMPLOYEE_IMPORTS, data: employees }
}
