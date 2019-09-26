import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { URL } from '../../../constants';
import { CloseIcon } from '../../../components/icons';
import Link from '../../../components/link';
import logoImage from '../../../assets/images/logo-dark.svg';

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.lavenderGray};
  cursor: pointer;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 1.2rem;
  right: 0.6rem;

  &:hover,
  &:active {
    color: ${colors.white};
  }
`;

const Logo = styled.img`
  height: 2.5rem;
`;

const MobileMenuHeader = ({ onClose, onNavigate }) => (
  <div css="height: 4.5rem; padding: 0 1rem;">
    <CloseButton autoFocus onClick={onClose} title="Close" type="button">
      <CloseIcon width={27} />
    </CloseButton>
    <Link href={URL.DASHBOARD} onClick={onNavigate}>
      <Logo src={logoImage} title="0x Tracker" />
    </Link>
  </div>
);

MobileMenuHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default MobileMenuHeader;
