import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { getPeriodDescriptor } from '../../../util';
import SubTitle from '../../../components/sub-title';
import TokenImage from './token-image';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const TokenPageTitle = ({ statsPeriod, token }) => (
  <Wrapper>
    {_.isString(token.imageUrl) && (
      <TokenImage css="margin-right: 0.75rem;" imageUrl={token.imageUrl} />
    )}
    <span>
      {_.isString(token.name) ? token.name : `Token: ${token.address}`}
      {_.isString(token.symbol) && ` (${token.symbol.toUpperCase()})`}
      <SubTitle>{getPeriodDescriptor(statsPeriod)}</SubTitle>
    </span>
  </Wrapper>
);

TokenPageTitle.propTypes = {
  statsPeriod: PropTypes.string.isRequired,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    symbol: PropTypes.string,
  }).isRequired,
};

export default TokenPageTitle;
