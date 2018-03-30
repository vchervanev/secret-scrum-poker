import React, { Component } from 'react'
import { Provider } from 'unstated'

import logo from './logo.svg'
import { ChatContainer } from './chat/Chat'
import { RoomContainer } from './poker'
import './App.css'

class App extends Component {
  render() {
    return (
      <Provider>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <RoomContainer />
          <ChatContainer />
        </div>
      </Provider>
    )
  }
}

export default App
