import React from 'react'
import RoomContainer from './RoomContainer'
import { shallow } from 'enzyme'

const shallowRender = (props={}) => {
  const defaults = { state: {}, stateHandlers: {}}
  return shallow(<RoomContainer {...defaults} {...props}/>)
}

describe('RoomContainer', () => {

  describe('render', () => {
    it('renders Room', () => {
      const wrapper = shallowRender()
      expect(wrapper.find('Room').length).toEqual(1)
    })

    it('passes props into Room', () => {
      const wrapper = shallowRender({state: { mode: 'test'}})
      const expectedRoomProps = {
        actions: { connect: wrapper.instance().connect },
        state: { mode: 'test'},
      }
      expect(wrapper.find('Room').props()).toEqual(expectedRoomProps)
    })
  })
})
