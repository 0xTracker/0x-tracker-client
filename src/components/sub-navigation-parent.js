import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import { ChevronDownIcon } from './icons';

const NavigationItem = styled.div`
  align-items: center;
  display: inline-flex;
  margin-right: 0.75rem;
  padding: 0.75rem 1rem 1.5rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  position: relative;
  color: ${props => (props.active ? colors.white : colors.lavenderGray)};

  &:hover {
    text-decoration: none;
  }
`;

const SubNavigation = styled.div`
  background-color: ${colors.violet};
  color: ${colors.lavenderGray};
  padding: 0.5rem 1rem;
  position: absolute;
  z-index: 999;
  min-width: 200px;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-top: 3px solid #262dc2;
`;

const SubNavigationLink = styled.a`
  color: ${colors.lavenderGray};
  display: block;
  padding: 0.75rem 0 0.75rem 1rem;

  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const SubNavigationParent = ({ children }) => {
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

  return (
    <div css="display: inline-block; position: relative;">
      <NavigationItem
        active={active}
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
          <SubNavigationLink href="/network">
            Activity Overview
          </SubNavigationLink>
          <SubNavigationLink href="/fills">Browse Fills</SubNavigationLink>
          <SubNavigationLink href="/addresses">
            Makers & Takers
          </SubNavigationLink>
        </SubNavigation>
      )}
    </div>
  );
};

SubNavigationParent.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SubNavigationParent;
