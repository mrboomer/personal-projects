/*
 *
 * FirebaseChat
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

// Styled Components
import StyledFirebaseChat from 'containers/FirebaseChat/StyledFirebaseChat';

// App Containers
import Messages from 'containers/FirebaseChatMessages';

// Actions
import { checkAuthentication, authenticateUser, getMessages, addUser, handleChange, processSubmit } from './actions';

import { makeSelectIsAuthenticated, makeSelectUser, makeSelectMessage, makeSelectMessages } from './selectors';
import messages from './messages';

export class FirebaseChat extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.checkAuthentication();
  }

  componentDidMount() {
    let user = this.props.user ? this.props.user : prompt('Hello! What is your name?'); // eslint-disable-line
    user = user === null || user === '' ? `user${Math.floor(Math.random() * 9000) + 1000}` : user;
    this.props.addUser(user);
    this.messageInput.focus();
  }

  shouldComponentUpdate(nextProps) {
    // No Firebase Authentication Found
    if (this.props.isAuthenticated === null && nextProps.isAuthenticated === false) {
      return true;
    }

    // Skip First Update Render
    if (!this.props.isAuthenticated && !nextProps.isAuthenticated) {
      return false;
    }

    return true;
  }

  componentWillUpdate(nextProps) {
    // Firebase Authentication Found
    if (this.props.isAuthenticated === null && nextProps.isAuthenticated === true) {
      // TODO: this.props.loadUser()
    }

    // No Firebase Authentication Found
    if (this.props.isAuthenticated === null && nextProps.isAuthenticated === false) {
      this.props.authenticateUser();
    }

    // Load Chat History
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      this.props.loadMessages();
    }
  }

  handleSubmit = (e) => {
    const type = e.type;
    const key = e.key;
    const onKeyEnter = type === 'keydown' && key === 'Enter' && this.props.message;
    const onClick = type === 'click' && this.props.message;
    if (onKeyEnter || onClick) {
      this.props.processSubmit();
    }
  }

  render() {
    const user = this.props.user ? `@${this.props.user}` : '';
    const buttonSend = <FormattedMessage {...messages.buttonSend} />;
    const chatMessages = this.props.messages instanceof Array ? this.props.messages : [];

    return (
      <StyledFirebaseChat>
        <header className="chat-header">
          <h2>{user}</h2>
        </header>
        <div className="chat-body">
          <div className="messages">
            <div className="messages-input">
              <p className="control has-addons">
                <input
                  type="text" className="input is-medium is-expanded" placeholder="Message"
                  ref={(input) => { this.messageInput = input; }}
                  onChange={this.props.handleChange} value={this.props.message}
                  onKeyDown={this.handleSubmit}
                />
                <button className="button is-medium is-info" onClick={this.handleSubmit} >
                  {buttonSend}
                </button>
              </p>
            </div>
            <Messages user={this.props.user} messages={chatMessages} />
          </div>
        </div>
      </StyledFirebaseChat>
    );
  }
}

FirebaseChat.propTypes = {
  user: PropTypes.string,
  message: PropTypes.string,
  messages: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  isAuthenticated: PropTypes.bool,
  checkAuthentication: PropTypes.func.isRequired,
  authenticateUser: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  // loadUser: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  processSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  user: makeSelectUser(),
  message: makeSelectMessage(),
  messages: makeSelectMessages(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkAuthentication: () => dispatch(checkAuthentication.request()),
    authenticateUser: () => dispatch(authenticateUser.request()),
    loadMessages: () => dispatch(getMessages.request()),
    addUser: (user) => dispatch(addUser(user)),
    handleChange: (e) => dispatch(handleChange(e.target.value)),
    processSubmit: () => dispatch(processSubmit.request()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirebaseChat);
