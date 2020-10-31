import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { TokenIcon, TokensIcon } from '../../../components/icons';

const FillAssetImage = styled.img`
  width: 100%;
  height: 100%;
`;

const FillAssetsImage = ({ assets }) => {
  if (assets.length > 1 || assets.length === 0) {
    return (
      <TokensIcon
        css={`
          color: ${COLORS.NEUTRAL.MYSTIC_900};
        `}
        size={18}
      />
    );
  }

  if (assets[0].tokenImageUrl) {
    return <FillAssetImage src={assets[0].tokenImageUrl} />;
  }

  return (
    <TokenIcon
      css={`
        color: ${COLORS.NEUTRAL.MYSTIC_900};
      `}
      size={18}
    />
  );
};

FillAssetsImage.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      tokenImageUrl: PropTypes.string,
    }),
  ).isRequired,
};

export default FillAssetsImage;
