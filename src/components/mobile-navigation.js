import { Close as CloseIcon } from 'styled-icons/material/Close.cjs';
import { Search as SearchIcon } from 'styled-icons/fa-solid/Search.cjs';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { colors } from '../styles/constants';
import { URL } from '../constants';
import MobileNavigationItem from './mobile-navigation-item';
import Link from './link';
import logoImage from '../assets/images/logo.png';
import SearchForm from '../features/search/components/search-form';

const StyledNavigation = styled.ul`
  background-color: ${colors.violet};
  color: ${colors.white};
  height: 100%;
  padding: 5rem 0 0;
  position: absolute;
  width: 100%;
  z-index: 100;
`;

const DisableBodyScroll = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const SearchInput = styled.input`
  && {
    border: none;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: ${colors.martinique};
    color: ${colors.white};
    height: 34px;
    flex-grow: 1;
    font-size: 14px;
    padding: 0 0.7rem;
  }
`;

const SearchButton = styled.button`
  background-color: ${colors.stormGray};
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border: none;
  color: ${colors.violet};
  height: 34px;
  line-height: 1;
  padding: 0 0.75rem;

  &:hover {
    background-color: ${colors.white};
  }
`;

const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const MobileNavigation = ({ onClose }) => (
  <React.Fragment>
    <DisableBodyScroll />
    <StyledNavigation>
      <CloseButton onClick={onClose} width={32} />
      <Link href={URL.DASHBOARD} onClick={onClose}>
        <img
          css="position: absolute; top: 16px; left: 16px; width: 120px;"
          src={logoImage}
        />
      </Link>
      <SearchForm
        css="margin: 0 16px 16px 16px; display: flex; flex-wrap: nowrap;"
        onSearch={onClose}
      >
        {({ currentValue, handleChange, handleSubmit }) => (
          <React.Fragment>
            <SearchInput
              aria-label="Search"
              onChange={handleChange}
              placeholder="Search Fills"
              required
              type="search"
              value={currentValue}
            />
            <SearchButton onClick={handleSubmit} type="submit">
              <SearchIcon height={16} width={16} />
            </SearchButton>
          </React.Fragment>
        )}
      </SearchForm>
      <ul css="list-style: none; margin: 0; padding: 0;">
        <MobileNavigationItem href={URL.FILLS} onClick={onClose}>
          Fills
        </MobileNavigationItem>
        <MobileNavigationItem href={URL.TOKENS} onClick={onClose}>
          Tokens
        </MobileNavigationItem>
        <MobileNavigationItem href={URL.RELAYERS} onClick={onClose}>
          Relayers
        </MobileNavigationItem>
        <MobileNavigationItem href={URL.NEWS} onClick={onClose}>
          News & Updates
        </MobileNavigationItem>
        <MobileNavigationItem
          href="https://0xproject.com/portal/account"
          onClick={onClose}
        >
          My Wallet
        </MobileNavigationItem>
      </ul>
    </StyledNavigation>
  </React.Fragment>
);

MobileNavigation.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MobileNavigation;
