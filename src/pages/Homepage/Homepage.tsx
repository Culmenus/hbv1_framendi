// veit ikki á þetta kannski að vera Index.tsx?
import React from 'react';
import logo from '../logo.svg';

const Homepage: React.FC = () => {
  return (
  <React.Fragment>
    I am homepage boiii let's get some forums up in hyah
    <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. Factual factual.
        </p>
  </React.Fragment>  
    );
}

export default Homepage;