import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount, shallow } from 'enzyme';
import Employees from './Employees';

describe('Employees', () => {
  let employees, mock;
  const employeeData =
    [{'_id': '123', 'name': 'Bob Watson', 'email': 'bob@lightspeedvt.com'},
     {'_id': '456', 'name': 'Steve Balmer', 'email': 'steve@lightspeedvt.com'}];

  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet('api/employees').reply(200, employeeData);
    employees = mount(<Employees />);
  });

  it('loads the <Employees /> component', () => {
    expect(employees.length).toBe(1);
  });

  it('gets employee data and updates the state', () => {
    employees.update();
    expect(employees.state()).toHaveProperty('employees', employeeData);
    expect(employees.find('.card-body').length).toEqual(1);
    expect(employees.find('.empty-text').length).toEqual(0);
    expect(employees.find('table').length).toEqual(2);
    expect(employees.find('tr').length).toEqual(3);
  });

});
