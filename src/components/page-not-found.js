import { Ghost } from 'react-kawaii';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import { media } from '../styles/util';
import ContentSection from './content-section';
import Link from './link';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  margin: 0 auto;
  max-width: 800px;
  text-align: center;

  ${media.greaterThan('md')`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  `}
`;

const CopyWrapper = styled.div`
  margin: 0 1rem;
  order: 2;

  ${media.greaterThan('md')`
    margin: 0;
    order: 1;
  `}
`;

const GhostLink = styled(Link)`
  margin: 0 0 2rem 0;
  order: 1;

  ${media.greaterThan('md')`
    margin: 0;
    order: 2;
  `}
`;

const Heading = styled.h1`
  font-size: 1.6em;

  ${media.greaterThan('md')`
    font-size: 2em;
  `}
`;

const Message = styled.p`
  font-size: 1.1em;
  margin: 0 0 2rem 0;

  ${media.greaterThan('md')`
    font-size: 1.3em;
  `}
`;

const INITIAL_MOOD = 'ko';

const PageNotFound = ({ screenSize }) => {
  const [mood, setMood] = useState(INITIAL_MOOD);

  return (
    <ContentSection verticallyCentered>
      <PageWrapper>
        <CopyWrapper>
          <Heading>Page Not Found</Heading>
          <Message>
            Oops, you&lsquo;ve tried to load a page that doesn&lsquo;t exist.
          </Message>
          <Link href="/">Back to Dashboard</Link>
        </CopyWrapper>
        <GhostLink
          href="https://react-kawaii.now.sh/"
          onMouseOut={() => setMood(INITIAL_MOOD)}
          onMouseOver={() => setMood('blissful')}
        >
          <Ghost
            color={colors.mischka}
            mood={mood}
            size={screenSize.greaterThan.sm ? 240 : 150}
          />
        </GhostLink>
      </PageWrapper>
    </ContentSection>
  );
};

PageNotFound.propTypes = {
  screenSize: PropTypes.shape({
    greaterThan: PropTypes.shape({
      sm: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  screenSize: state.screen,
});

export default connect(mapStateToProps)(PageNotFound);
