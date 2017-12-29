import React, { Component } from 'react';

import BuoyList from './containers/BuoyList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to BuoyBuddy</h1>
          <h5>Your Official Source of Buoy Hotness</h5>
        </header>
        <BuoyList />
      </div>
    );
  }
}

export default App;
