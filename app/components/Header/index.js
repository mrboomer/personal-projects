/**
*
* Header
*
*/

import React from 'react';
import { IndexLink } from 'react-router';

// Styled Components
import StyledHeader from 'components/Header/StyledHeader';

// App Components
import NavLink from 'components/NavLink';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Header() {
  const title = <FormattedMessage {...messages.title} />;
  const navProjects = <FormattedMessage {...messages.navProjects} />;
  const navBlog = <FormattedMessage {...messages.navBlog} />;
  const source = <FormattedMessage {...messages.source} />;
  const navAbout = <FormattedMessage {...messages.navAbout} />;
  const projectFirebaseChat = <FormattedMessage {...messages.projectFirebaseChat} />;

  return (
    <StyledHeader className="hero is-primary">

      <div className="hero-head">
        <header className="nav">
          <div className="container">
            <div className="nav-left">
              <a className="nav-item">
                <span className="title is-4 is-unselectable">{title}</span>
              </a>
            </div>
            <span className="nav-toggle">
              <span />
              <span />
              <span />
            </span>
            <div className="nav-right nav-menu">
              <IndexLink to="/" className="nav-item" activeClassName="is-active">
                {navProjects}
              </IndexLink>
              <a className="nav-item" href="https://daniel.escobedo.io/blog/">
                {navBlog}
              </a>
              <span className="nav-item">
                <a
                  className="button is-primary is-inverted"
                  href="https://github.com/mrboomer/personal-projects" target="_blank"
                >
                  <span className="icon">
                    <i className="fa fa-github" />
                  </span>
                  <span>{source}</span>
                </a>
              </span>
            </div>
          </div>
        </header>
      </div>

      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            {navProjects}
          </h1>
        </div>
      </div>

      <div className="hero-foot">
        <div className="container">
          <nav className="tabs is-boxed">
            <ul>
              <NavLink to="/">{navAbout}</NavLink>
              <NavLink to="/firebase-chat/">{projectFirebaseChat}</NavLink>
            </ul>
          </nav>
        </div>
      </div>

    </StyledHeader>
  );
}

export default Header;
