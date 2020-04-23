import { CardHeader, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import Card from './card';
import CardBody from './card-body';

const TabbedCardHeader = styled(CardHeader)`
  background: none;
  border-bottom: 2px solid ${COLORS.NEUTRAL.MYSTIC_200};
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const TabLink = styled(NavLink)`
  &&& {
    color: ${(props) => (props.active ? 'inherit' : COLORS.NEUTRAL.MYSTIC_600)};
    font-weight: ${(props) => (props.active ? '500' : 'initial')};
    cursor: pointer;
    border: none;
    margin-right: 1rem;
    padding: 0;

    &:hover,
    &:active {
      color: ${(props) =>
        props.active ? 'inherit' : COLORS.NEUTRAL.MYSTIC_700};
    }
  }
`;

const TabbedCard = ({ className, tabs }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const Tab = tabs[selectedTab].component;

  return (
    <Card className={className}>
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
      <CardBody padded>{React.isValidElement(Tab) ? Tab : <Tab />}</CardBody>
    </Card>
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
