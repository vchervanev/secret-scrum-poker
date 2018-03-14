import React, { Component } from 'react';
import { Provider, Subscribe } from 'unstated'

import logo from './logo.svg';
import { StateContainer } from './StateContainer'
import apiClient from './ApiClient'
import './App.css';

class App extends Component {
  constructor(){
    super()
    apiClient.setListener(console.log)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
        <Provider>
          <Subscribe to={[StateContainer]}>
          {
            state => (
              <p>Size: {state.state.messages.length}</p>
            )
          }
          </Subscribe>
        </Provider>
        </div>
      </div>
    );
  }
}

export default App;
