import React from 'react'

import { MODE } from './RoomState'

const Reconnect = ({ connect }) => (
  <div>
    <button onClick={connect}>connect...</button>
  </div>
)
const Loading = () => <div>Loading...</div>
const Entrance = () => <div>Create or Join</div>

const Room = ({ actions: { connect }, state: { mode } }) => {
  if (mode === MODE.OFFLINE) {
    return <Reconnect connect={connect} />
  } else if (mode === MODE.CONNECTING) {
    return <Loading />
  } else if (mode === MODE.ENTER) {
    return <Entrance />
  } else {
    return <div>Not implemented</div>
  }
}

export default Room
