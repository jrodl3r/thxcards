import React from 'react';
import { Route } from 'react-router-dom';
import Nav from '../components/Nav';
import Home from './Home';
import Help from './Help';
import '../styles/App.css';

const App = () => (
  <div className="App">
    <Nav />
    <Route exact path="/" component={Home} />
    <Route exact path="/help" component={Help} />
  </div>
);

export default App;
