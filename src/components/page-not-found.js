import React from 'react';
import styled from 'styled-components';

import ContentSection from './content-section';
import Link from './link';

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  text-align: center;
`;

const Animation = styled.img.attrs({ src: 'https://i.imgur.com/ypDhkX8.gif' })`
  margin-top: 3em;
`;

const PageNotFound = () => (
  <ContentSection verticallyCentered>
    <PageWrapper>
      <h1>Page Not Found</h1>
      <p className="lead">
        Oops, you&lsquo;ve tried to load a page that doesn&lsquo;t exist. You
        could <Link href="/">go to the homepage</Link> or just hang out and
        watch this gif...
      </p>
      <Animation />
    </PageWrapper>
  </ContentSection>
);

export default PageNotFound;
