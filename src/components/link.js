import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { ExternalLinkIcon } from './icons';

const StyledLink = styled.a`
  color: currentColor;
  cursor: pointer;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const Link = ({ children, href, indicateExternal, ...otherProps }) => {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <StyledLink
        css={
          indicateExternal
            ? 'display: inline-flex; align-items: center;'
            : undefined
        }
        href={href}
        rel="noreferrer noopener"
        target="_blank"
        {...otherProps}
      >
        {children}
        {indicateExternal ? (
          <ExternalLinkIcon css="margin-left: 8px;" size={18} />
        ) : null}
      </StyledLink>
    );
  }

  return (
    <StyledLink href={href} {...otherProps}>
      {children}
    </StyledLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  indicateExternal: PropTypes.bool,
};

Link.defaultProps = {
  href: undefined,
  indicateExternal: false,
};

export default Link;
