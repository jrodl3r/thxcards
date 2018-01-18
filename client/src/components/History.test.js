import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount } from 'enzyme';
import History from './History';

describe('History', () => {
  let history, mock;
  const historyData =
    [{'_id': '123', 'list': ['History List Item One']},
     {'_id': '456', 'list': ['History List Item Two']}];

  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet('api/history').reply(200, historyData);
    history = mount(<History />);
  });

  it('loads the <History /> component', () => {
    expect(history.length).toBe(1);
  });

  it('gets history data and updates the state', () => {
    history.update();
    expect(history.state()).toHaveProperty('history', historyData);
    expect(history.find('.card-body').length).toEqual(1);
    expect(history.find('.empty-text').length).toEqual(0);
    expect(history.find('table').length).toEqual(2);
    expect(history.find('tr').length).toEqual(3);
  });

});
