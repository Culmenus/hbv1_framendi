import React from 'react';
import logo from './logo.svg';
import Forum from './components/forum/Forum'
import Homepage from './pages/Homepage';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Homepage/>

        asdf
        <Forum daemi = 'sja forum fyrir daemi um props'/>
      </header>
    </div>
  );
}

export default App;
