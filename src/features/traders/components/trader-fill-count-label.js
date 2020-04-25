import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import Number from '../../../components/number';
import Tooltip from '../../../components/tooltip';

const EmptyValue = styled.span`
  color: ${COLORS.NEUTRAL.MYSTIC_400};
`;

const TraderFillCountLabel = ({ children }) => {
  if (children.total === 0) {
    return <EmptyValue>none</EmptyValue>;
  }

  if (children.maker === 0 || children.taker === 0) {
    return <Number summarize>{children.total}</Number>;
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
        </dl>
      }
    >
      <span>
        <Number summarize title={false}>
          {children.total}
        </Number>
      </span>
    </Tooltip>
  );
};

TraderFillCountLabel.propTypes = {
  children: PropTypes.shape({
    maker: PropTypes.number.isRequired,
    taker: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default TraderFillCountLabel;
