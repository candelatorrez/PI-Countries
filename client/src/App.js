import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import Home from './Components/Home/Home.jsx';
import CountryDetail from './Components/CardDetail/CardDetail';
import CreateActivity from './Components/CreateActivity/CreateActivity';

function App() {
  return (
    <React.Fragment>
    <div className="App">
      <Route exact path = '/' component = {LandingPage} />
      <Route exact path='/home' component = {Home} />
      <Route path='/home/detail/:id3' exact component={CountryDetail} />
      <Route exact path='/activities' component={CreateActivity} />
    </div>
    </React.Fragment>
  );
}

export default App;
