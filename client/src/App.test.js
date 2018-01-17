import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('ThxCards', () => {
	let app;

	beforeEach(() => {
		app = shallow(<App />);
	});

	it('loads the <App /> component', () => {
		expect(app.length).toBe(1);
	});

	it('renders the <Nav /> component', () => {
	  expect(app.find('Nav').length).toEqual(1);
	});

	it('renders the <Clients /> component', () => {
	  expect(app.find('Clients').length).toEqual(1);
	});

	it('renders the <Employees /> component', () => {
	  expect(app.find('Employees').length).toEqual(1);
	});

	it('renders the <History /> component', () => {
	  expect(app.find('History').length).toEqual(1);
	});

});
