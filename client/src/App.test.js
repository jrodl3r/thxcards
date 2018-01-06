import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import App from './App';

it('renders the <App /> without crashing', () => {
  shallow(<App />);
});

it('should render a <Nav /> component', () => {
  const app = shallow(<App />);
  const nav = app.find('Nav');

  assert.equal(nav.length, 1);
});

it('should render a <Clients /> component', () => {
  const app = shallow(<App />);
  const clients = app.find('Clients');

  assert.equal(clients.length, 1);
});

it('should render a <Employees /> component', () => {
  const app = shallow(<App />);
  const employees = app.find('Employees');

  assert.equal(employees.length, 1);
});

it('should render a <History /> component', () => {
  const app = shallow(<App />);
  const history = app.find('History');

  assert.equal(history.length, 1);
});
