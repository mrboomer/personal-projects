import React, { PropTypes } from 'react'
import './Message.scss'

const Message = props => {
  const timestamp = props.timestamp

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
  const time = `${hh}:${m}${suffix}`

  return (
    <div className='message'>
      <div className='avatar'>
        <img src={props.avatar} />
      </div>
      <div className='content'>
        <div className='details'>
          <span className='user'>{props.user}</span>
          <span className='time' title={date}>{time}</span>
        </div>
        <span className='text'>{props.text}</span>
      </div>
    </div>
  )
}

Message.propTypes = {
  timestamp: PropTypes.object.isRequired,
  user : PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  avatar : PropTypes.string.isRequired
}

export default Message
