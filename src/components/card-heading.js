import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import HelpWidget from './help-widget';

const Wrapper = styled.h2`
  font-size: 1rem;
  line-height: 1.6rem;
  margin: 0;
  padding: 0;
`;

const CardHeading = ({ children, tooltip, ...otherProps }) => {
  if (tooltip !== undefined) {
    return (
      <Wrapper css="display: flex; align-items: center;" {...otherProps}>
        {children} <HelpWidget css="margin-left: 0.5rem;">{tooltip}</HelpWidget>
      </Wrapper>
    );
  }

  return <Wrapper {...otherProps}>{children}</Wrapper>;
};

CardHeading.propTypes = {
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.node,
};

CardHeading.defaultProps = {
  tooltip: undefined,
};

export default CardHeading;
