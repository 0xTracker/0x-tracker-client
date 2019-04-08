import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { CaretRightIcon } from './icons';
import { colors } from '../styles/constants';

const Container = styled.li`
  align-items: center;
  display: flex;
  margin: 0 0 0.25rem;
  padding: 0;

  &:last-child {
    margin: 0;
  }
`;

const ListItem = ({ children }) => {
  return (
    <Container>
      <CaretRightIcon
        color={colors.santasGray}
        css="margin: 2px 0 0 -5px"
        height={16}
        width={16}
      />
      <span>{children}</span>
    </Container>
  );
};

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListItem;
