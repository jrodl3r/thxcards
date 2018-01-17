import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount, shallow } from 'enzyme';
import Clients from './Clients';

describe('Clients', () => {
	let clients, mock;
	const clientData =
		[{'_id': '123', 'name': 'CBS', 'address': '100 Broadway Ave, New York, NY 15395'}, 
		 {'_id': '456', 'name': 'NBC', 'address': '4688 19th Street, New York, NY 12536'}];

	beforeEach(() => {
		mock = new MockAdapter(axios);
		mock.onGet('api/clients').reply(200, clientData);
		clients = mount(<Clients />);
	});

	it('loads the <Clients /> component', () => {
		expect(clients.length).toBe(1);
	});

	it('gets client data and updates the state', () => {
		clients.update();
		expect(clients.state()).toHaveProperty('clients', clientData);
		expect(clients.find('.card-body').length).toBe(1);
		expect(clients.find('.empty-text').length).toBe(0);
		expect(clients.find('table').length).toBe(2);
		expect(clients.find('tr').length).toBe(3);
	});

});
