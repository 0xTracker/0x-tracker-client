import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Container from './container';

const ContentSection = styled(Container)`
  flex: 1;
  padding-bottom: 40px;
  padding-top: 40px;

  ${({ verticallyCentered }) =>
    verticallyCentered &&
    css`
      align-items: center;
      display: flex;
    `};
`;

ContentSection.propTypes = {
  verticallyCentered: PropTypes.bool,
};

ContentSection.defaultProps = {
  verticallyCentered: false,
};

export default ContentSection;
