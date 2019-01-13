import { getYear } from 'date-fns';
import { Col, Row } from 'reactstrap';
import { Github as GitHubIcon } from 'styled-icons/fa-brands/Github.cjs';
import { Twitter as TwitterIcon } from 'styled-icons/fa-brands/Twitter.cjs';
import { MediumM as MediumIcon } from 'styled-icons/fa-brands/MediumM.cjs';
import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import { colors } from '../styles/constants';
import Container from './container';
import Link from './link';
import SpectrumIcon from './spectrum-icon';

const FooterIconLink = styled(Link)`
  color: ${rgba(colors.white, 0.5)};
  display: flex;
  margin-left: 1rem;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    color: ${colors.white};
  }
`;

const FooterIcon = styled.svg`
  height: 1.5rem;
  vertical-align: middle;
  width: 1.5rem;
`;

const FooterColumn = styled(Col).attrs({ md: 6, xs: 12 })`
  align-items: center;
  display: flex;
`;

const Footer = () => (
  <div
    css={`
      background: ${colors.violet};
      color: ${colors.white};
      padding: 2rem;
    `}
  >
    <Container>
      <Row>
        <FooterColumn
          css={`
            justify-content: center;
            margin-bottom: 1.5rem;

            ${media.greaterThan('md')`
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
                height: 1.25rem;
                width: 1.25rem;

                ${media.greaterThan('md')`
                  height: 1rem; 
                  width: 1rem;
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

            ${media.greaterThan('md')`
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
