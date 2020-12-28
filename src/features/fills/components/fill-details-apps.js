import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import AppLink from '../../apps/components/app-link';
import AppLogo from '../../apps/components/app-logo';
import Badge from '../../../components/badge';
import { ConsumerIcon, RelayerIcon } from '../../../components/icons';

const FillDetailsApps = ({ apps }) => {
  if (apps.length === 0) {
    return 'None';
  }

  return (
    <div css="display: flex; flex-direction: column;">
      {apps.map((app) => (
        <div
          css={`
            align-items: center;
            display: flex;
            margin-bottom: 0.75rem;

            &:last-child {
              margin-bottom: 0;
            }
          `}
          key={app.id}
        >
          <AppLink
            css={`
              color: ${COLORS.PRIMARY.SCAMPI_500};
              display: flex;
              align-items: center;
            `}
            urlSlug={app.urlSlug}
          >
            <AppLogo
              css="margin-right: 8px"
              height={20}
              imageUrl={app.logoUrl}
              width={20}
            />
            {app.name}
          </AppLink>
          <Badge
            css="align-items: center; display: flex; margin-left: 16px"
            upperCase={false}
          >
            {app.type === 'relayer' && (
              <RelayerIcon css="margin-right: 4px" size={14} />
            )}
            {app.type === 'consumer' && (
              <ConsumerIcon css="margin-right: 4px" size={14} />
            )}
            {_.startCase(_.lowerCase(app.type))}
          </Badge>
        </div>
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
