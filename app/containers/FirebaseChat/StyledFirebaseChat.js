import styled from 'styled-components';

const StyledFirebaseChat = styled.div`
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  -moz-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -moz-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  min-width: 0;
  height: 375px;

  .chat-header {
    flex: none;
    position: static;
    min-width: 0;
    background: 0 0;
    height: 24px;
    z-index: 100;
    width: 100%;

    h2 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flexbox;
      display: flex;
      margin: 0;
      line-height: 24px;
      font-family: monospace;
      font-size: 24px;
      font-weight: 900;
      -webkit-transition: .15s;
      -moz-transition: .15s;
      transition: .15s;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      text-transform: lowercase;
    }
  }

  .chat-body {
    margin-top: 0;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }

  .messages {
    position: relative;
    -ms-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    -moz-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
    max-width: 100%;

    li {
      padding: 5px 0;
    }
  }

  .messages-input {
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    -ms-order: 1;
    -webkit-order: 1;
    -moz-order: 1;
    -ms-flex-order: 1;
    order: 1;
    margin-top: auto;
    z-index: 200;
    height: auto;

    .control.has-addons .input {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }

  .control.has-addons {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: start;
    justify-content:flex-start
  }
`;

export default StyledFirebaseChat;
