import React, { Component } from 'react';

import logo from './logo.svg';
import { ChatContainer } from './chat/Chat'
import './App.css';

class App extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <ChatContainer />
        </div>
      </div>
    );
  }
}

export default App;
