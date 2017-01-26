import React, { Component, PropTypes } from 'react'
import './Messages.scss'

import Message from './Message'

export default class Messages extends Component {
  componentDidMount () {
    this.messages = document.querySelector('.messages-container')
    this.messages.scrollTop = this.messages.scrollHeight
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.messages === this.props.messages) {
      return false
    }
    return true
  }

  componentDidUpdate () {
    this.messages = document.querySelector('.messages-container')
    this.messages.scrollTop = this.messages.scrollHeight
  }

  render () {
    let userImg = `https://api.adorable.io/avatars/40/${this.props.user}`
    return (
      <div className='messages-container'>
        <div className='holder'>
          <div className='day'>
            <div className='divider' />
            <div className='day-messages'>
              {this.props.messages.map((message, index) =>
                <Message key={index} timestamp={message.time}
                  avatar={userImg} user={message.user} text={message.text} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Messages.propTypes = {
  user : PropTypes.string.isRequired,
  messages : PropTypes.array.isRequired
}
