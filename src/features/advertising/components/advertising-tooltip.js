import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { ArrowRightIcon } from '../../../components/icons';
import Link from '../../../components/link';
import Tooltip from '../../../components/tooltip';

const LearnMoreLink = styled(Link)`
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const AdvertisingTooltip = ({ children, enabled, ...otherProps }) => {
  if (!enabled) {
    return children;
  }

  return (
    <Tooltip
      content={
        <>
          <p>
            This advertising spot is available for purchase on a fortnightly
            basis through a{' '}
            <Link
              css="text-decoration: underline;"
              href="https://microsponsors.io"
            >
              microsponsors.io
            </Link>{' '}
            on-chain auction.
          </p>
          <LearnMoreLink href="#">
            Learn more
            <ArrowRightIcon css="margin-left: 8px;" size={10} />
          </LearnMoreLink>
        </>
      }
      interactive
      {...otherProps}
    >
      {children}
    </Tooltip>
  );
};

AdvertisingTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool,
};

AdvertisingTooltip.defaultProps = {
  enabled: true,
};

export default AdvertisingTooltip;
