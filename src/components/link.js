import { Link as InternalLink } from 'react-router-dom';
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

const StyledLink = styled.a`
  ${linkStyles};
`;

const StyledInternalLink = styled(InternalLink)`
  ${linkStyles};
`;

const StyledOutboundLink = styled(ReactGA.OutboundLink)`
  ${linkStyles};
`;

const Link = ({ children, href, ...otherProps }) => {
  if (href === undefined) {
    return <StyledLink {...otherProps}>{children}</StyledLink>;
  }

  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <StyledOutboundLink
        eventLabel={href}
        rel="noreferrer noopener"
        target="_blank"
        to={href}
        {...otherProps}
      >
        {children}
      </StyledOutboundLink>
    );
  }

  return (
    <StyledInternalLink to={href} {...otherProps}>
      {children}
    </StyledInternalLink>
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
