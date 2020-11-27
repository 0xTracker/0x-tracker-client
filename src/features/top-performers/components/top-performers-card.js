import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { prettyPeriod } from '../../../util';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import DropdownPill from '../../../components/dropdown-pill';
import TopApps from '../../apps/components/top-apps';
import TopAssetBridges from '../../asset-bridges/components/top-asset-bridges';
import TopTokens from '../../tokens/components/top-tokens';
import TopTraders from '../../traders/components/top-traders';
import { TIME_PERIOD } from '../../../constants';
import {
  AppsIcon,
  AssetBridgeIcon,
  MakersIcon,
  TakersIcon,
  TokensIcon,
  TradersIcon,
} from '../../../components/icons';

const TopPerformersCard = ({
  canTogglePeriod,
  initialPeriod,
  ...otherProps
}) => {
  const [type, setType] = React.useState('apps');
  const [period, setPeriod] = React.useState(initialPeriod);

  React.useEffect(() => {
    setPeriod(initialPeriod);
  }, [initialPeriod]);

  return (
    <Card
      errorMessage={`An error occurred while loading the top performing ${type}`}
      {...otherProps}
    >
      <CardHeader>
        <CardHeading>Top Performers</CardHeading>
        <div css="display: flex;">
          <DropdownPill
            onChange={setType}
            options={[
              {
                icon: <AppsIcon size={16} />,
                label: 'Apps',
                value: 'apps',
              },
              {
                icon: <AssetBridgeIcon size={16} />,
                label: 'Asset Bridges',
                value: 'asset-bridges',
              },
              {
                icon: <MakersIcon size={16} />,
                label: 'Makers',
                value: 'makers',
              },
              {
                icon: <TakersIcon size={16} />,
                label: 'Takers',
                value: 'takers',
              },
              {
                icon: <TokensIcon size={16} />,
                label: 'Tokens',
                value: 'tokens',
              },
              {
                icon: <TradersIcon size={16} />,
                label: 'Traders',
                value: 'traders',
              },
            ]}
            value={type}
          />
          {canTogglePeriod && (
            <DropdownPill
              css="margin-left: 0.5rem;"
              onChange={setPeriod}
              options={_.values(TIME_PERIOD).map((p) => ({
                label: prettyPeriod(p),
                value: p,
              }))}
              value={period}
            />
          )}
        </div>
      </CardHeader>
      <CardBody>
        {type === 'apps' && <TopApps period={period} />}
        {type === 'tokens' && <TopTokens period={period} />}
        {type === 'traders' && <TopTraders period={period} />}
        {type === 'makers' && <TopTraders period={period} type="maker" />}
        {type === 'takers' && <TopTraders period={period} type="taker" />}
        {type === 'asset-bridges' && <TopAssetBridges period={period} />}
      </CardBody>
    </Card>
  );
};

TopPerformersCard.propTypes = {
  canTogglePeriod: PropTypes.bool,
  initialPeriod: PropTypes.string.isRequired,
};

TopPerformersCard.defaultProps = {
  canTogglePeriod: true,
};

export default TopPerformersCard;
