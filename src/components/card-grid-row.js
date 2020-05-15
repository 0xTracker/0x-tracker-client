import { Row } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

const CardGridRow = styled(Row)
  .withConfig({ shouldForwardProp: (prop) => prop !== 'minHeight' })
  .attrs((props) => ({
    children: Array.isArray(props.children)
      ? props.children.map((child, index) =>
          // eslint-disable-next-line react/no-array-index-key
          React.cloneElement(child, { key: index, minHeight: props.minHeight }),
        )
      : React.cloneElement(props.children, { minHeight: props.minHeight }),
  }))`
  min-height: ${(props) => props.minHeight};
`;

CardGridRow.defaultProps = {
  minHeight: '360px',
};

export default CardGridRow;
