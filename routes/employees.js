const express = require('express');
const router = require('express-promise-router')();

const EmployeesController = require('../controllers/employees');

router.route('/')
  .get(EmployeesController.index)
  .post(EmployeesController.newEmployee);

module.exports = router;
