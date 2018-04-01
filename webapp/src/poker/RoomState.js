import { Container } from 'unstated'

const MODE = Object.freeze({
  OFFLINE: 0,
  CONNECTING: 1,
  ENTER: 2,
  WAIT: 3,
  PLAY: 4,
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
      this.setState({ mode: MODE.ENTER })
    },
    connecting: () => {
      this.setState({ mode: MODE.CONNECTING })
    },
  }
}
export { MODE, RoomStateContainer }
