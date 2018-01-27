import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('ThxCards', () => {
	let app;

	beforeEach(() => {
		app = shallow(<App />);
	});

	it('loads the <App /> component', () => {
		expect(app.length).toEqual(1);
	});

	it('renders the <Nav /> component', () => {
	  expect(app.find('Nav').length).toEqual(1);
	});

});
