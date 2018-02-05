import React from 'react';
import { Route } from 'react-router-dom';
import Nav from '../components/Nav';
import Schedule from '../components/Schedule';
import Home from './Home';
import Help from './Help';
import '../styles/App.css';

const App = () => (
  <div className="App">
    <Nav />
    <Schedule />
    <Route exact path="/" component={Home} />
    <Route exact path="/help" component={Help} />
  </div>
);

export default App;
