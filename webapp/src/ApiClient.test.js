import apiClient, { webSocketURL } from './ApiClient'

class MockWebSocket {
  constructor(url) {
    this.url = url
    this.listeners = {}
    this.sentMessages = []
  }

  addEventListener = (event, listener) => (this.listeners[event] = listener)
  send = message => this.sentMessages.push(message)
}

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

  it('uses WebSocket URL', ()=>{
    expect(apiClient().ws.url).toEqual(webSocketURL)
  })
})

describe('events', () => {
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
  it('sends message', () => {
    const client = apiClient()
    client.send('message')

    expect(client.ws.sentMessages).toEqual(['message'])
  })
})
