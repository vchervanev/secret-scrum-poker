import React, { Component } from 'react';
import { Provider, Subscribe } from 'unstated'

import { ChatStateContainer } from './StateContainer'


const Message = ({text}) => <li>{text}</li>

const Messages = ({messages}) => (
  <ul>
    { messages.map(message => <Message key={message.id} text={message.text} />) }
  </ul>
)

const SendButton = ({onClick}) => (
  <button onClick={onClick}>Send</button>
)

const NewMessageEditor = () => (
  <div>
    <input /><SendButton onClick={()=>alert(42)}/>
  </div>
)

const Chat = ({state}) => (
  <div>
    <Messages messages={state.messages} />
    <NewMessageEditor />
  </div>
)

class ChatContainer extends Component {
  render(){
    return <Provider>
      <Subscribe to={[ChatStateContainer]}>
        { Chat }
      </Subscribe>
    </Provider>
  }
}

export { ChatContainer }