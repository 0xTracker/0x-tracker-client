import _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import buildTokenUrl from '../util/build-token-url';

const TokenLink = ({ token }) => (
  <Link to={buildTokenUrl(token)}>
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
