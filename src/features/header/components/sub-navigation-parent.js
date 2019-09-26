import { useLocation } from 'react-use';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { ChevronDownIcon } from '../../../components/icons';
import SubNavigationItem from './sub-navigation-item';

const StyledSubNavigationParent = styled.div`
  display: inline-block;
  height: 100%;
  position: relative;
`;

const NavigationItem = styled.div`
  align-items: center;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  color: ${props =>
    props.open || props.highlighted ? colors.white : colors.lavenderGray};
  display: inline-flex;
  height: 100%;
  margin-right: 0.75rem;
  padding: 0 1rem 0 0;
  position: relative;

  &:hover {
    text-decoration: none;
  }
`;

const SubNavigation = styled.div`
  background-color: ${colors.violet};
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-top: 0.25rem solid ${colors.indigo};
  color: ${colors.lavenderGray};
  left: -1rem;
  min-width: 13.5rem;
  padding: 0.5rem 1rem;
  position: absolute;
  z-index: 1;
`;

const SubNavigationIndicator = styled(ChevronDownIcon).attrs({
  height: 10,
  width: 10,
})`
  margin-left: 0.5em;
  margin-top: 0.2em;
  pointer-events: none;
`;

const SubNavigationParent = ({ children, items }) => {
  const [open, setOpen] = useState(false);
  const [blurTimeout, setBlurTimeout] = useState();

  const blurHandler = useCallback(() => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 100);

    setBlurTimeout(timeout);
  });

  const activeHandler = useCallback(() => {
    // Clear the blur timeout to prevent sub-navigation from disappearing when
    // the user navigates between elements.
    clearTimeout(blurTimeout);

    setOpen(true);
  });

  const location = useLocation();
  const highlighted = items.some(item =>
    location.pathname.startsWith(item.href),
  );

  return (
    <StyledSubNavigationParent>
      <NavigationItem
        highlighted={highlighted}
        onBlur={blurHandler}
        onFocus={activeHandler}
        onMouseOut={blurHandler}
        onMouseOver={activeHandler}
        open={open}
      >
        {children}
        <SubNavigationIndicator />
      </NavigationItem>
      {open && (
        <SubNavigation
          onBlur={blurHandler}
          onFocus={activeHandler}
          onMouseOut={blurHandler}
          onMouseOver={activeHandler}
        >
          {items.map(item => (
            <SubNavigationItem href={item.href} key={item.href}>
              {item.title}
            </SubNavigationItem>
          ))}
        </SubNavigation>
      )}
    </StyledSubNavigationParent>
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
