import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './Components/Landing/LandingPage.jsx';
import Home from './Components/Home/Home.jsx';
import Create_Activity from './Components/CreateActivity/CreateActivity.jsx';
import CountryDetail from './Components/CountryDetail/CountryDetail.jsx';


function App() {
  return (
    <React.Fragment>
    <div className="App">
      <Route exact path = '/' component = {LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route path='/home/country_detail/:id3' exact component={CountryDetail} />
      <Route path='/activities' component={Create_Activity} />
    </div>
    </React.Fragment>
  );
}

export default App;
