/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

// Styled Components
import StyledHomePage from 'containers/HomePage/StyledHomePage';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const title = <FormattedMessage {...messages.title} />;
    const description = <FormattedMessage {...messages.description} />;

    return (
      <StyledHomePage className="content is-medium">
        <h2>{title}</h2>
        <p>{description} <a href="https://github.com/mrboomer/personal-projects" target="_blank">GitHub</a>{'.'}</p>
      </StyledHomePage>
    );
  }
}
