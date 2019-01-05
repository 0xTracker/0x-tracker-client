import { Link as InternalLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const StyledLink = styled.a`
  color: ${colors.indigo};
  cursor: pointer;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const Link = ({ children, href, ...otherProps }) => {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <StyledLink
        as={ReactGA.OutboundLink}
        eventLabel={href}
        rel="noreferrer noopener"
        target="_blank"
        to={href}
        {...otherProps}
      >
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledLink as={InternalLink} to={href} {...otherProps}>
      {children}
    </StyledLink>
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
