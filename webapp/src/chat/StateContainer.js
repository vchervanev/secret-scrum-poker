import { Container } from 'unstated'

class ChatStateContainer extends Container {
  state = {
    messages: [
      {id: 1, text: 'a'},
      {id: 2, text: 'b'},
      ],
  }
  addMessage = text => {
    const id = this.state.messages.size + 1
    const messages = [...this.state.messages, {id: id, text: text}]
    this.setState({ messages })
  }
}
export {
  ChatStateContainer
}