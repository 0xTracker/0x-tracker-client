import { Link as InternalLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../styles/constants';

const linkStyles = css`
  color: ${colors.moodyBlue};
  cursor: pointer;

  &:hover {
    color: ${colors.moodyBlue};
  }
`;

const StyledLink = styled.a`
  ${linkStyles};
`;

const StyledInternalLink = styled(InternalLink)`
  ${linkStyles};
`;

const Link = ({ children, href, ...otherProps }) => {
  if (href === undefined) {
    return <StyledLink {...otherProps}>{children}</StyledLink>;
  }

  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <StyledLink
        href={href}
        rel="noreferrer noopener"
        target="_blank"
        {...otherProps}
      >
        {children}
      </StyledLink>
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
