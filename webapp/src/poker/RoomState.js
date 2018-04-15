import { Container } from 'unstated'

const MODE = Object.freeze({
  OFFLINE: 'OFFLINE',
  CONNECTING: 'CONNECTING',
  ONLINE: 'ONLINE',
  JOINING: 'JOINING',
  PLAY: 'PLAY',
})

class RoomStateContainer extends Container {
  state = {
    mode: MODE.OFFLINE,
  }
  stateHandlers = {
    disconnect: () => {
      this.setState({ mode: MODE.OFFLINE })
    },
    connect: () => {
      this.setState({ mode: MODE.ONLINE })
    },
    connecting: () => {
      this.setState({ mode: MODE.CONNECTING })
    },
    joining: () => {
      this.setState({ mode: MODE.JOINING })
    },
  }
}
export default RoomStateContainer
export { MODE }
