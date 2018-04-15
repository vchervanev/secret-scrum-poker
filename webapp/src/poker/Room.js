import React from 'react'

import { MODE, Entrance } from '.'

const Reconnect = ({ connect }) => (
  <div>
    <button onClick={connect}>connect...</button>
  </div>
)
const Loading = () => <div>Loading...</div>
const PointsGame = () => <div>Not implemented</div>

const Room = ({ actions: { connect, create, join }, state: { mode } }) => {
  const roomComponentSelector = {
    [MODE.OFFLINE]: <Reconnect connect={connect} />,
    [MODE.CONNECTING]: <Loading />,
    [MODE.ONLINE]: <Entrance create={create} join={join} />,
    [MODE.JOINING]: <Loading />,
    [MODE.PLAY]: <PointsGame />,
  }
  const component = roomComponentSelector[mode]

  if (component === undefined) {
    throw new Error(`Invalid mode ${mode}`)
  }

  return component
}

export default Room
export { Reconnect, Loading, PointsGame }
