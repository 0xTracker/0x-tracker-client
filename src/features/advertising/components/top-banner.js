import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { media } from '../../../styles/util';
import AdvertisingTooltip from './advertising-tooltip';
import Badge from '../../../components/badge';
import Container from '../../../components/container';
import Link from '../../../components/link';
import useAdvertRandomizer from '../hooks/use-advert-randomizer';

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
  margin-left: 28px;
  margin-top: 8px;

  ${media.greaterThan('lg')`
    margin: 0;
  `}
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
  font-weight: 500;
  margin-right: 4px;
`;

const Description = styled.p`
  margin-bottom: 0;
  margin-left: 28px;
  margin-top: 8px;
  font-size: 14px;

  ${media.greaterThan('lg')`
    margin: 0;
  `}
`;

const Separator = styled.span`
  display: none;
  font-size: 14px;
  margin: 0 4px;

  ${media.greaterThan('lg')`
    display: inline;
  `}
`;

const TopBanner = () => {
  const advert = useAdvertRandomizer();

  if (advert === undefined) {
    return null;
  }

  const handleClick = () => {
    if (window.fathom) {
      window.fathom.trackGoal('0MW1MF59', 0);
    }
  };

  return (
    <Container>
      <Wrapper>
        <AdvertisingTooltip enabled={false}>
          <SponsoredBadge>Sponsored</SponsoredBadge>
        </AdvertisingTooltip>
        <Link href={advert.url} onClick={handleClick} sponsored>
          <Icon height={20} src={advert.imageUrl} width={20} />
        </Link>
        <Title as={Link} href={advert.url} onClick={handleClick} sponsored>
          {advert.title}:
        </Title>
        <Description>
          <Link href={advert.url} onClick={handleClick} sponsored>
            {advert.description}
          </Link>
        </Description>
        <Separator> – </Separator>
        <LearnMoreLink
          href={advert.url}
          indicateExternal
          onClick={handleClick}
          sponsored
        >
          Learn more
        </LearnMoreLink>
      </Wrapper>
    </Container>
  );
};

export default TopBanner;
