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

const Link = ({
  children,
  href,
  indicateExternal,
  noFollow,
  sponsored,
  ...otherProps
}) => {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const rel = [
    isExternal ? 'noreferrer' : undefined,
    isExternal ? 'noopener' : undefined,
    sponsored ? 'sponsored' : undefined,
    sponsored || noFollow ? 'nofollow' : undefined,
  ].filter((i) => i !== undefined);

  if (isExternal) {
    return (
      <StyledLink
        css={indicateExternal ? 'vertical-align: middle;' : undefined}
        href={href}
        rel={rel.join(' ')}
        target="_blank"
        {...otherProps}
      >
        {children}
        {indicateExternal ? (
          <ExternalLinkIcon css="margin-left: 6px;" size={16} />
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
  noFollow: PropTypes.bool,
  sponsored: PropTypes.bool,
};

Link.defaultProps = {
  href: undefined,
  indicateExternal: false,
  noFollow: false,
  sponsored: false,
};

export default Link;
