import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import buildTokenUrl from '../util/build-token-url';
import Link from '../../../components/link';

const TokenLink = ({ token }) => (
  <Link href={buildTokenUrl(token)}>
    {_.isString(token.name) ? token.name : token.address}
  </Link>
);

TokenLink.propTypes = {
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
};

export default TokenLink;
