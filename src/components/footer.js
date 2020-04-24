import { Col, Row } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import { COLORS } from '../styles/constants';
import { DiscordIcon, TwitterIcon } from './icons';
import Container from './container';
import Link from './link';
import logoImage from '../assets/images/logo-grayscale.svg';

const Logo = styled.img`
  height: 2.25rem;
`;

const NavHeading = styled.h2`
  color: white;
  font-size: 1.1rem;
  margin: 2rem 0 1rem 0;

  ${media.greaterThan('md')`
    margin: 0 0 1rem 0;
  `}
`;

const Description = styled.p`
  margin: 1rem 0 1.5rem;

  ${media.greaterThan('md')`
    margin: 1rem 0 1.5rem;
  `}
`;

const NavLink = styled(Link)`
  color: inherit;
  display: block;
  margin: 0 0 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialLink = styled(Link)`
  align-items: center;
  background-color: ${COLORS.PRIMARY.SCAMPI_100};
  color: ${COLORS.PRIMARY.SCAMPI_900};
  border-radius: 0.25rem;
  display: flex;
  height: 30px;
  justify-content: center;
  margin-right: 0.5rem;
  width: 30px;

  &:hover {
    background-color: white;
    color: ${COLORS.PRIMARY.SCAMPI_900};
  }
`;

const Footer = () => (
  <div
    css={`
      background-color: ${COLORS.PRIMARY.SCAMPI_900};
      color: ${COLORS.PRIMARY.SCAMPI_100};
      padding: 2rem 1rem;

      ${media.greaterThan('md')`
        padding: 3rem 2rem;
      `}
    `}
  >
    <Container>
      <Row>
        <Col md={4} xs={12}>
          <Logo alt="0x Tracker" src={logoImage} />
          <Description>
            The leading provider of 0x protocol market data, transparent
            Ethereum token price index and 0x protocol news aggregator.
          </Description>
          <nav css="display: flex;">
            <SocialLink href="https://twitter.com/0xTracker">
              <TwitterIcon size="18" />
            </SocialLink>
            <SocialLink href="https://discord.gg/tnV8hud">
              <DiscordIcon size="18" />
            </SocialLink>
          </nav>
        </Col>
        <Col md={{ offset: 2, size: 2 }} sm={4} xs={6}>
          <NavHeading>About</NavHeading>
          <nav>
            <NavLink href="https://docs.0xtracker.com/">Overview</NavLink>
            <NavLink href="https://docs.0xtracker.com/faqs">FAQs</NavLink>
            <NavLink href="https://medium.com/0x-tracker">Blog</NavLink>
            <NavLink href="https://docs.0xtracker.com/#need-to-get-in-touch">
              Contact
            </NavLink>
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
          <NavHeading>Legal</NavHeading>
          <nav>
            <NavLink href="/privacy">Privacy Policy</NavLink>
            <NavLink href="/terms">Terms Of Use</NavLink>
          </nav>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Footer;
