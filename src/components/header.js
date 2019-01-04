import { Cog as SettingsIcon } from 'styled-icons/fa-solid/Cog.cjs';
import { Bars as MenuIcon } from 'styled-icons/fa-solid/Bars.cjs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { URL } from '../constants';
import { colors } from '../styles/constants';
import Container from './container';
import Link from './link';
import logoImage from '../assets/images/logo-dark.svg';
import Navigation from './navigation';
import MobileNavigation from './mobile-navigation';
import SearchIcon from './search-icon';

const HeaderButton = styled.div`
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 8px 10px;
  margin-right: 8px;

  &:hover {
    background: ${colors.athensGray};
  }

  &:last-child {
    margin: 0;
  }
`;

const LogoImage = styled.img`
  width: ${props => (props.size === 'small' ? '120px' : '150px')};
`;

const Header = ({ screenSize }) => {
  const [mobileNav, updateMobileNav] = useState('closed');

  return (
    <React.Fragment>
      {screenSize.greaterThan.sm || mobileNav === 'closed' ? null : (
        <MobileNavigation
          onClose={() => {
            updateMobileNav('closed');
          }}
        />
      )}
      <div
        css={`
          background-color: ${colors.white};
          padding: 18px 0;
        `}
      >
        <Container css="align-items: center; display: flex; justify-content: space-between;">
          <Link href={URL.DASHBOARD}>
            <LogoImage
              alt="0x Tracker"
              size={screenSize.greaterThan.sm ? 'large' : 'small'}
              src={logoImage}
            />
          </Link>
          {screenSize.greaterThan.sm ? (
            <React.Fragment>
              <Navigation css="flex-grow: 1;" />
              <div css="display: flex;">
                <HeaderButton>
                  <SettingsIcon color="currentColor" height={22} width={22} />
                </HeaderButton>
                <HeaderButton>
                  <SearchIcon color="currentColor" height={22} width={22} />
                </HeaderButton>
              </div>
            </React.Fragment>
          ) : (
            <MenuIcon
              css="cursor: pointer;"
              height={24}
              onClick={() => {
                updateMobileNav('open');
              }}
            />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

Header.propTypes = {
  screenSize: PropTypes.shape({
    greaterThan: PropTypes.shape({
      sm: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({ screenSize: state.screen });

export default connect(mapStateToProps)(Header);
