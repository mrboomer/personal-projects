import styled from 'styled-components';

const StyledMessages = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  height: 312px;
  border: 1px solid #dbdbdb;
  border-bottom: 0;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;

  .holder {
    padding: 0;
    margin: 0;
    clear: both;
  }

  .day {
    position: relative;
  }

  .divider {
    margin: 0;
  }

  .day-messages {
    margin: -20px 0 0;
    padding: 1.75rem 0 1.25rem 1rem;
    border-top: 1px solid #e8e8e8;
  }
`;

export default StyledMessages;
