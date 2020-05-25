import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import SearchBox from '../../search/components/search-box';

const Wrapper = styled.div`
  background: ${COLORS.NEUTRAL.MYSTIC_300};
  padding: 1rem 1.25rem;
`;

const MobileSearch = ({ onBlur }) => (
  <Wrapper>
    <SearchBox autoFocus onBlur={onBlur} />
  </Wrapper>
);

MobileSearch.propTypes = {
  onBlur: PropTypes.func.isRequired,
};

export default MobileSearch;
