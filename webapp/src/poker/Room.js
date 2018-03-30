import React, { Component } from 'react'
import { Subscribe } from 'unstated'

import { MODE, RoomStateContainer } from './RoomState'

const Loading = () => <div>Loading...</div>
const Entrance = () => <div>Create or Join</div>

const Room = ({ state: { mode } }) => {
  if (mode === MODE.OFFLINE) {
    return <Loading />
  } else if (mode === MODE.ENTER) {
    return <Entrance />
  } else {
    return <div>Not implemented</div>
  }
}

class RoomContainer extends Component {
  render() {
    return <Subscribe to={[RoomStateContainer]}>{container => <Room {...container} />}</Subscribe>
  }
}

export default RoomContainer
