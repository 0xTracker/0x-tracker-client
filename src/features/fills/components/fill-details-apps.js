import PropTypes from 'prop-types';
import React from 'react';

import AppLink from '../../apps/components/app-link';
import AppLogo from '../../apps/components/app-logo';
import Badge from '../../../components/badge';

const FillDetailsApps = ({ apps }) => {
  if (apps.length === 0) {
    return 'None';
  }

  return (
    <div css="display: flex; flex-direction: column;">
      {apps.map((app) => (
        <AppLink
          css={`
            display: flex;
            align-items: center;
            margin-bottom: 1rem;

            &:last-child {
              margin-bottom: 0;
            }
          `}
          key={app.id}
          urlSlug={app.urlSlug}
        >
          <AppLogo
            css="margin-right: 0.5rem;"
            height={20}
            imageUrl={app.logoUrl}
            width={20}
          />
          {app.name}
          <Badge css="margin-left: 0.75rem;">{app.type}</Badge>
        </AppLink>
      ))}
    </div>
  );
};

FillDetailsApps.propTypes = {
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      logoUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      urlSlug: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default FillDetailsApps;
