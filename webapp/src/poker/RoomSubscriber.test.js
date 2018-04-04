import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'unstated'

import RoomSubscriber from './RoomSubscriber'
import RoomStateContainer from './RoomState'

describe('RoomSubscriber', () => {
  const inject = state => {
    return mount(
      <Provider inject={[state]}>
        <RoomSubscriber />
      </Provider>
    )
  }

  let stateContainer
  let container

  beforeEach(() => {
    stateContainer = new RoomStateContainer()
    const wrapper = inject(stateContainer)
    container = wrapper.find('RoomContainer')
  })

  it('renders RoomContainer', () => {
    expect(container.length).toEqual(1)
  })

  it('subscribes RoomContainer to StateContainer', () => {
    const matchedProps = {
      state: stateContainer.state,
      stateHandlers: stateContainer.stateHandlers,
    }

    expect(container.props()).toMatchObject(matchedProps)
  })
})
