const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;
