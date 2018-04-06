import React, { Component } from 'react'

class Entrance extends Component {
  render() {
    const { create } = this.props
    return (
      <div>
        <button className="create" onClick={create}>
          Create new Room
        </button>
        or use Room ID
        <input className="room-id" ref={input => (this.roomID = input)} />
        <button className="join" onClick={this.joinRoomHandler}>
          Join
        </button>
      </div>
    )
  }

  joinRoomHandler = () => {
    this.props.join(this.roomID.value)
  }
}

export default Entrance
