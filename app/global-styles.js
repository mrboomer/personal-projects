import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: white;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5em;
  }

  @-webkit-keyframes shake {
    8%, 41% {
      transform: translateX(-10px);
    }
    25%, 58% {
      transform: translateX(10px);
    }
    75% {
      transform: translateX(-5px);
    }
    92% {
      transform: translateX(5px);
    }
    0%, 100% {
      transform: translateX(0);
    }
  }
`;
