import { CardHeader, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import BasicCard from './basic-card';
import CardBody from './card-body';

const TabbedCardHeader = styled(CardHeader)`
  background: none;
  border-bottom: 1px solid ${colors.athensGray};
  display: flex;
  justify-content: space-between;
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

const TabbedCard = ({ bodyHeight, className, tabs }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const Tab = tabs[selectedTab].component;

  return (
    <BasicCard className={className}>
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
      <CardBody height={bodyHeight} padded>
        {React.isValidElement(Tab) ? Tab : <Tab />}
      </CardBody>
    </BasicCard>
  );
};

TabbedCard.propTypes = {
  bodyHeight: PropTypes.string,
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
  bodyHeight: '265px',
  className: undefined,
};

export default TabbedCard;
