import React from 'react'
import { shallow } from 'enzyme'

import RoomContainer from './RoomContainer'
import { apiClient } from '../api'

jest.mock('../api')
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
      const instance = wrapper.instance()
      const expectedRoomProps = {
        actions: {
          connect: instance.connect,
          create: instance.create,
          join: instance.join,
        },
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

  describe('create', () => {
    let apiClientCommandMock
    let stateJoiningMock

    beforeEach(() => {
      apiClientCommandMock = jest.fn()
      apiClient.mockImplementation(() => {
        return { addListeners: jest.fn(), command: apiClientCommandMock }
      })

      stateJoiningMock = jest.fn()
      const wrapper = shallowRender({ stateHandlers: { joining: stateJoiningMock } })

      wrapper.instance().create()
    })

    it('calls ApiClient.command("create")', () => {
      expect(apiClientCommandMock).toBeCalledWith('create')
    })

    it('changes state to Joining', () => {
      expect(stateJoiningMock).toBeCalled()
    })
  })

  describe('join', () => {
    let apiClientCommandMock
    let stateJoiningMock

    beforeEach(() => {
      apiClientCommandMock = jest.fn()
      apiClient.mockImplementation(() => {
        return { addListeners: jest.fn(), command: apiClientCommandMock }
      })

      stateJoiningMock = jest.fn()
      const wrapper = shallowRender({ stateHandlers: { joining: stateJoiningMock } })

      wrapper.instance().join('123')
    })

    it('calls ApiClient.command("join")', () => {
      expect(apiClientCommandMock).toBeCalledWith('join', { roomID: '123' })
    })

    it('changes state to Joining', () => {
      expect(stateJoiningMock).toBeCalled()
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
