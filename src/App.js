import React from 'react';
import '../src/style.scss';
import Dasboard from '../src/components/Dashboard';
import Header from '../src/components/Header';

function App() {
  return (
    <div className="App">
      <div>
      <Header/>
      <Dasboard/>
      </div>
    </div>
  );
}

export default App;
