import styled from 'styled-components';

const StyledMessage = styled.div`
  display: block;
  background-color: inherit;
  width: 100%;
  margin: 0 auto -.0625rem;
  position: relative;
  padding-top: .0625rem;
  padding-bottom: .125rem;
  padding-left: 0;
  padding-right: 2.5rem;
  border-left: none;
  border-right: none;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-radius: 0;
  font-family: Slack-Lato,appleLogo,sans-serif;
  color: #2c2d30;
  font-size: .9375rem;
  line-height: 1.375rem;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  word-wrap: break-word;

  .avatar {
    text-align: right;
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;

    img {
      width: 40px;
      margin-top: 1px;
    }
  }

  .content {
    margin-left: 50px;
  }

  .details {
    margin-bottom: 2px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: baseline;
    -webkit-align-items: baseline;
    -webkit-box-align: baseline;
    -moz-align-items: baseline;
    align-items: baseline;
  }

  .user {
    display: inline;
    margin-right: .25rem;
    font-size: 1.25rem;
    font-weight: 900;
    color: #2c2d30;
    line-height: 1.125rem;
  }

  .time {
    display: inline;
    margin-right: .25rem;
    opacity: 1;
  }

  .text {
    font-size: 18px;
  }
`;

export default StyledMessage;
