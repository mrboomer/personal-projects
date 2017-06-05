/**
*
* NavLink
*
*/

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class NavLink extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const isActive = this.context.router.isActive(this.props.to, true);
    const className = isActive ? 'is-active' : '';

    return (
      <li className={className}>
        <Link {...this.props}>{ this.props.children }</Link>
      </li>
    );
  }
}

NavLink.contextTypes = {
  router: PropTypes.object,
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: React.PropTypes.node,
};

export default NavLink;
