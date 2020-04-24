import PropTypes from 'prop-types';
import React from 'react';

import { verbosePeriod } from '../../../util';
import Footnote from '../../../components/footnote';

const HomePageTopTokensFooter = ({ period }) => (
  <Footnote>{verbosePeriod(period)} top tokens by volume</Footnote>
);

HomePageTopTokensFooter.propTypes = {
  period: PropTypes.string.isRequired,
};

export default HomePageTopTokensFooter;
