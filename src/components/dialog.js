import { Portal } from 'react-portal';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import CloseIcon from './close-icon';
import DisableBodyScroll from './disable-body-scroll';

const StyledDialog = styled.section`
  background-color: ${colors.white};
  border-radius: 0.25rem;
  max-height: ${props => props.height}px;
  height: ${props => props.height}px;
  overflow: hidden;
  position: relative;
  max-width: ${props => props.width}px;
  width: ${props => props.width}px;
`;

const Overlay = styled.div`
  background-color: ${rgba(colors.violet, 0.8)};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.stormGray};
  cursor: pointer;
  margin-right: -6px; /* Icon doesn't sit flush with bounding box */
  padding: 0;

  &:hover {
    color: inherit;
  }
`;

const DialogHeader = styled.div`
  background-color: ${colors.athensGray};
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`;

const DialogHeading = styled.h1`
  font-size: 1.4rem;
  margin: 0;
`;

const DialogBody = styled.div`
  padding: 2rem 1.5rem;
`;

const Dialog = ({ children, className, onClose, width, height, title }) => {
  const handleKeyDown = ({ key }) => {
    if (key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <>
      <DisableBodyScroll />
      <Portal>
        <Overlay className={className}>
          <StyledDialog height={height} width={width}>
            <DialogHeader>
              <DialogHeading>{title}</DialogHeading>
              <CloseButton
                autoFocus
                onClick={onClose}
                title="Close"
                type="button"
              >
                <CloseIcon width={32} />
              </CloseButton>
            </DialogHeader>
            <DialogBody>{children}</DialogBody>
          </StyledDialog>
        </Overlay>
      </Portal>
    </>
  );
};

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  height: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
};

Dialog.defaultProps = {
  className: undefined,
  height: 600,
  width: 800,
};

export default Dialog;
