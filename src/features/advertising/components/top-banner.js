import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { media } from '../../../styles/util';
import { CURRENT_ADVERT } from '../constants';
import AdvertisingTooltip from './advertising-tooltip';
import Badge from '../../../components/badge';
import Container from '../../../components/container';
import Link from '../../../components/link';

const Icon = styled.img`
  border-radius: 4px;
  float: left;
  height: 20px;
  margin-right: 8px;
  width: 20px;

  ${media.greaterThan('lg')`
    margin-left: 12px;
  `}
`;

const LearnMoreLink = styled(Link)`
  color: ${COLORS.PRIMARY.SCAMPI_500};
  font-size: 14px;
  margin-left: 4px;
`;

const Wrapper = styled.div`
  background: ${COLORS.NEUTRAL.MYSTIC_300};
  border-radius: 4px;
  margin-bottom: 1.5rem;
  padding: 1rem;

  ${media.greaterThan('lg')`
    align-items: center;
    background: none;
    border-bottom: 2px solid hsl(230, 35%, 93%);
    display: flex;
    padding: 0 0 1rem;
  `}
`;

const SponsoredBadge = styled(Badge).attrs({
  bgColor: COLORS.NEUTRAL.MYSTIC_400,
})`
  align-items: center;
  display: flex;
  height: 20px;
  float: right;
`;

const Title = styled.strong`
  display: block;
  font-size: 14px;
  margin-right: 4px;
`;

const Description = styled.p`
  margin-bottom: 0;
  margin-left: 28px;
  margin-top: 8px;
  font-size: 14px;

  ${media.greaterThan('md')`
    margin: 0;
  `}
`;

const TopBanner = () => (
  <Container>
    <Wrapper>
      <AdvertisingTooltip enabled={false}>
        <SponsoredBadge>Sponsored</SponsoredBadge>
      </AdvertisingTooltip>
      <Icon height={20} src={CURRENT_ADVERT.ICON_URL} width={20} />
      <Title>{CURRENT_ADVERT.TITLE}:</Title>
      <Description>
        {CURRENT_ADVERT.DESCRIPTION} –{' '}
        <LearnMoreLink href={CURRENT_ADVERT.URL} indicateExternal>
          Learn more
        </LearnMoreLink>
      </Description>
    </Wrapper>
  </Container>
);

export default TopBanner;
