import React from 'react';
import PropTypes from 'prop-types';

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.

class SidebarWrapper extends React.Component {
  sidebarWrapper = React.createRef();

  render() {
    const {
      className, user, headerLinks, links
    } = this.props;
    return (
      <div className={className} ref={this.sidebarWrapper}>
        {user}
        {headerLinks}
        {links}
      </div>
    );
  }
}

SidebarWrapper.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  headerLinks: PropTypes.object,
  links: PropTypes.object,
};

export default SidebarWrapper;
