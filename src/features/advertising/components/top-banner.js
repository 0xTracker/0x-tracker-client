import React from 'react';
import styled from 'styled-components';

import { media } from '../../../styles/util';
import TopBannerView from './top-banner-view';
import useAdvertRandomizer from '../hooks/use-advert-randomizer';

const Wrapper = styled.div`
  margin-bottom: 1.5rem;

  ${media.greaterThan('lg')`
    background: rgb(231, 233, 243);
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 2rem;
  `}
`;

const TopBanner = () => {
  const advert = useAdvertRandomizer();

  if (advert === undefined) {
    return null;
  }

  return (
    <Wrapper>
      <TopBannerView advert={advert} />
    </Wrapper>
  );
};

export default TopBanner;
