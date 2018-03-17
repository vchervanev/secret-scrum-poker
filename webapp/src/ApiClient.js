class ApiClient {
  constructor() {
    this.ws = new WebSocket("ws://localhost:8080/ws")
    this.ws.addEventListener('message', this.onMessage)
    this.listeners = []
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  onMessage  = (message) => {
    this.listeners.forEach((listener) => listener(message))
  }

  send = message => {
    this.ws.send(message)
  }
}

const apiClient = new ApiClient()

export default apiClient