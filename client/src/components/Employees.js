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
                  <tr key={index}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td className="action">
                      <a href="" data-toggle="tooltip" data-placement="left" title="Edit">
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
      </section>
    );
  }
}

export default Employees;
