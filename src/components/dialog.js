import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import DialogHeader from './dialog-header';
import DisableBodyScroll from './disable-body-scroll';
import useEscapeKey from '../hooks/use-escape-key';

const StyledDialog = styled.section`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 50px);
  height: ${(props) => props.height}px;
  max-width: ${(props) => props.width}px;
  width: ${(props) => props.width}px;
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
`;

const DialogBody = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin: 2rem 0;
  padding: 0 1.5rem;
`;

const Dialog = ({ children, className, onClose, width, height, title }) => {
  useEscapeKey(onClose);

  return (
    <>
      <DisableBodyScroll />
      <Portal>
        <Overlay className={className}>
          <StyledDialog height={height} width={width}>
            <DialogHeader onClose={onClose}>{title}</DialogHeader>
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
