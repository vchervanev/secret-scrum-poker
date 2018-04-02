import React from 'react'
import { shallow } from 'enzyme'

import RoomContainer from './RoomContainer'
import apiClient from '../ApiClient'

jest.mock('../ApiClient')
apiClient.mockImplementation(() => {
  return { addListeners: jest.fn() }
})

const shallowRender = (props = {}) => {
  const defaults = { state: {}, stateHandlers: {} }
  return shallow(<RoomContainer {...defaults} {...props} />)
}

describe('RoomContainer', () => {
  describe('render', () => {
    it('renders Room', () => {
      const wrapper = shallowRender()
      expect(wrapper.find('Room').length).toEqual(1)
    })

    it('passes props into Room', () => {
      const wrapper = shallowRender({ state: { mode: 'test' } })
      const expectedRoomProps = {
        actions: { connect: wrapper.instance().connect },
        state: { mode: 'test' },
      }
      expect(wrapper.find('Room').props()).toEqual(expectedRoomProps)
    })
  })

  describe('connect', () => {
    let apiClientConnectMock
    let stateConnectingMock

    beforeEach(() => {
      apiClientConnectMock = jest.fn()
      apiClient.mockImplementation(() => {
        return { addListeners: jest.fn(), connect: apiClientConnectMock }
      })

      stateConnectingMock = jest.fn()
      const wrapper = shallowRender({ stateHandlers: { connecting: stateConnectingMock } })

      wrapper.instance().connect()
    })

    it('calls ApiClient.connect', () => {
      expect(apiClientConnectMock).toBeCalled()
    })

    it('changes state to Connecting', () => {
      expect(stateConnectingMock).toBeCalled()
    })
  })

  describe('WebSocket API', () => {
    it('registers WebSocker listeners', () => {
      const mockCallback = jest.fn()
      apiClient.mockImplementation(() => {
        return { addListeners: mockCallback }
      })
      const wrapper = shallowRender()

      const expectedHandlers = {
        onConnect: wrapper.instance().onWebSocketConnection,
        onDisconnect: wrapper.instance().onWebSocketDisconnection,
      }

      expect(mockCallback).toBeCalledWith(expectedHandlers)
    })

    it('update state when connected', () => {
      const mockCallback = jest.fn()
      const wrapper = shallowRender({ stateHandlers: { connect: mockCallback } })

      wrapper.instance().onWebSocketConnection()

      expect(mockCallback).toBeCalled()
    })

    it('update state when disconnected', () => {
      const mockCallback = jest.fn()
      const wrapper = shallowRender({ stateHandlers: { disconnect: mockCallback } })

      wrapper.instance().onWebSocketDisconnection()

      expect(mockCallback).toBeCalled()
    })
  })
})