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
`;

const LearnMoreLink = styled(Link)`
  color: ${COLORS.PRIMARY.SCAMPI_500};
  display: block;
  font-size: 14px;
  margin-right: 28px;
  margin-left: 32px;
  margin-top: 12px;

  ${media.greaterThan('lg')`
    margin: 0;
  `}
`;

const SponsoredBadge = styled(Badge).attrs({
  bgColor: COLORS.NEUTRAL.MYSTIC_400,
})`
  align-items: center;
  display: none;
  height: 20px;
  float: right;

  ${media.greaterThan('lg')`
    display: flex;
  `}
`;

const Title = styled.strong`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0;
  margin-left: 32px;

  ${media.greaterThan('lg')`
    margin-left: 0;
    margin-right: 12px;

    &::after {
      content: ':';
    }
  `}
`;

const Description = styled.p`
  margin-bottom: 0;
  margin-right: 28px;
  margin-top: 2px;
  font-size: 14px;
  margin-left: 32px;

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
    justify-content: space-between;
    display: flex;
    margin: 0 0 2rem;
  `}
`;

const Body = styled.div`
  ${media.greaterThan('lg')`
    display: flex;
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
      <Body>
        <Link href={advert.url} onClick={handleClick} sponsored>
          <Icon height={20} src={advert.imageUrl} width={20} />
        </Link>
        <Title as={Link} href={advert.url} onClick={handleClick} sponsored>
          {advert.title}
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
      </Body>
      <AdvertisingTooltip enabled={false}>
        <SponsoredBadge>AD</SponsoredBadge>
      </AdvertisingTooltip>
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
