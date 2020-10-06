import PropTypes from 'prop-types';
import React from 'react';

import { verbosePeriod } from '../../../util';
import Footnote from '../../../components/footnote';

const HomePageTopRelayersFooter = ({ period }) => (
  <Footnote>top apps by {verbosePeriod(period)} volume</Footnote>
);

HomePageTopRelayersFooter.propTypes = {
  period: PropTypes.string.isRequired,
};

export default HomePageTopRelayersFooter;
