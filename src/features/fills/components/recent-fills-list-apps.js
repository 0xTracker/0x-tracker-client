import PropTypes from 'prop-types';
import React from 'react';

const RecentFillsListApps = ({ apps }) =>
  apps.map((app, index) => (
    <React.Fragment key={app.id}>
      {app.name}
      {index !== apps.length - 1 && ' + '}
    </React.Fragment>
  ));

RecentFillsListApps.propTypes = {
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default RecentFillsListApps;
