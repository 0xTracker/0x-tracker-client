import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import { truncateAddress } from '../../../util';
import Badge from '../../../components/badge';
import Blockie from '../../../components/blockie';
import TokenImage from '../../tokens/components/token-image';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const Image = styled.img`
  border-radius: 4px;
  height: 35px;
  width: 35px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 12px;
`;

const SubText = styled.span`
  color: ${COLORS.NEUTRAL.MYSTIC_600};
  display: block;
`;

const SearchSuggestion = ({ suggestion }) => {
  const breakpoint = useCurrentBreakpoint();

  if (suggestion.type === 'token') {
    return (
      <Wrapper>
        <Image as={TokenImage} imageUrl={suggestion.imageUrl} size="35px" />
        <span>
          <span css="display: flex; align-items: center;">
            {suggestion.name === null ? 'Unknown Token' : suggestion.name}
            {suggestion.symbol && (
              <Badge css="margin-left: 8px;">{suggestion.symbol}</Badge>
            )}
          </span>
          <SubText>
            {breakpoint.greaterThan('sm')
              ? suggestion.address
              : truncateAddress(suggestion.address)}
          </SubText>
        </span>
      </Wrapper>
    );
  }

  if (suggestion.type === 'trader') {
    return (
      <Wrapper>
        {_.isString(suggestion.imageUrl) ? (
          <Image src={suggestion.imageUrl} />
        ) : (
          <Image as={Blockie} seed={suggestion.address} size="35px" />
        )}
        <span>
          {suggestion.name === null ? 'Unknown Trader' : suggestion.name}
          <SubText>
            {breakpoint.greaterThan('sm')
              ? suggestion.address
              : truncateAddress(suggestion.address)}
          </SubText>
        </span>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Image height={35} src={suggestion.imageUrl} width={35} />
      {suggestion.name}
    </Wrapper>
  );
};

SearchSuggestion.propTypes = {
  suggestion: PropTypes.shape({
    address: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    symbol: PropTypes.string,
    type: PropTypes.oneOf(['relayer', 'token', 'trader']).isRequired,
  }).isRequired,
};

export default SearchSuggestion;
