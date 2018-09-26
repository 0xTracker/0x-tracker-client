import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import ContentSection from './content-section';
import Link from './link';

const styles = StyleSheet.create({
  gif: {
    marginTop: '3em',
  },
  wrapper: {
    margin: '0 auto',
    maxWidth: '700px',
    textAlign: 'center',
  },
});

const PageNotFound = () => (
  <ContentSection verticallyCentered>
    <div className={css(styles.wrapper)}>
      <h1>Page Not Found</h1>
      <p className="lead">
        Oops, you&lsquo;ve tried to load a page that doesn&lsquo;t exist. You
        could <Link href="/">go to the homepage</Link> or just hang out and
        watch this gif...
      </p>
      <img className={css(styles.gif)} src="https://i.imgur.com/ypDhkX8.gif" />
    </div>
  </ContentSection>
);

export default PageNotFound;
