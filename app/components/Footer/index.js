/**
*
* Footer
*
*/

import React from 'react';

// Styled Components
import StyledFooter from 'components/Header/StyledHeader';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Footer() {
  const title = <FormattedMessage {...messages.title} />;
  const copyright = <FormattedMessage {...messages.copyright} />;
  const rights = <FormattedMessage {...messages.rights} />;
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <div className="container">
        <div className="content has-text-centered">
          <p>
            {copyright}
            {` ${year} `}
            <a href="https://daniel.escobedo.io/blog/">{title}</a>
            {rights}
          </p>
          <p>
            <a className="icon" href="https://github.com/mrboomer/personal-projects" target="_blank">
              <i className="fa fa-github" />
            </a>
          </p>
        </div>
      </div>
    </StyledFooter>
  );
}

export default Footer;
