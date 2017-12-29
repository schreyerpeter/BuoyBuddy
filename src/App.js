import React, { Component } from 'react';

import BuoyList from './containers/BuoyList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to BuoyBuddy</h1>
          <h2>Your Official Source of Buoy Hotness</h2>
        </header>
        <BuoyList />
      </div>
    );
  }
}

export default App;
