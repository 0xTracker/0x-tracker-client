import { DollarSign as DollarIcon } from 'styled-icons/fa-solid/DollarSign.cjs';
import { Search as SearchIcon } from 'styled-icons/fa-solid/Search.cjs';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../constants';
import { colors } from '../styles/constants';
import Container from './container';
import Link from './link';
import logoImage from '../assets/images/logo-dark.svg';
import Navigation from './navigation';

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

const Header = () => (
  <div
    css={`
      background-color: ${colors.white};
      padding: 18px 0;
    `}
  >
    <Container css="align-items: center; display: flex; justify-content: space-between;">
      <Link href={URL.DASHBOARD}>
        <img alt="0x Tracker" css="width: 150px;" src={logoImage} />
      </Link>
      <Navigation css="flex-grow: 1;" />
      <div css="display: flex;">
        <HeaderButton>
          <DollarIcon color="currentColor" height={22} width={22} />
        </HeaderButton>
        <HeaderButton>
          <SearchIcon color="currentColor" height={22} width={22} />
        </HeaderButton>
      </div>
    </Container>
  </div>
);

export default Header;
