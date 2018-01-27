import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

describe('Home', () => {
	let home;

	beforeEach(() => {
		home = shallow(<Home />);
	});

	it('loads the <Home /> component', () => {
		expect(home.length).toEqual(1);
	});

	it('renders the <Clients /> component', () => {
	  expect(home.find('Clients').length).toEqual(1);
	});

	it('renders the <Employees /> component', () => {
	  expect(home.find('Employees').length).toEqual(1);
	});

	it('renders the <History /> component', () => {
	  expect(home.find('History').length).toEqual(1);
	});

});
