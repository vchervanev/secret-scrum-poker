import React, { Component } from 'react'
import { Subscribe } from 'unstated'

import { ChatStateContainer } from './StateContainer'
import apiClient from '../ApiClient'

const Message = ({ text }) => <div>{text}</div>

const Messages = ({ messages }) => (
  <ul>{messages.map(message => <Message key={message.id} text={message.text} />)}</ul>
)

class NewMessageEditor extends React.Component {
  send = e => {
    e.preventDefault()
    this.props.onSend(this.input.value)
    this.input.value = ''
  }

  render() {
    return (
      <form onSubmit={this.send}>
        <input type="test" ref={input => (this.input = input)} />
        <input type="submit" value="Send" />
      </form>
    )
  }
}

class Chat extends React.Component {
  constructor() {
    super()
    apiClient().addListeners({onMessage: this.onMessage})
  }

  onMessage = ({ data }) => {
    this.props.addMessage('>> ' + data)
  }

  onSend = message => {
    apiClient().send(message)
    this.props.addMessage('<< ' + message)
  }

  render() {
    const { state } = this.props
    return (
      <div>
        <NewMessageEditor onSend={this.onSend} />
        <Messages messages={state.messages} />
      </div>
    )
  }
}

class ChatContainer extends Component {
  render() {
    return <Subscribe to={[ChatStateContainer]}>{container => <Chat {...container} />}</Subscribe>
  }
}

export { ChatContainer }
