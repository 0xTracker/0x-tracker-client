import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { media } from '../../../styles/util';
import AdvertisingTooltip from './advertising-tooltip';
import Badge from '../../../components/badge';
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
  margin-left: 28px;
  margin-top: 8px;

  ${media.greaterThan('lg')`
    margin: 0;
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

const Wrapper = styled.div`
  background: ${COLORS.NEUTRAL.MYSTIC_100};
  border-radius: 4px;
  padding: 1rem;
  margin: 0 0 1.25rem;

  ${media.greaterThan('lg')`
    align-items: center;
    display: flex;
    margin: 0 0 2rem;
  `}
`;

const TopBannerView = ({ advert, className }) => {
  const handleClick = () => {
    if (window.fathom) {
      window.fathom.trackGoal('0MW1MF59', 0);
    }
  };

  return (
    <Wrapper className={className}>
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
  );
};

TopBannerView.propTypes = {
  advert: PropTypes.shape({
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

TopBannerView.defaultProps = {
  className: undefined,
};

export default TopBannerView;
