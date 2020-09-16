import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import Link from '../../../components/link';

const Icon = styled.img`
  display: block;
  border-radius: 4px;
  height: 40px;
  width: 40px;
  margin: 0 auto 16px auto;
`;

const LearnMoreLink = styled(Link)`
  color: ${COLORS.PRIMARY.SCAMPI_300};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-top: 8px;
`;

const Wrapper = styled.div`
  background: ${COLORS.PRIMARY.SCAMPI_800};
  color: white;
  border-radius: 4px;
  padding: 12px;
  min-width: 200px;
  text-align: center;
  margin: 0 12px 12px 12px;
`;

const Title = styled.strong`
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-right: 4px;
`;

const Description = styled.p`
  color: ${COLORS.PRIMARY.SCAMPI_100};
  clear: both;
  margin-bottom: 16px;
  padding-top: 8px;
  font-size: 14px;
`;

const SideBannerView = ({ advert, className }) => {
  const handleClick = () => {
    if (window.fathom) {
      window.fathom.trackGoal('SLGRB9AZ', 0);
    }
  };

  return (
    <Wrapper className={className}>
      <Link href={advert.url} onClick={handleClick} sponsored>
        <Icon height={20} src={advert.imageUrl} width={20} />
        {/* <img
          css="margin: 16px 0;"
          height={30}
          src="https://www.casoo.com/static/images/logo.svg"
        /> */}
      </Link>
      <Title as={Link} href={advert.url} onClick={handleClick} sponsored>
        {advert.title}
      </Title>
      <Description>
        <Link href={advert.url} onClick={handleClick} sponsored>
          {advert.description}
        </Link>
      </Description>
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

SideBannerView.propTypes = {
  advert: PropTypes.shape({
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

SideBannerView.defaultProps = {
  className: undefined,
};

export default SideBannerView;
