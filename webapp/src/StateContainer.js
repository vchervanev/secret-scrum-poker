// StateContainer.js
import { Container } from 'unstated'
class StateContainer extends Container {
  state = {
    messages: ['a', 'b'],
  }
  addMessage = text => {
    const id = this.state.messages.size
    const messages = [...this.state.messages, {id: id, text: text}]
    this.setState({ messages })
  }
}
export {
  StateContainer
}