import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const DesktopBanner = styled.div`
  background-image: url('/assets/advertising/survey-banner.png');
  background-size: cover;
  text-align: center;
  color: white;
  height: 40px;
  padding-top: 8px;
`;

const MobileBanner = styled.div`
  background-color: #dab02e;
  text-align: center;
  color: white;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BannerContent = styled.div``;

const BannerLink = styled.a`
  font-weight: bold;
  color: white;
  padding-left: 0.5rem;
  &:hover {
    text-decoration: underline;
    color: white;
  }
`;
const SurveyBanner = ({ isMobile }) => {
  const Banner = isMobile ? MobileBanner : DesktopBanner;
  return (
    <Banner>
      <BannerContent>
        Let us know how you use 0xTracker and earn $100 in ZRX!{'  '}
        <BannerLink href="https://forms.gle/ryRNZSr1LMrGjke7A" target="_blank">
          Take the survey!
        </BannerLink>
      </BannerContent>
    </Banner>
  );
};

SurveyBanner.propTypes = {
  isMobile: PropTypes.bool,
};

SurveyBanner.defaultProps = {
  isMobile: false,
};

export default SurveyBanner;
