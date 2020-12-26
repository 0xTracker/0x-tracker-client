import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { BASE_CURRENCY } from '../../currencies/constants';
import { DATE_FORMAT } from '../../../constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import formatDate from '../../../util/format-date';
import LocalisedAmount from '../../currencies/components/localised-amount';
import RecentFillsItemAssets from './recent-fills-item-assets';
import RecentFillsItemImage from './recent-fills-item-image';
import RecentFillsListApps from './recent-fills-list-apps';
import EntityListItem from '../../../components/entity-list-item';
import buildFillUrl from '../util/build-fill-url';

const FillAmount = styled(LocalisedAmount)`
  color: inherit;
  font-size: 18px;
  font-weight: 600;
  margin-left: 2rem;
`;

const RecentFillsItem = ({ fill }) => {
  const breakpoint = useCurrentBreakpoint();
  const makerAssets = _.filter(fill.assets, { traderType: 'maker' });
  const takerAssets = _.filter(fill.assets, { traderType: 'taker' });

  return (
    <EntityListItem
      complement={
        breakpoint.greaterThan('xs') &&
        (!fill.value[BASE_CURRENCY] ? (
          '-'
        ) : (
          <FillAmount amount={fill.value[BASE_CURRENCY]} />
        ))
      }
      image={<RecentFillsItemImage assets={fill.assets} />}
      metadata={_.compact([
        {
          label: 'Date',
          value: formatDate(fill.date, DATE_FORMAT.RELATIVE),
        },
        breakpoint.lessThan('sm') && {
          label: 'Value',
          value: (
            <LocalisedAmount amount={fill.value[BASE_CURRENCY]} summarize />
          ),
        },
        fill.apps.length > 0 && {
          label: 'Apps',
          value: (
            <>
              via <RecentFillsListApps apps={fill.apps} />
            </>
          ),
        },
      ])}
      title={
        <>
          <RecentFillsItemAssets assets={makerAssets} /> &#8651;{' '}
          <RecentFillsItemAssets assets={takerAssets} />
        </>
      }
      url={buildFillUrl(fill.id)}
    />
  );
};

RecentFillsItem.propTypes = {
  fill: PropTypes.object.isRequired,
};

export default RecentFillsItem;
