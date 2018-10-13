import { getYear } from 'date-fns';
import { Col, Row } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import Container from './container';
import Link from './link';

const StyledFooter = styled.div`
  background: ${colors.tuna};
  color: ${colors.silver};
  padding: 30px;
`;

const FooterLink = styled(Link)`
  color: ${colors.white};
  text-decoration: none;

  &:hover {
    color: ${colors.white};
    text-decoration: underline;
  }
`;

const Footer = () => (
  <StyledFooter>
    <Container>
      <Row>
        <Col xs={6}>Copyright &copy; 0x Tracker {getYear(new Date())}</Col>
        <Col className="text-right" xs={6}>
          Built by{' '}
          <FooterLink href="https://github.com/cbovis">@cbovis</FooterLink> in
          Melbourne Australia 🐨
        </Col>
      </Row>
    </Container>
  </StyledFooter>
);

export default Footer;
