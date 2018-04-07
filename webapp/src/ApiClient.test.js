import apiClient, { webSocketURL } from './ApiClient'

class MockWebSocket {
  constructor(url) {
    this.url = url
    this.listeners = {}
    this.sentMessages = []
    this.readyState = MockWebSocket.OPEN
  }

  addEventListener = (event, listener) => (this.listeners[event] = listener)
  send = message => this.sentMessages.push(message)
}
MockWebSocket.OPEN = 'open'

beforeEach(() => {
  global.WebSocket = MockWebSocket
})

afterEach(() => {
  delete global.WebSocket
})

describe('instance', () => {
  it('is a singleton object', () => {
    expect(apiClient()).toEqual(apiClient())
  })

  it('disconnected by default', () => {
    expect(apiClient().isConnected()).toBeFalsy()
  })
})

describe('events', () => {
  beforeEach(() => {
    apiClient().connect()
  })

  it('calls onConnect', () => {
    const spy = jest.fn()
    const client = apiClient()

    client.addListeners({ onConnect: spy })
    client.ws.listeners.open()

    expect(spy).toHaveBeenCalled()
  })

  it('calls onDisconnect', () => {
    const spy = jest.fn()
    const client = apiClient()

    client.addListeners({ onDisconnect: spy })
    client.ws.listeners.close()

    expect(spy).toHaveBeenCalled()
  })

  it('calls onMessage', () => {
    const spy = jest.fn()
    const client = apiClient()

    client.addListeners({ onMessage: spy })
    client.ws.listeners.message('message')

    expect(spy).toHaveBeenCalledWith('message')
  })
})

describe('methods', () => {
  let client = null
  beforeEach(() => {
    client = apiClient()
    client.connect()
  })

  it('connects', () => {
    expect(client.isConnected()).toBeTruthy()
  })

  it('uses WebSocket URL', () => {
    expect(client.ws.url).toEqual(webSocketURL)
  })

  it('sends message', () => {
    client.send('message')
    expect(client.ws.sentMessages).toEqual(['message'])
  })

  it('sends commands', () => {
    const expectedCommand = { command: 'test-command', attrs: { value: 1 } }
    client.command('test-command', { value: 1 })

    expect(client.ws.sentMessages).toEqual([JSON.stringify(expectedCommand)])
  })
})
