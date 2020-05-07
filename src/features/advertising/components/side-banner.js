import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import AdvertisingTooltip from './advertising-tooltip';
import Badge from '../../../components/badge';
import getRandomAdvert from '../util/get-random-advert';
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
  font-size: 14px;
  margin-left: 4px;
`;

const Wrapper = styled.div`
  background: ${COLORS.NEUTRAL.MYSTIC_300};
  border-radius: 4px;
  padding: 1rem;
`;

const SponsoredBadge = styled(Badge).attrs({
  bgColor: COLORS.PRIMARY.SCAMPI_700,
  textColor: COLORS.NEUTRAL.MYSTIC_100,
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
`;

const SideBanner = ({ className }) => {
  const advert = getRandomAdvert();

  return (
    <Wrapper className={className}>
      <AdvertisingTooltip enabled={false}>
        <SponsoredBadge>Sponsored</SponsoredBadge>
      </AdvertisingTooltip>
      <Icon height={20} src={advert.ICON_URL} width={20} />
      <Title>{advert.TITLE}</Title>
      <Description>
        {advert.DESCRIPTION} –{' '}
        <LearnMoreLink href={advert.URL} indicateExternal>
          Learn more
        </LearnMoreLink>
      </Description>
    </Wrapper>
  );
};

SideBanner.propTypes = {
  className: PropTypes.string,
};

SideBanner.defaultProps = {
  className: undefined,
};

export default SideBanner;
