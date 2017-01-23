import React, { Component } from 'react'
import './FirebaseChat.scss'

export default class FirebaseChat extends Component {
  componentDidMount () {
    this.messages = document.querySelector('.messages')
    this.isScrolledToBottom = this.messages.scrollHeight - this.messages.clientHeight <= this.messages.scrollTop + 1
  }

  componentDidUpdate () {
    if (this.isScrolledToBottom) {
      this.messages.scrollTop = this.messages.scrollHeight - this.messages.clientHeight
    }
  }

  render () {
    return (
      <div className='firebase-chat' >
        <div className='messages'>
          <ul>
            {this.props.chat.messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
        <div className='control is-grouped'>
          <p className='control is-expanded'>
            <input type='text' className='input is-medium'
              onChange={this.props.handleChange} onKeyDown={this.props.handleKeyDown} value={this.props.chat.message} />
          </p>
          <p className='control'>
            <a className='button is-info is-medium' onClick={this.props.handleClick}>
              Send
            </a>
          </p>
        </div>
      </div>
    )
  }
}

FirebaseChat.propTypes = {
  chat     : React.PropTypes.object.isRequired,
  handleChange : React.PropTypes.func.isRequired,
  handleKeyDown : React.PropTypes.func.isRequired,
  handleClick : React.PropTypes.func.isRequired
}
