import React from 'react';
import Clients from '../components/Clients';
import Employees from '../components/Employees';
// import History from '../components/History';

const Home = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <Clients />
      </div>
      <div className="col-md-6">
        <Employees />
      </div>
    </div>
    <div className="row">
      <div className="col">
        {/*<History />*/}
      </div>
    </div>
  </div>
);

export default Home;
