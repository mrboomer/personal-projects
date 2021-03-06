import styled from 'styled-components';

const StyledApp = styled.div`
  height: 100%;

  main {
    position: relative;
    min-height: 100%;
    margin: 0 auto -182px;

    & > section.container {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-flex: 1;
      -webkit-flex-grow: 1;
      -moz-flex-grow: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      overflow: hidden;
    }
  }

  .push {
    height: 182px;
  }
`;

export default StyledApp;
