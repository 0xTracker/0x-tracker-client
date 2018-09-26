import { Link as InternalLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const Link = ({ children, href, ...otherProps }) => {
  if (href === undefined) {
    return <a {...otherProps}>{children}</a>;
  }

  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <a href={href} rel="noreferrer noopener" target="_blank" {...otherProps}>
        {children}
      </a>
    );
  }

  return (
    <InternalLink to={href} {...otherProps}>
      {children}
    </InternalLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
};

Link.defaultProps = {
  href: undefined,
};

export default Link;
