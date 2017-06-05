/*
 *
 * FirebaseChatMessages
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';

// Styled Components
import StyledMessages from 'containers/FirebaseChatMessages/StyledMessages';

// App Containers
import Message from 'containers/FirebaseChatMessage';

export class FirebaseChatMessages extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.messages = document.querySelector('.messages-container');
    this.messages.scrollTop = this.messages.scrollHeight;
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.messages === nextProps.messages) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    this.messages = document.querySelector('.messages-container');
    this.messages.scrollTop = this.messages.scrollHeight;
  }

  render() {
    const timestamp = moment().format();
    const messages = this.props.messages.map((message, index) =>
      <Message
        key={index} timestamp={timestamp}
        user={message.user} text={message.message}
      />
    );

    return (
      <StyledMessages className="messages-container">
        <div className="holder">
          <div className="day">
            <div className="divider" />
            <div className="day-messages">
              {messages}
            </div>
          </div>
        </div>
      </StyledMessages>
    );
  }
}

FirebaseChatMessages.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default FirebaseChatMessages;
