import React, { Component } from 'react'

import apiClient from '../ApiClient'
import Room from './Room'

class RoomContainer extends Component {
  constructor() {
    super()
    this.client = apiClient()
    this.client.addListeners({
      onConnect: this.onWebSocketConnection,
      onDisconnect: this.onWebSocketDisconnection,
    })
  }
  connect = () => {
    this.props.stateHandlers.connecting()
    this.client.connect()
  }
  onWebSocketConnection = () => {
    this.props.stateHandlers.connect()
  }
  onWebSocketDisconnection = () => {
    this.props.stateHandlers.disconnect()
  }
  render() {
    const props = {
      state: this.props.state,
      actions: {
        connect: this.connect,
      },
    }
    return <Room {...props} />
  }
}

export default RoomContainer
