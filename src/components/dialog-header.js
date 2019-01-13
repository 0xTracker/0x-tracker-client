import { rgba } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import CloseIcon from './close-icon';

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${rgba(colors.white, 0.7)};
  cursor: pointer;
  margin-right: -6px; /* Icon doesn't sit flush with bounding box */
  padding: 0;

  &:hover {
    color: inherit;
  }
`;

const DialogHeading = styled.h1`
  font-size: 1.4rem;
  line-height: 1;
  margin: 0;
`;

const StyledDialogHeader = styled.div`
  align-items: center;
  background-color: ${colors.indigo};
  border-radius: 0.25rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  color: white;
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
