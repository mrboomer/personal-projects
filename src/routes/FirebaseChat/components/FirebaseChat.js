import React, { Component, PropTypes } from 'react'
import './FirebaseChat.scss'

import Messages from './Messages'

export default class FirebaseChat extends Component {
  componentWillMount () {
    this.props.checkAuthentication()
  }

  componentDidMount () {
    let user = this.props.chat.user ? this.props.chat.user : prompt('What is your name?')
    user = user === null ? `user${Math.floor(Math.random() * 9000) + 1000}` : user
    this.props.addUser(user)
    this.messageInput.focus()
  }

  shouldComponentUpdate (nextProps) {
    // No Firebase Authentication Found
    if (this.props.chat.isAuthenticated === null && nextProps.chat.isAuthenticated === false) {
      return true
    }

    // Skip First Update Render
    if (!this.props.chat.isAuthenticated && !nextProps.chat.isAuthenticated) {
      return false
    }

    return true
  }

  componentWillUpdate (nextProps) {
    if (this.props.chat.isAuthenticated === null && nextProps.chat.isAuthenticated === false) {
      this.props.authenticateUser()
    }

    // Load Chat History
    if (!this.props.chat.isAuthenticated && nextProps.chat.isAuthenticated) {
      this.props.loadMessages()
    }
  }

  render () {
    const user = this.props.chat.user ? `@${this.props.chat.user}` : ''
    return (
      <div className='firebase-chat' >
        <header className='chat-header'>
          <h2>{user}</h2>
        </header>
        <div className='chat-body'>
          <div className='messages'>
            <div className='messages-input'>
              <p className='control has-addons'>
                <input type='text' className='input is-medium is-expanded' placeholder='Message'
                  ref={(input) => { this.messageInput = input }}
                  onChange={this.props.handleChange} value={this.props.chat.message}
                  onKeyDown={this.props.handleSubmit} />
                <a className='button is-medium is-info' onClick={this.props.handleSubmit} >
                  Send
                </a>
              </p>
            </div>
            <Messages user={this.props.chat.user} messages={this.props.chat.messages} />
          </div>
        </div>
      </div>
    )
  }
}

FirebaseChat.propTypes = {
  chat : PropTypes.object.isRequired,
  checkAuthentication: PropTypes.func.isRequired,
  authenticateUser: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  handleChange : PropTypes.func.isRequired,
  handleSubmit : PropTypes.func.isRequired
}
