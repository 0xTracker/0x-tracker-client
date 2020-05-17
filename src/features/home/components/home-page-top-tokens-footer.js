import PropTypes from 'prop-types';
import React from 'react';

import { verbosePeriod } from '../../../util';
import Footnote from '../../../components/footnote';

const HomePageTopTokensFooter = ({ period }) => (
  <Footnote>top tokens by {verbosePeriod(period)} volume</Footnote>
);

HomePageTopTokensFooter.propTypes = {
  period: PropTypes.string.isRequired,
};

export default HomePageTopTokensFooter;
