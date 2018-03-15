class ApiClient {
  constructor() {
    this.ws = new WebSocket("ws://localhost:8080/ws")
    this.ws.addEventListener('message', this.onMessage)
  }

  setListener(listener) {
    this.listener = listener
  }

  onMessage  = (message) => {
    this.listener(message)
  }

  send = message => {
    this.ws.send(message)
  }
}

const apiClient = new ApiClient()

export default apiClient