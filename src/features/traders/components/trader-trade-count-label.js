import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import Number from '../../../components/number';
import Tooltip from '../../../components/tooltip';

const EmptyValue = styled.span`
  color: ${COLORS.NEUTRAL.MYSTIC_500};
`;

const getDisplayValue = (tradeCount, statsType) => {
  if (statsType === 'maker') {
    return tradeCount.maker;
  }

  if (statsType === 'taker') {
    return tradeCount.taker;
  }

  return tradeCount.total;
};

const TraderTradeCountLabel = ({ children, statsType }) => {
  const displayValue = getDisplayValue(children, statsType);

  if (children.total === 0) {
    return <EmptyValue>none</EmptyValue>;
  }

  if (children.maker === 0 || children.taker === 0) {
    return <Number summarize>{displayValue}</Number>;
  }

  return (
    <Tooltip
      content={
        <dl>
          <div>
            <dt css="width: 50px;">Maker:</dt>
            <dd>
              <Number summarize>{children.maker}</Number>
            </dd>
          </div>
          <div>
            <dt css="width: 50px;">Taker:</dt>
            <dd>
              <Number summarize>{children.taker}</Number>
            </dd>
          </div>
          <div>
            <dt css="width: 50px;">Total:</dt>
            <dd>
              <Number summarize>{children.total}</Number>
            </dd>
          </div>
        </dl>
      }
    >
      <span>
        <Number summarize title={false}>
          {displayValue}
        </Number>
      </span>
    </Tooltip>
  );
};

TraderTradeCountLabel.propTypes = {
  children: PropTypes.shape({
    maker: PropTypes.number.isRequired,
    taker: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  statsType: PropTypes.string.isRequired,
};

export default TraderTradeCountLabel;
