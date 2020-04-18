import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import ExpandableMobileNavigationItem from './expandable-mobile-navigation-item';
import MobileNavigationLink from './mobile-navigation-link';
import useSettingsDialog from '../../preferences/hooks/use-settings-dialog';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0;
`;

const MobileNavigation = ({ onNavigate }) => {
  const settingsDialog = useSettingsDialog();

  return (
    <StyledNav aria-label="Primary">
      <ExpandableMobileNavigationItem
        items={[
          { href: URL.ASSET_BRIDGES, title: 'Asset Bridges' },
          { href: URL.FILLS, title: 'Browse Fills' },
          { href: URL.NETWORK_INSIGHTS, title: 'Insights' },
          { href: URL.TRADERS, title: 'Top Traders' },
        ]}
        onNavigate={onNavigate}
      >
        Network
      </ExpandableMobileNavigationItem>
      <MobileNavigationLink href={URL.TOKENS} onClick={onNavigate}>
        Tokens
      </MobileNavigationLink>
      <MobileNavigationLink href={URL.RELAYERS} onClick={onNavigate}>
        Relayers
      </MobileNavigationLink>
      <MobileNavigationLink href={URL.NEWS} onClick={onNavigate}>
        News & Updates
      </MobileNavigationLink>
      <MobileNavigationLink
        onClick={() => {
          settingsDialog.show();
          onNavigate();
        }}
      >
        Settings
      </MobileNavigationLink>
    </StyledNav>
  );
};

MobileNavigation.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default MobileNavigation;
