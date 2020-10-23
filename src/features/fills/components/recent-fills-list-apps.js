import PropTypes from 'prop-types';
import React from 'react';

import AppLink from '../../apps/components/app-link';

const RecentFillsListApps = ({ apps }) => {
  if (apps.length === 0) {
    return 'None';
  }

  return apps.map((app, index) => (
    <>
      <AppLink urlSlug={app.urlSlug}>{app.name}</AppLink>
      {index !== apps.length - 1 && ' + '}
    </>
  ));
};

RecentFillsListApps.propTypes = {
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      urlSlug: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default RecentFillsListApps;
