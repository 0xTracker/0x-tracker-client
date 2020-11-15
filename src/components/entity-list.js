import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: scroll;
`;

const EntityList = ({ children }) => <Wrapper>{children}</Wrapper>;

EntityList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EntityList;
