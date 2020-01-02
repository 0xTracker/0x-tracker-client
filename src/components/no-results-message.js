import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledNoResultsMessage = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  flex-shrink: 1;
  padding: 2rem;
`;

const NoResultsMessage = ({ children }) => (
  <StyledNoResultsMessage>
    <p css="font-size: 1.3rem; text-align: center; word-break: break-word;">
      {children}
    </p>
  </StyledNoResultsMessage>
);

NoResultsMessage.propTypes = {
  children: PropTypes.string.isRequired,
};

export default NoResultsMessage;
