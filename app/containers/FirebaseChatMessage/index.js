/*
 *
 * FirebaseChatMessage
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';

// Styled Components
import StyledMessage from 'containers/FirebaseChatMessage/StyledMessage';

export class FirebaseChatMessage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const userImg = `https://api.adorable.io/avatars/40/${this.props.user}`;
    const date = moment(this.props.timestamp).format('MM-DD-YYYY');
    const time = moment(this.props.timestamp).format('hh:mma');

    return (
      <StyledMessage className="message">
        <div className="avatar">
          <img alt="Adorable Avatar" src={userImg} />
        </div>
        <div className="content">
          <div className="details">
            <span className="user">{this.props.user}</span>
            <span className="time" title={date}>{time}</span>
          </div>
          <span className="text">{this.props.text}</span>
        </div>
      </StyledMessage>
    );
  }
}

FirebaseChatMessage.propTypes = {
  timestamp: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default FirebaseChatMessage;
