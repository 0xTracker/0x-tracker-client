import { Row } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

const CardGridRow = styled(Row).attrs((props) => ({
  children: Array.isArray(props.children)
    ? props.children.map((child) =>
        React.cloneElement(child, { minHeight: props.minHeight }),
      )
    : React.cloneElement(props.children, { minHeight: props.minHeight }),
}))`
  min-height: ${(props) => props.minHeight};
`;

CardGridRow.defaultProps = {
  minHeight: '360px',
};

export default CardGridRow;
