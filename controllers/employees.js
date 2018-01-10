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
  },

  getEmployee: async (req, res, next) => {
    const { employeeID } = req.params;
    const employee = await Employee.findById(employeeID);
    res.status(200).json(employee);
    // console.log('Sending Employee: ', employee);
  },

  replaceEmployee: async (req, res, next) => {
    const { employeeID } = req.params;
    const newEmployee = req.body;
    const result = await Employee.findByIdAndUpdate(employeeID, newEmployee);
    res.status(200).json({ success: true });
    // console.log('Replaced Employee: ', employeeID);
  },

  updateEmployee: async (req, res, next) => {
    const { employeeID } = req.params;
    const newEmployee = req.body;
    const result = await Employee.findByIdAndUpdate(employeeID, newEmployee);
    res.status(200).json({ success: true });
    // console.log('Updated Employee: ', employeeID);
  },

  deleteEmployee: async (req, res, next) => {

  }
};
