import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import App from './App';

it('renders the <App /> without crashing', () => {
  shallow(<App />);
});

it('renders the <Nav /> component', () => {
  const app = shallow(<App />);
  assert.equal(app.find('Nav').length, 1);
});

it('renders the <Clients /> component', () => {
  const app = shallow(<App />);
  assert.equal(app.find('Clients').length, 1);
});

it('renders the <Employees /> component', () => {
  const app = shallow(<App />);
  assert.equal(app.find('Employees').length, 1);
});

it('renders the <History /> component', () => {
  const app = shallow(<App />);
  assert.equal(app.find('History').length, 1);
});
