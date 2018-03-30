import { Container } from 'unstated'

class ChatStateContainer extends Container {
  state = {
    messages: [],
  }
  addMessage = text => {
    const id = this.state.messages.length + 1
    const messages = [{ id: id, text: text }, ...this.state.messages].slice(0, 10)
    this.setState({ messages })
  }
}
export { ChatStateContainer }
