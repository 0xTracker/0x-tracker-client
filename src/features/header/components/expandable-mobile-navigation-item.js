import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-use';

import { colors } from '../../../styles/constants';
import { ChevronDownIcon, ChevronUpIcon } from '../../../components/icons';
import MobileSubNavigation from './mobile-sub-navigation';

const StyledItem = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-bottom: ${props =>
    props.expanded ? 'none' : `1px solid ${colors.martinique}`};
  color: ${colors.lavenderGray};
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  margin: 0 1rem;
  padding: 0.75rem 0.5rem;

  &:hover {
    color: ${colors.white};
  }
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

const ExpandableMobileNavigationItem = ({ children, items, onNavigate }) => {
  const location = useLocation();
  const highlighted = items.some(item =>
    location.pathname.startsWith(item.href),
  );
  const [expanded, setExpanded] = React.useState(highlighted);
  const handleClick = () => setExpanded(!expanded);

  return (
    <>
      <StyledItem expanded={expanded} onClick={handleClick}>
        {children}
        {expanded ? <ContractableIndicator /> : <ExpandableIndicator />}
      </StyledItem>
      {expanded ? (
        <MobileSubNavigation items={items} onNavigate={onNavigate} />
      ) : null}
    </>
  );
};

ExpandableMobileNavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default ExpandableMobileNavigationItem;
