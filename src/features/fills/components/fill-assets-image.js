/* eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { TokenIcon, TokensIcon } from '../../../components/icons';
import { COLORS } from '../../../styles/constants';

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
`;

const ImageWrapper = styled.div`
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid ${COLORS.NEUTRAL.MYSTIC_300};
  border-radius: 4px;
  padding: 4px;
  display: flex;
  position: absolute;
  width: 25px;
  height: 25px;
`;

const FillAssetImage = styled.img`
  width: 100%;
  height: 100%;
`;

const TraderTypeImage = ({ assets, type }) => {
  const assetsForType = assets.filter((a) => a.traderType === type);

  if (assetsForType.length > 1) {
    return (
      <TokensIcon
        css={`
          color: ${COLORS.NEUTRAL.MYSTIC_900};
        `}
        size={18}
      />
    );
  }

  if (assetsForType[0].tokenImageUrl) {
    return <FillAssetImage src={assetsForType[0].tokenImageUrl} />;
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

TraderTypeImage.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      tokenImageUrl: PropTypes.string,
      traderType: PropTypes.string.isRequired,
    }),
  ).isRequired,
  type: PropTypes.string.isRequired,
};

const FillAssetsImage = ({ assets, ...otherProps }) => (
  <Wrapper {...otherProps}>
    <ImageWrapper css="top: 0; right: 0;">
      <TraderTypeImage assets={assets} type="maker" />
    </ImageWrapper>
    <ImageWrapper css="bottom: 0; left: 0;">
      <TraderTypeImage assets={assets} type="taker" />
    </ImageWrapper>
  </Wrapper>
);

FillAssetsImage.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      tokenImageUrl: PropTypes.string,
    }),
  ).isRequired,
};

export default FillAssetsImage;
/* eslint-enable react/no-multi-comp */
