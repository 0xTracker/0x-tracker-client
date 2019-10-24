import { Ghost } from 'react-kawaii';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import { media } from '../styles/util';
import Link from './link';
import useBreakpoint from '../hooks/use-breakpoint';

const StyledErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px;
  min-height: 100%;
  text-align: center;

  ${media.greaterThan('md')`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  `}
`;

const CopyWrapper = styled.div`
  order: 2;

  ${media.greaterThan('md')`
    margin: 0;
    order: 1;
    padding: 0 4rem 0 0;
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

const INITIAL_MOOD = 'ko';

const ErrorMessage = ({ children, className }) => {
  const [mood, setMood] = useState(INITIAL_MOOD);
  const breakpoint = useBreakpoint();

  return (
    <StyledErrorMessage className={className}>
      <CopyWrapper>{children}</CopyWrapper>
      <GhostLink
        href="https://react-kawaii.now.sh/"
        onMouseOut={() => setMood(INITIAL_MOOD)}
        onMouseOver={() => setMood('blissful')}
      >
        <Ghost
          color={colors.mischka}
          mood={mood}
          size={breakpoint.greaterThan('sm') ? 240 : 150}
        />
      </GhostLink>
    </StyledErrorMessage>
  );
};

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ErrorMessage.defaultProps = {
  className: undefined,
};

export default ErrorMessage;
