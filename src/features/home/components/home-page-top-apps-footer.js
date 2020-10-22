import PropTypes from 'prop-types';
import React from 'react';

import { verbosePeriod } from '../../../util';
import Footnote from '../../../components/footnote';

const HomePageTopAppsFooter = ({ period }) => (
  <Footnote>top apps by {verbosePeriod(period)} volume</Footnote>
);

HomePageTopAppsFooter.propTypes = {
  period: PropTypes.string.isRequired,
};

export default HomePageTopAppsFooter;
