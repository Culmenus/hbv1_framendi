import React from 'react';
import Forum from './components/forum/Forum'
import Homepage from './pages/Homepage/Homepage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NotFound from './components/notfound/NotFound';
import { Switch, Route } from 'react-router';

import './App.css';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Homepage/>
        </Route>
        <Route exact path="/forum/:id">
          <Forum></Forum>  
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
      <Footer/>
    </React.Fragment>
    
  );
}

export default App;
