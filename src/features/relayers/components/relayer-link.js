import PropTypes from 'prop-types';
import React from 'react';

import buildRelayerUrl from '../util/build-relayer-url';
import Link from '../../../components/link';

const RelayerLink = ({ children, className, relayer }) => (
  <Link className={className} href={buildRelayerUrl(relayer)}>
    {children}
  </Link>
);

RelayerLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  relayer: PropTypes.string.isRequired,
};

RelayerLink.defaultProps = {
  children: undefined,
  className: undefined,
};

export default RelayerLink;
