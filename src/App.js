// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Map from './Map';

function App() {
  return (
    <Router> {/* Wrap your components with BrowserRouter */}
      <div className="App">
        <Map />
      </div>
    </Router>
  );
}

export default App;
