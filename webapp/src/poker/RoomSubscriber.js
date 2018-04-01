import React, { Component } from 'react'
import { Subscribe } from 'unstated'

import RoomStateContainer from './RoomState'
import RoomContainer from './RoomContainer'

class RoomSubscriber extends Component {
  render() {
    return <Subscribe to={[RoomStateContainer]}>{state => <RoomContainer {...state} />}</Subscribe>
  }
}

export default RoomSubscriber
