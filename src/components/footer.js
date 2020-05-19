import { Col, Row } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import { COLORS } from '../styles/constants';
import { DiscordIcon, TwitterIcon } from './icons';
import Link from './link';

const NavHeading = styled.h2`
  color: ${COLORS.PRIMARY.SCAMPI_500};
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  margin: 2rem 0 1rem 0;
  text-transform: uppercase;

  ${media.greaterThan('md')`
    margin: 0 0 1rem 0;
  `}
`;

const Description = styled.p`
  margin: 1rem 0 1.5rem;
  max-width: 350px;

  ${media.greaterThan('md')`
    margin: 0 0 1.5rem;
  `}
`;

const FooterLink = styled(Link)`
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

const NavLink = styled(FooterLink)`
  display: block;
  margin: 0 0 0.5rem;
`;

const SocialLink = styled(Link)`
  align-items: center;
  background-color: ${COLORS.NEUTRAL.MYSTIC_400};
  color: ${COLORS.PRIMARY.SCAMPI_1000};
  border-radius: 0.25rem;
  display: flex;
  height: 35px;
  justify-content: center;
  margin-right: 0.5rem;
  width: 35px;

  &:hover {
    background-color: ${COLORS.NEUTRAL.MYSTIC_500};
  }
`;

const PoweredBy = styled.div`
  max-width: 250px;

  ${media.greaterThan('md')`
    max-width: initial; 
    text-align: right;
  `}
`;

const License = styled.div`
  margin-bottom: 1rem;

  ${media.greaterThan('md')`
    margin: 0;
  `}
`;

const SecondaryLinks = styled.div`
  border-radius: 1px;
  border-top: 2px solid ${COLORS.NEUTRAL.MYSTIC_400};
  font-size: 0.8rem;
  margin-top: 3rem;
  padding-top: 2rem;

  ${media.greaterThan('md')`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 4rem;
  `}
`;

const Info = styled(Col)`
  margin-bottom: 2rem;

  ${media.greaterThan('md')`
    margin-bottom: 0;
  `}
`;

const Wrapper = styled.div`
  background-color: ${COLORS.NEUTRAL.MYSTIC_300};
  color: ${COLORS.PRIMARY.SCAMPI_1000};
  padding: 2rem 1rem;

  ${media.greaterThan('md')`
    padding: 3rem 2rem 2rem;
  `}
`;

const Footer = () => (
  <Wrapper>
    <Row>
      <Info md={4} xs={12}>
        <NavHeading>0x Tracker</NavHeading>
        <Description>
          The leading provider of 0x protocol market data, transparent Ethereum
          token price index and 0x protocol news aggregator.
        </Description>
        <nav css="display: flex;">
          <SocialLink href="https://twitter.com/0xTracker">
            <TwitterIcon size="18" />
          </SocialLink>
          <SocialLink href="https://discord.gg/tnV8hud">
            <DiscordIcon size="18" />
          </SocialLink>
        </nav>
      </Info>
      <Col md={{ offset: 2, size: 2 }} sm={4} xs={6}>
        <NavHeading>About</NavHeading>
        <nav>
          <NavLink href="/news-and-updates/0x-tracker">Blog</NavLink>
          <NavLink
            href="https://www.buymeacoffee.com/0xTracker"
            onClick={() => {
              if (window.fathom) {
                window.fathom.trackGoal('MYB7SWUU', 0);
              }
            }}
          >
            Donate
          </NavLink>
          <NavLink href="https://docs.0xtracker.com/faqs">FAQs</NavLink>
          <NavLink href="https://docs.0xtracker.com/">Overview</NavLink>
        </nav>
      </Col>
      <Col md={2} sm={4} xs={6}>
        <NavHeading>Developers</NavHeading>
        <nav>
          <NavLink href="https://docs.0xtracker.com/api-reference/introduction">
            API
          </NavLink>
          <NavLink href="https://docs.0xtracker.com/contributing">
            Contributing
          </NavLink>
          <NavLink href="https://github.com/0xtracker">GitHub</NavLink>
        </nav>
      </Col>
      <Col md={2} sm={4} xs={6}>
        <NavHeading>Resources</NavHeading>
        <nav>
          <NavLink href="https://headwayapp.co/0x-tracker-changelog">
            Changelog
          </NavLink>
          <NavLink href="/privacy">Privacy Policy</NavLink>
          <NavLink href="https://trello.com/b/4cY2eOsQ/0x-tracker-roadmap">
            Roadmap
          </NavLink>
          <NavLink href="/terms">Terms Of Use</NavLink>
        </nav>
      </Col>
    </Row>
    <SecondaryLinks>
      <License>
        Licensed under{' '}
        <FooterLink href="https://github.com/0xTracker/0x-tracker-client/blob/master/LICENSE">
          Apache-2.0
        </FooterLink>
      </License>
      <PoweredBy>
        Powered by <FooterLink href="https://0x.org">0x</FooterLink> and{' '}
        <FooterLink href="https://ethereum.org/">Ethereum</FooterLink> with
        pricing data from{' '}
        <FooterLink href="https://min-api.cryptocompare.com/">
          CryptoCompare
        </FooterLink>
      </PoweredBy>
    </SecondaryLinks>
  </Wrapper>
);

export default Footer;
