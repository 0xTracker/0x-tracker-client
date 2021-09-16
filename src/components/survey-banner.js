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

const ArrowCTA = styled.svg`
  margin-left: 0.25rem;
  margin-top: -4px;
`;

const BannerLink = styled.a`
  font-weight: bold;
  color: white;
  padding-left: 0.5rem;
  &:hover {
    text-decoration: none;
    color: white;
  }
`;
const SurveyBanner = ({ isMobile }) => {
  const Banner = isMobile ? MobileBanner : DesktopBanner;
  return (
    <Banner>
      <BannerContent>
        Do you love crypto data? We want to chat! Earn $100 for your time.{'  '}
        <BannerLink href="https://forms.gle/ryRNZSr1LMrGjke7A" target="_blank">
          Apply Here
          <ArrowCTA
            fill="white"
            height="15"
            viewBox="0 0 16 15"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.484.246l.024 1.411 8.146.053L.817 13.547l.996.996L13.65 2.706l.052 8.146 1.412.024L15.045.315 4.484.246z" />
          </ArrowCTA>
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
