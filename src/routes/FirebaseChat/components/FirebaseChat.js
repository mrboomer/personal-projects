import React, { Component, PropTypes } from 'react'
import './FirebaseChat.scss'

export default class FirebaseChat extends Component {
  componentDidMount () {
    this.messages = document.querySelector('.messages')
    this.isScrolledToBottom = this.messages.scrollHeight - this.messages.clientHeight <= this.messages.scrollTop + 1

    const user = this.props.chat.user ? this.props.chat.user : prompt('What is your name?')
    this.props.addUser(user)
    this.messageInput.focus()
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
            {this.props.chat.messages.map((message, index) => {
              const timestamp = message.time

              const hh = (timestamp.getHours() + 11) % 12 + 1
              let m = timestamp.getMinutes()
              m = m < 10 ? `0${m}` : m
              const suffix = timestamp.getHours() >= 12 ? 'pm' : 'am'

              let dd = timestamp.getDate()
              let mm = timestamp.getMonth() + 1
              const yyyy = timestamp.getFullYear()

              if (dd < 10) {
                dd = `0${dd}`
              }

              if (mm < 10) {
                mm = `0${mm}`
              }

              const date = `${mm}/${dd}/${yyyy}`
              const time = `${hh}:${m} ${suffix}`

              return (
                <li key={index}>
                  <div className='details'>
                    <span className='user'>{message.user}</span>
                    <span className='time' title={date}>{time}</span>
                  </div>
                  <div>
                    <span className='message'>{message.text}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='control is-grouped'>
          <p className='control is-expanded'>
            <input type='text' className='input is-medium'
              ref={(input) => { this.messageInput = input }}
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
  chat : PropTypes.object.isRequired,
  addUser: PropTypes.func.isRequired,
  handleChange : PropTypes.func.isRequired,
  handleKeyDown : PropTypes.func.isRequired,
  handleClick : PropTypes.func.isRequired
}
