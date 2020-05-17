import React from 'react';
import styled from 'styled-components';

import { media } from '../../../styles/util';
import Container from '../../../components/container';
import TopBannerView from './top-banner-view';
import useAdvertRandomizer from '../hooks/use-advert-randomizer';

const Wrapper = styled.div`
  margin-bottom: 1.5rem;

  ${media.greaterThan('lg')`
    background: none;
    margin-bottom: 2rem;
  `}
`;

const TopBanner = () => {
  const advert = useAdvertRandomizer();

  if (advert === undefined) {
    return null;
  }

  return (
    <Container>
      <Wrapper>
        <TopBannerView advert={advert} />
      </Wrapper>
    </Container>
  );
};

export default TopBanner;
