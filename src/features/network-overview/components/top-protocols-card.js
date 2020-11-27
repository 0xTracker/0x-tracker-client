import React from 'react';

import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import sharedPropTypes from '../../../prop-types';
import TopProtocols from './top-protocols';
import DropdownPill from '../../../components/dropdown-pill';

const TopProtocolsCard = ({ period }) => {
  const [sortBy, setSortBy] = React.useState('fillVolume');

  return (
    <Card css="height: 360px;">
      <CardHeader>
        <CardHeading>Protocol Share</CardHeading>
        <DropdownPill
          onChange={setSortBy}
          options={[
            { label: 'By Trades', value: 'fillCount' },
            { label: 'By Volume', value: 'fillVolume' },
          ]}
          value={sortBy}
        />
      </CardHeader>
      <CardBody css="padding: 2rem;">
        <TopProtocols period={period} sortBy={sortBy} />
      </CardBody>
    </Card>
  );
};

TopProtocolsCard.propTypes = {
  period: sharedPropTypes.timePeriod,
};

TopProtocolsCard.defaultProps = {
  period: undefined,
};

export default TopProtocolsCard;
