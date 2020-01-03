import { Col, Row } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import { colors } from '../styles/constants';
import Container from './container';
import Link from './link';
import logoImage from '../assets/images/logo-grayscale.svg';

const Logo = styled.img`
  height: 2.25rem;
`;

const NavHeading = styled.h2`
  color: ${colors.white};
  font-size: 1.1rem;
  margin: 2rem 0 1rem 0;

  ${media.greaterThan('md')`
    margin: 0 0 1rem 0;
  `}
`;

const Description = styled.p`
  margin: 1rem 0 1.5rem;

  ${media.greaterThan('md')`
    margin: 1rem 0 0;
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

const Footer = () => (
  <div
    css={`
      background: ${colors.steelGray};
      color: ${colors.santasGray};
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
            The 0x protocol trade explorer, decentralised price index and news
            aggregator.
          </Description>
        </Col>
        <Col md={{ offset: 3, size: 2 }} sm={4} xs={6}>
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
        <Col md={1} sm={4} xs={6}>
          <NavHeading>Social</NavHeading>
          <nav>
            <NavLink href="https://twitter.com/0xTracker">Twitter</NavLink>
            <NavLink href="https://discord.gg/tnV8hud">Discord</NavLink>
          </nav>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Footer;
