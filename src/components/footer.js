import { getYear } from 'date-fns';
import { Col, Row } from 'reactstrap';
import { Github as GitHubIcon } from 'styled-icons/fa-brands/Github.cjs';
import { Twitter as TwitterIcon } from 'styled-icons/fa-brands/Twitter.cjs';
import { MediumM as MediumIcon } from 'styled-icons/fa-brands/MediumM.cjs';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import { colors } from '../styles/constants';
import Container from './container';
import Link from './link';
import SpectrumIcon from './spectrum-icon';

const FooterIconLink = styled(Link)`
  color: ${colors.silver};
  display: flex;
  margin-left: 15px;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    color: ${colors.white};
  }

  ${media.md`
    margin-left: 13px;
  `}
`;

const FooterIcon = styled.svg`
  height: 25px;
  vertical-align: middle;
  width: 25px;

  ${media.md`
    height: 20px;
    width: 20px;
  `}
`;

const FooterColumn = styled(Col).attrs({ xs: 12, md: 6 })`
  align-items: center;
  display: flex;
`;

const Footer = () => (
  <div
    css={`
      background: ${colors.tuna};
      color: ${colors.silver};
      padding: 30px;
    `}
  >
    <Container>
      <Row>
        <FooterColumn
          css={`
            justify-content: center;
            margin-bottom: 20px;

            ${media.md`
              justify-content: flex-end;
              margin-bottom: 0;
              order: 2;
            `}
          `}
        >
          <FooterIconLink
            href="https://github.com/0xtracker"
            title="0x Tracker on GitHub"
          >
            <FooterIcon as={GitHubIcon} />
          </FooterIconLink>
          <FooterIconLink
            href="https://spectrum.chat/0x-tracker"
            title="0x Tracker on Spectrum"
          >
            <SpectrumIcon
              css={`
                height: 21px;
                width: 21px;

                ${media.md`
                  height: 16px; 
                  width: 16px;
                `}
              `}
            />
          </FooterIconLink>
          <FooterIconLink
            href="https://twitter.com/0xTracker"
            title="0x Tracker on Twitter"
          >
            <FooterIcon as={TwitterIcon} />
          </FooterIconLink>
          <FooterIconLink
            href="https://medium.com/0x-tracker"
            title="0x Tracker on Medium"
          >
            <FooterIcon as={MediumIcon} />
          </FooterIconLink>
        </FooterColumn>
        <FooterColumn
          css={`
            justify-content: center;

            ${media.md`
              justify-content: flex-start;
            `}
          `}
        >
          Copyright &copy; 0x Tracker {getYear(new Date())}
        </FooterColumn>
      </Row>
    </Container>
  </div>
);

export default Footer;
