const webSocketURL =
  process.env.NODE_ENV === 'development'
    ? `ws://${window.location.hostname}:8080/ws`
    : `wss://${window.location.host}/ws`

class ApiClient {
  constructor() {
    this.ws = new WebSocket(webSocketURL)
    this.ws.addEventListener('message', this.onMessage)
    this.listeners = []
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  onMessage = message => {
    this.listeners.forEach(listener => listener(message))
  }

  send = message => {
    this.ws.send(message)
  }
}

const apiClient = new ApiClient()

export default apiClient
