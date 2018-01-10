const express = require('express');
const router = require('express-promise-router')();

const EmployeesController = require('../controllers/employees');

router.route('/')
  .get(EmployeesController.index)
  .post(EmployeesController.newEmployee);

router.route('/:employeeID')
  .get(EmployeesController.getEmployee)
  .put(EmployeesController.replaceEmployee)
  .patch(EmployeesController.updateEmployee);

module.exports = router;
