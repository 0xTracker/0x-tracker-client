import { useLocation } from 'react-use';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import { ChevronDownIcon } from './icons';
import Link from './link';

const NavigationItem = styled.div`
  align-items: center;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  color: ${props =>
    props.active || props.highlighted ? colors.white : colors.lavenderGray};
  display: inline-flex;
  margin-right: 0.75rem;
  padding: 0 1rem 0;
  position: relative;

  &:hover {
    text-decoration: none;
  }
`;

const SubNavigation = styled.div`
  background-color: ${colors.violet};
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-top: 3px solid ${colors.indigo};
  color: ${colors.lavenderGray};
  margin-top: 1.5rem;
  min-width: 200px;
  padding: 0.5rem 1rem;
  position: absolute;
  z-index: 999;
`;

const SubNavigationLink = styled(Link)`
  color: ${colors.lavenderGray};
  display: block;
  padding: 0.75rem 0 0.75rem 1rem;

  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const SubNavigationParent = ({ children, items }) => {
  const [active, setActive] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState();

  const blurHandler = useCallback(() => {
    const timeout = setTimeout(() => {
      setActive(false);
    }, 100);

    setHoverTimeout(timeout);
  });

  const activeHandler = useCallback(() => {
    clearTimeout(hoverTimeout);
    setActive(true);
  });

  const location = useLocation();
  const highlighted = items.some(item =>
    location.pathname.startsWith(item.href),
  );

  return (
    <div css="display: inline-block; position: relative;">
      <NavigationItem
        active={active}
        highlighted={highlighted}
        onActive={activeHandler}
        onBlur={blurHandler}
        onMouseOut={blurHandler}
        onMouseOver={activeHandler}
      >
        {children}
        <ChevronDownIcon
          css="margin-left: 0.5em; margin-top: 0.2em; pointer-events: none;"
          height={10}
          width={10}
        />
      </NavigationItem>
      {active && (
        <SubNavigation
          onActive={activeHandler}
          onBlur={blurHandler}
          onMouseOut={blurHandler}
          onMouseOver={activeHandler}
        >
          {items.map(item => (
            <SubNavigationLink href={item.href} key={item.title}>
              {item.title}
            </SubNavigationLink>
          ))}
        </SubNavigation>
      )}
    </div>
  );
};

SubNavigationParent.propTypes = {
  children: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default SubNavigationParent;
