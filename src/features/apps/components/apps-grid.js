import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import AppsGridItem from './apps-grid-item';
import appsPropTypes from '../prop-types';
import sharedPropTypes from '../../../prop-types';

const Wrapper = styled.div`
  display: grid;
  gap: 1.25rem 1.25rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
`;

const AppsGrid = ({ apps, statsPeriod }) => (
  <Wrapper>
    {apps.map((app) => (
      <AppsGridItem app={app} key={app.urlSlug} statsPeriod={statsPeriod} />
    ))}
  </Wrapper>
);

AppsGrid.propTypes = {
  apps: PropTypes.arrayOf(appsPropTypes.appWithStats.isRequired).isRequired,
  statsPeriod: sharedPropTypes.timePeriod.isRequired,
};

export default AppsGrid;
