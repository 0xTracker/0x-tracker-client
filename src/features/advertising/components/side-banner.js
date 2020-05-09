import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import AdvertisingTooltip from './advertising-tooltip';
import Badge from '../../../components/badge';
import Link from '../../../components/link';
import useAdvertRandomizer from '../hooks/use-advert-randomizer';

const Icon = styled.img`
  border-radius: 4px;
  float: left;
  height: 20px;
  margin-right: 8px;
  width: 20px;
`;

const LearnMoreLink = styled(Link)`
  color: ${COLORS.PRIMARY.SCAMPI_500};
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-left: 28px;
  margin-top: 8px;
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
  font-weight: 500;
  margin-right: 4px;
`;

const Description = styled.p`
  margin-bottom: 0;
  margin-left: 28px;
  margin-top: 8px;
  font-size: 14px;
`;

const SideBanner = ({ className }) => {
  const advert = useAdvertRandomizer();

  const handleClick = () => {
    if (window.fathom) {
      window.fathom.trackGoal('SLGRB9AZ', 0);
    }
  };

  return (
    <Wrapper className={className}>
      <AdvertisingTooltip enabled={false}>
        <SponsoredBadge>Sponsored</SponsoredBadge>
      </AdvertisingTooltip>
      <Link href={advert.URL} onClick={handleClick}>
        <Icon height={20} src={advert.ICON_URL} width={20} />
      </Link>
      <Title as={Link} href={advert.URL} onClick={handleClick}>
        {advert.TITLE}
      </Title>
      <Description>
        <Link href={advert.URL} onClick={handleClick}>
          {advert.DESCRIPTION}
        </Link>
      </Description>
      <LearnMoreLink href={advert.URL} indicateExternal onClick={handleClick}>
        Learn more
      </LearnMoreLink>
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
