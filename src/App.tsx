import React from 'react';
import Forum from './components/forum/Forum'
import Homepage from './pages/Homepage';
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
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/forum/:id" component={Forum}/>
        <Route component={NotFound}/>
      </Switch>
      <Footer/>
    </React.Fragment>
    
  );
}

export default App;
