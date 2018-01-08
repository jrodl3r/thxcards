const Employee = require('../models/employee');

module.exports = {
  index: async (req, res, next) => {
    const employees = await Employee.find({});
    res.status(200).json(employees);
    // console.log('Sending Employees: ', employees);
  },

  newEmployee: async (req, res, next) => {
    const newEmployee = new Employee(req.body);
    const employee = await newEmployee.save();
    res.status(201).json(employee);
    // console.log('Saved Employee: ', employee);
  }
};
