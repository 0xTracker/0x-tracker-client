import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import FillAssetsImage from './fill-assets-image';

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
`;

const ImageWrapper = styled.div`
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid ${COLORS.NEUTRAL.MYSTIC_400};
  border-radius: 4px;
  padding: 4px;
  display: flex;
  position: absolute;
  width: 25px;
  height: 25px;
`;

const RecentFillsItemImage = ({ assets, ...otherProps }) => {
  const makerAssets = assets.filter((asset) => asset.traderType === 'maker');
  const takerAssets = assets.filter((asset) => asset.traderType === 'taker');

  return (
    <Wrapper {...otherProps}>
      <ImageWrapper css="top: 0; right: 0;">
        <FillAssetsImage assets={takerAssets} />
      </ImageWrapper>
      <ImageWrapper css="bottom: 0; left: 0;">
        <FillAssetsImage assets={makerAssets} />
      </ImageWrapper>
    </Wrapper>
  );
};

RecentFillsItemImage.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      tokenImageUrl: PropTypes.string,
    }),
  ).isRequired,
};

export default RecentFillsItemImage;
