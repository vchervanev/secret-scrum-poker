import { tryParseCommand } from '.'

const webSocketURL =
  process.env.NODE_ENV === 'development'
    ? `ws://${window.location.hostname}:8080/ws`
    : `wss://${window.location.host}/ws`

class ApiClient {
  constructor() {
    this.ws = null
    this.listeners = { onMessage: [], onConnect: [], onCommand: [], onDisconnect: [] }

    this.wsHandlers = {
      onMessage: message => {
        this.listeners.onMessage.forEach(listener => listener(message))

        const command = tryParseCommand(message)
        if (command != null) {
          this.listeners.onCommand.forEach(listener => listener(command))
        }
      },
      onConnect: () => {
        this.listeners.onConnect.forEach(listener => listener())
      },
      onDisconnect: () => {
        this.listeners.onDisconnect.forEach(listener => listener())
      },
    }
  }

  addListeners({ onMessage, onConnect, onCommand, onDisconnect }) {
    onMessage && this.listeners.onMessage.push(onMessage)
    onConnect && this.listeners.onConnect.push(onConnect)
    onCommand && this.listeners.onCommand.push(onCommand)
    onDisconnect && this.listeners.onDisconnect.push(onDisconnect)
  }

  isConnected = () => this.ws != null && this.ws.readyState === WebSocket.OPEN

  connect() {
    this.ws = new WebSocket(webSocketURL)
    this.ws.addEventListener('message', this.wsHandlers.onMessage)
    this.ws.addEventListener('open', this.wsHandlers.onConnect)
    this.ws.addEventListener('close', this.wsHandlers.onDisconnect)
  }

  send = message => {
    this.ws.send(message)
  }

  command = (name, attrs = {}) => {
    this.ws.send(JSON.stringify({ command: name, attrs: attrs }))
  }
}

let apiClientInstance = null

const apiClient = () => apiClientInstance || (apiClientInstance = new ApiClient())

export default apiClient
export { webSocketURL }
