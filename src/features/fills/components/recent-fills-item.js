import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { BASE_CURRENCY } from '../../currencies/constants';
import { DATE_FORMAT } from '../../../constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import FillLink from './fill-link';
import formatDate from '../../../util/format-date';
import LocalisedAmount from '../../currencies/components/localised-amount';
import RecentFillsItemAssets from './recent-fills-item-assets';
import RecentFillsItemImage from './recent-fills-item-image';
import RecentFillsListApps from './recent-fills-list-apps';

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) =>
    (props.index + 1) % 2 === 0 ? COLORS.NEUTRAL.MYSTIC_100 : 'none'};
  display: flex;
  flex-grow: 1;
  height: 80px;
  padding: 1rem;
`;

const Metadata = styled.dl`
  color: ${COLORS.NEUTRAL.MYSTIC_700};
  font-size: 14px;
  margin: 0;

  dt {
    display: none;
  }

  dd {
    display: inline-block;
    margin: 0;
    vertical-align: middle;

    &::after {
      content: '';
      border-radius: 50%;
      width: 0.25rem;
      height: 0.25rem;
      background-color: currentColor;
      display: inline-block;
      vertical-align: middle;
      margin: 0 0.5rem;
    }

    &:last-child {
      &::after {
        display: none;
      }
    }
  }
`;

const Heading = styled.h4`
  font-size: 1rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${(props) => (props.compact ? 'wrap' : 'nowrap')};
`;

const FillAmount = styled(LocalisedAmount)`
  color: inherit;
  font-size: 18px;
  font-weight: 600;
`;

const RecentFillsItem = ({ fill, index }) => {
  const breakpoint = useCurrentBreakpoint();
  const makerAssets = _.filter(fill.assets, { traderType: 'maker' });
  const takerAssets = _.filter(fill.assets, { traderType: 'taker' });

  return (
    <Wrapper index={index}>
      <RecentFillsItemImage assets={fill.assets} css="margin-right: 16px;" />
      <div css="display: flex; flex-direction: column; justify-content: center; flex-grow: 1;">
        <Heading>
          <FillLink fillId={fill.id}>
            <RecentFillsItemAssets assets={makerAssets} /> &#8651;{' '}
            <RecentFillsItemAssets assets={takerAssets} />
          </FillLink>
        </Heading>
        <Metadata>
          {fill.apps.length > 0 && (
            <>
              <dt>Apps</dt>
              <dd>
                <RecentFillsListApps apps={fill.apps} />
              </dd>
            </>
          )}
          <dt>Date</dt>
          <dd>{formatDate(fill.date, DATE_FORMAT.RELATIVE)}</dd>
        </Metadata>
      </div>
      {breakpoint.greaterThan('xs') && _.has(fill, `value.${BASE_CURRENCY}`) ? (
        <FillAmount amount={fill.value[BASE_CURRENCY]} />
      ) : null}
    </Wrapper>
  );
};

RecentFillsItem.propTypes = {
  fill: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecentFillsItem;
