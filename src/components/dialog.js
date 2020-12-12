import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import DialogHeader from './dialog-header';
import DisableBodyScroll from './disable-body-scroll';
import useEscapeKey from '../hooks/use-escape-key';
import { CloseIcon } from './icons';
import { COLORS } from '../styles/constants';

const StyledDialog = styled.section`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 50px);
  max-width: calc(100vw - 50px);
  height: ${(props) => (props.height ? `${props.height}px` : 'initial')};
  width: ${(props) => (props.width ? `${props.width}px` : 'initial')};
  position: relative;
`;

const Overlay = styled.div`
  background-color: hsla(230, 45%, 96%, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 30;
`;

const DialogBody = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin: 2rem 0;
  padding: 0 1.5rem;
`;

const CloseButton = styled.button`
  background: ${COLORS.PRIMARY.SCAMPI_600};
  border-radius: 50%;
  border: none;
  box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.2);
  color: white;
  cursor: pointer;
  margin-right: -6px; /* Icon doesn't sit flush with bounding box */
  outline: none;
  padding: 0.25rem;
  position: absolute;
  right: -15px;
  top: -20px;

  &:hover {
    background: ${COLORS.PRIMARY.SCAMPI_800};
  }
`;

const Dialog = ({ children, className, onClose, width, height, title }) => {
  useEscapeKey(onClose);

  return (
    <>
      <DisableBodyScroll />
      <Portal>
        <Overlay>
          <StyledDialog height={height} width={width}>
            {title && <DialogHeader onClose={onClose}>{title}</DialogHeader>}
            {title === undefined && (
              <CloseButton onClick={onClose} title="Close" type="button">
                <CloseIcon size={30} />
              </CloseButton>
            )}
            <DialogBody className={className}>{children}</DialogBody>
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
  title: PropTypes.string,
  width: PropTypes.number,
};

Dialog.defaultProps = {
  className: undefined,
  height: undefined,
  title: undefined,
  width: undefined,
};

export default Dialog;
