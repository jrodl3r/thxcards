import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Employees from './Employees';

describe('Employees', () => {

  it('renders <Employees /> without crashing', () => {
    const mock = new MockAdapter(axios);
    const employeesData = [
      {'_id': '123', 'name': 'Bob Watson', 'email': 'bob@lightspeedvt.com'},
      {'_id': '456', 'name': 'Steve Balmer', 'email': 'steve@lightspeedvt.com'}];

    mock.onGet('api/employees').reply(200, employeesData);
    shallow(<Employees />);
  });

});
