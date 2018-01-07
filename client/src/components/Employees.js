import React, { Component } from 'react';

class Employees extends Component {
  state = { employees: [] }

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(employees => this.setState({ employees }));
  }

  render() {
    const { employees } = this.state;

    return (
      <section className="card mb-5">
        <div className="card-header green-gradient white-text">Employees</div>
        <div className="card-body">
          {employees.length ? (
            <ul>
              {employees.map((employee, index) =>
                <li key={index}>{employee.name}, {employee.email}</li>
              )}
            </ul>
          ) : (
            <div className="empty-text">No Items</div>
          )}
        </div>
      </section>
    );
  }
}

export default Employees;
