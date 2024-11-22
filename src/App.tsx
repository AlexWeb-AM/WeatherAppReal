import React from 'react';
import './index.scss'
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <h1 className='h1_weather'>Weather App</h1>
      <Weather />
    </div>
  );
}

export default App;
