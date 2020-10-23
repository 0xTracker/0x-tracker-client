import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import AppLink from '../../apps/components/app-link';
import AppLogo from '../../apps/components/app-logo';

const FillListApps = ({ apps }) => {
  if (apps.length === 0) {
    return 'None';
  }

  return (
    <div css="display: flex;">
      {apps.map((app, index) => (
        <>
          <AppLink
            css="display: flex; align-items: center;"
            urlSlug={app.urlSlug}
          >
            <AppLogo
              css="margin-right: 0.5rem;"
              height={20}
              imageUrl={app.logoUrl}
              width={20}
            />
            {app.name}
          </AppLink>
          {index !== apps.length - 1 && (
            <span
              css={`
                color: ${COLORS.NEUTRAL.MYSTIC_600};
                font-weight: 500;
                font-size: 1.2rem;
                margin: 0 1rem;
              `}
            >
              +
            </span>
          )}
        </>
      ))}
    </div>
  );
};

FillListApps.propTypes = {
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      logoUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      urlSlug: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default FillListApps;
