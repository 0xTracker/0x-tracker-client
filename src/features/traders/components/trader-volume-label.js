import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Tooltip from '../../../components/tooltip';

const EmptyValue = styled.span`
  color: ${COLORS.NEUTRAL.MYSTIC_400};
`;

const TraderVolumeLabel = ({ volume }) => {
  if (volume.total === 0) {
    return <EmptyValue>none</EmptyValue>;
  }

  if (volume.maker === 0 || volume.taker === 0) {
    return <LocalisedAmount amount={volume.total} summarize />;
  }

  return (
    <Tooltip
      content={
        <dl>
          <div>
            <dt css="width: 50px;">Maker:</dt>
            <dd>
              <LocalisedAmount amount={volume.maker} summarize />
            </dd>
          </div>
          <div>
            <dt css="width: 50px;">Taker:</dt>
            <dd>
              <LocalisedAmount amount={volume.taker} summarize />
            </dd>
          </div>
        </dl>
      }
    >
      <span>
        <LocalisedAmount amount={volume.total} summarize title={false} />
      </span>
    </Tooltip>
  );
};

TraderVolumeLabel.propTypes = {
  volume: PropTypes.shape({
    maker: PropTypes.number.isRequired,
    taker: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default TraderVolumeLabel;
