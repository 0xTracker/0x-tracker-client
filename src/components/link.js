import { Link as ReactRouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga';
import styled, { css } from 'styled-components';

import { colors } from '../styles/constants';

const linkStyles = css`
  color: ${colors.indigo};
  cursor: pointer;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const OutboundLink = styled(({ active, ...otherProps }) => (
  <ReactGA.OutboundLink {...otherProps} />
))`
  ${linkStyles}
`;

const InternalLink = styled(({ active, ...otherProps }) => (
  <ReactRouterLink {...otherProps} />
))`
  ${linkStyles}
`;

const Link = ({ children, href, ...otherProps }) => {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <OutboundLink
        eventLabel={href}
        rel="noreferrer noopener"
        target="_blank"
        to={href}
        {...otherProps}
      >
        {children}
      </OutboundLink>
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
