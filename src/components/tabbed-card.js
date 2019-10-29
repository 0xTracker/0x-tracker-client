import { Card, CardBody, CardHeader, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const StyledTabbedCard = styled(Card)`
  border-radius: none;
  border: none;
  box-shadow: 0px 2px 4px rgba(126, 142, 177, 0.12);
`;

const TabbedCardHeader = styled(CardHeader)`
  background: none;
  border-bottom: 1px solid ${colors.athensGray};
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const TabbedCardBody = styled(CardBody)`
  align-items: center;
  display: flex;
  height: 265px;
  justify-content: center;
  padding: 1rem;
`;

const TabLink = styled(NavLink)`
  &&& {
    color: ${props => (props.active ? 'inherit' : colors.santasGray)};
    font-weight: ${props => (props.active ? '500' : 'initial')};
    cursor: pointer;
    border: none;
    margin-right: 1rem;
    padding: 0;

    &:hover,
    &:active {
      color: ${props => (props.active ? 'inherit' : colors.stormGray)};
    }
  }
`;

const TabbedCard = ({ className, tabs }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const Tab = tabs[selectedTab].component;

  return (
    <StyledTabbedCard className={className}>
      <TabbedCardHeader>
        {tabs.length === 1 ? (
          tabs[0].title
        ) : (
          <Nav card css="margin: 0;" tabs>
            {tabs.map((tab, index) => (
              <NavItem key={tab.title}>
                <TabLink
                  active={selectedTab === index}
                  onClick={() => setSelectedTab(index)}
                >
                  {tab.title}
                </TabLink>
              </NavItem>
            ))}
          </Nav>
        )}
      </TabbedCardHeader>
      <TabbedCardBody>
        {React.isValidElement(Tab) ? Tab : <Tab />}
      </TabbedCardBody>
    </StyledTabbedCard>
  );
};

TabbedCard.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.object,
      ]).isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

TabbedCard.defaultProps = {
  className: undefined,
};

export default TabbedCard;
