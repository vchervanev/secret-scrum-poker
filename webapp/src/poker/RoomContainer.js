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
  create = () => {
    this.client.command('create')
    this.props.stateHandlers.joining()
  }

  join = roomID => {
    this.client.command('join', { roomID: roomID })
    this.props.stateHandlers.joining()
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
        create: this.create,
        join: this.join,
      },
    }
    return <Room {...props} />
  }
}

export default RoomContainer
