import { StyleSheet, css } from 'aphrodite';
import { getYear } from 'date-fns';
import React from 'react';

import Container from './container';
import Link from './link';

const styles = StyleSheet.create({
  container: {
    background: '#4e4e4e',
    color: '#c3c1c1',
    padding: '30px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
});

const Footer = () => (
  <footer className={css(styles.container)}>
    <Container>
      <div className="row">
        <div className="col-6">
          Copyright &copy; 0x Tracker {getYear(new Date())}
        </div>
        <div className="col-6 text-right">
          Built by{' '}
          <Link className={css(styles.link)} href="https://github.com/cbovis">
            @cbovis
          </Link>{' '}
          in Melbourne Australia 🐨
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
