import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Clients from './Clients';

describe('Clients', () => {

  it('renders <Clients /> without crashing', () => {
		const mock = new MockAdapter(axios);
		const clientsData = [
			{'_id': '123', 'name': 'NBC', 'address': '4688 19th Street, New York, NY 12536'},
    	{'_id': '456', 'name': 'CBS', 'address': '100 Broadway Ave, New York, NY 15395'}];

		mock.onGet('api/clients').reply(200, clientsData);
		shallow(<Clients />);
  });

});
