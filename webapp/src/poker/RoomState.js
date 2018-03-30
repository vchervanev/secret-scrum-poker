import { Container } from 'unstated'

const MODE = Object.freeze({
  OFFLINE: 0,
  ENTER: 1,
  WAIT: 2,
  PLAY: 3,
})

class RoomStateContainer extends Container {
  state = {
    mode: MODE.OFFLINE,
  }
}
export { MODE, RoomStateContainer }
