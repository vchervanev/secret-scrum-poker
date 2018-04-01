import { MODE, RoomStateContainer } from './RoomState'

describe('RoomStateContainer', () => {
  let container = null
  beforeEach(() => {
    container = new RoomStateContainer()
  })

  describe('state', () => {
    it('default mode is OFFLIE', () => {
      expect(container.state.mode).toEqual(MODE.OFFLINE)
    })
  })
  describe('stateHandlers.connecting', () => {
    it('changes MODE to CONNECTING', () => {
      container.stateHandlers.connecting()
      expect(container.state.mode).toEqual(MODE.CONNECTING)
    })
  })
  describe('stateHandlers.connect', () => {
    it('changes MODE to ENTER', () => {
      container.stateHandlers.connect()
      expect(container.state.mode).toEqual(MODE.ENTER)
    })
  })
  describe('stateHandlers.disconnect', () => {
    it('changes MODE to OFFLINE', () => {
      container.stateHandlers.disconnect()
      expect(container.state.mode).toEqual(MODE.OFFLINE)
    })
  })
})
