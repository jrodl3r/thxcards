const express = require('express');
const router = require('express-promise-router')();

const EmployeesController = require('../controllers/employees');

const { validateParam, schemas } = require('./routeHelpers');

router.route('/')
  .get(EmployeesController.index)
  .post(EmployeesController.newEmployee);

router.route('/import')
  .post(EmployeesController.importEmployees);

router.route('/wipe')
  .get(EmployeesController.wipeEmployees);

router.route('/:employeeID')
  .get(validateParam(schemas.idSchema, 'employeeID'), EmployeesController.getEmployee)
  .put(validateParam(schemas.idSchema, 'employeeID'), EmployeesController.replaceEmployee)
  .patch(validateParam(schemas.idSchema, 'employeeID'), EmployeesController.updateEmployee)
  .delete(validateParam(schemas.idSchema, 'employeeID'), EmployeesController.deleteEmployee);

module.exports = router;
