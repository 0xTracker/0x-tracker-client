import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import { ChevronDownIcon, ChevronUpIcon } from './icons';
import MobileSubNavigation from './mobile-sub-navigation';

const StyledItem = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-bottom: ${props =>
    props.expanded ? 'none' : `1px solid ${colors.martinique}`};
  color: currentColor;
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  margin: 0 1rem;
  padding: 0.75rem 0.5rem;
`;

const ExpandableIndicator = styled(ChevronDownIcon).attrs({
  height: 12,
  width: 12,
})`
  margin-left: 0.5em;
  margin-top: 0.2em;
  pointer-events: none;
`;

const ContractableIndicator = styled(ChevronUpIcon).attrs({
  height: 12,
  width: 12,
})`
  margin-left: 0.5em;
  margin-top: 0.2em;
  pointer-events: none;
`;

const ExpandableMobileNavigationItem = ({ children }) => {
  const [expanded, setExpanded] = React.useState(true);
  const handleClick = () => setExpanded(!expanded);

  return (
    <>
      <StyledItem expanded={expanded} onClick={handleClick}>
        {children}
        {expanded ? <ContractableIndicator /> : <ExpandableIndicator />}
      </StyledItem>
      {expanded ? <MobileSubNavigation /> : null}
    </>
  );
};

ExpandableMobileNavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExpandableMobileNavigationItem;
