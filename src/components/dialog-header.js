import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import CloseIcon from './icons/close-icon';

const CloseButton = styled.button`
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  margin-right: -6px; /* Icon doesn't sit flush with bounding box */
  padding: 0;

  &:hover {
    color: white;
  }
`;

const DialogHeading = styled.h1`
  font-size: 1.2rem;
  line-height: 1;
  margin: 0;
  font-weight: 500;
`;

const StyledDialogHeader = styled.div`
  align-items: center;
  background-color: ${COLORS.PRIMARY.SCAMPI_900};
  border-radius: 0.25rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  color: ${COLORS.PRIMARY.SCAMPI_100};
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`;

const DialogHeader = ({ children, onClose }) => (
  <StyledDialogHeader>
    <DialogHeading>{children}</DialogHeading>
    <CloseButton autoFocus onClick={onClose} title="Close" type="button">
      <CloseIcon width={32} />
    </CloseButton>
  </StyledDialogHeader>
);

DialogHeader.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogHeader;
