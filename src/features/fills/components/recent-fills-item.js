import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { BASE_CURRENCY } from '../../currencies/constants';
import { DATE_FORMAT } from '../../../constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import buildRelayerUrl from '../../relayers/util/build-relayer-url';
import FillLink from './fill-link';
import FillListAssets from './fill-list-assets';
import formatDate from '../../../util/format-date';
import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';
import RecentFillsItemImage from './recent-fills-item-image';

const StyledRecentFillsItem = styled.div`
  align-items: center;
  background-color: ${(props) =>
    (props.index + 1) % 2 === 0 ? colors.alabaster : 'none'};
  display: flex;
  height: 80px;
  padding: 1rem;
`;

const Metadata = styled.dl`
  color: ${colors.stormGray};
  font-size: 0.9rem;
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
  font-size: 1.1rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${(props) => (props.compact ? 'wrap' : 'nowrap')};
`;

const FillAmount = styled(LocalisedAmount)`
  color: ${colors.violet};
  font-size: 1.2rem;
  font-weight: bold;
`;

const SourceLink = styled(Link)`
  color: currentColor;

  &:hover {
    color: ${colors.violet};
  }
`;

const getSource = (fill) => {
  if (fill.relayer) {
    return {
      label: fill.relayer.name,
      url: buildRelayerUrl(fill.relayer.slug),
    };
  }

  return { label: 'Unknown Relayer', url: buildRelayerUrl('unknown') };
};

const RecentFillsItem = ({ fill, index }) => {
  const breakpoint = useCurrentBreakpoint();
  const source = getSource(fill);

  return (
    <StyledRecentFillsItem index={index}>
      <RecentFillsItemImage fill={fill} />
      <div css="display: flex; flex-direction: column; justify-content: center; flex-grow: 1;">
        <Heading>
          <FillLink fillId={fill.id}>
            <FillListAssets
              assets={_.filter(fill.assets, { traderType: 'maker' })}
            />{' '}
            &#8651;{' '}
            <FillListAssets
              assets={_.filter(fill.assets, { traderType: 'taker' })}
            />
          </FillLink>
        </Heading>
        <Metadata>
          <dt>Relayer</dt>
          <dd>
            {source.url ? (
              <SourceLink href={source.url}>{source.label}</SourceLink>
            ) : (
              source.label
            )}
          </dd>
          <dt>Date</dt>
          <dd>{formatDate(fill.date, DATE_FORMAT.RELATIVE)}</dd>
        </Metadata>
      </div>
      {breakpoint.greaterThan('xs') && _.has(fill, `value.${BASE_CURRENCY}`) ? (
        <FillAmount amount={fill.value[BASE_CURRENCY]} />
      ) : null}
    </StyledRecentFillsItem>
  );
};

RecentFillsItem.propTypes = {
  fill: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecentFillsItem;
