import React, { Component, PropTypes } from 'react'
import './Messages.scss'

import Message from './Message'

export default class Messages extends Component {
  componentDidMount () {
    this.messages = document.querySelector('.messages-container')
    this.messages.scrollTop = this.messages.scrollHeight
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.messages === nextProps.messages) {
      return false
    }
    return true
  }

  componentDidUpdate () {
    this.messages = document.querySelector('.messages-container')
    this.messages.scrollTop = this.messages.scrollHeight
  }

  render () {
    return (
      <div className='messages-container'>
        <div className='holder'>
          <div className='day'>
            <div className='divider' />
            <div className='day-messages'>
              {this.props.messages.map((message, index) =>
                <Message key={index} timestamp={new Date(JSON.parse(message.time))}
                  user={message.user} text={message.message} />
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
