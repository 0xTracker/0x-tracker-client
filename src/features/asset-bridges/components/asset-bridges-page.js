import { Helmet } from 'react-helmet';
import { useSearchParam } from 'react-use';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import { colors } from '../../../styles/constants';
import AssetBridgeList from './asset-bridge-list';
import AssetBridgingStats from './asset-bridging-stats';
import buildUrl from '../../../util/build-url';
import Card from '../../../components/card';
import Hidden from '../../../components/hidden';
import LoadingIndicator from '../../../components/loading-indicator';
import NetworkMetrics from '../../metrics/components/network-metrics';
import PageLayout from '../../../components/page-layout';
import Paginator from '../../../components/paginator';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import TabbedCard from '../../../components/tabbed-card';
import useAssetBridges from '../hooks/use-asset-bridges';
import withPagination from '../../../components/with-pagination';
import HelpWidget from '../../../components/help-widget';

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'in the last 24 hours',
  [TIME_PERIOD.WEEK]: 'in the last week',
  [TIME_PERIOD.MONTH]: 'in the last month',
  [TIME_PERIOD.YEAR]: 'in the last year',
  [TIME_PERIOD.ALL]: 'from all time',
};

const AssetBridgesPage = ({ page, setPage }) => {
  const history = useHistory();
  const statsPeriod = useSearchParam('statsPeriod') || TIME_PERIOD.MONTH;

  const [assetBridges, loadingAssetBridges] = useAssetBridges({
    autoReload: true,
    limit: 25,
    page,
    statsPeriod,
  });

  const { items, pageCount, pageSize, recordCount } = assetBridges;

  return (
    <>
      <Helmet key="relayers">
        <title>Asset Bridges</title>
      </Helmet>
      <PageLayout
        filter={
          <ResponsiveTimePeriodFilter
            name="statsPeriod"
            onChange={(newPeriod) => {
              history.push(
                buildUrl(URL.ASSET_BRIDGES, { statsPeriod: newPeriod }),
              );
            }}
            value={statsPeriod}
          />
        }
        title={
          <span>
            <span css="display: flex; align-items: center;">
              Asset Bridges{' '}
              <HelpWidget css="margin-left: 0.5rem;">
                Information describing what asset bridges are all about.
              </HelpWidget>
            </span>
            <Hidden above="xs">
              <small
                css={`
                  color: ${colors.stormGray};
                  display: block;
                  font-size: 0.9rem;
                  text-transform: lowercase;
                `}
              >
                {periodDescriptions[statsPeriod]}
              </small>
            </Hidden>
          </span>
        }
      >
        <AssetBridgingStats bridgeCount={recordCount} period={statsPeriod} />
        <TabbedCard
          css="height: 330px; margin-bottom: 2rem;"
          tabs={[
            {
              component: (
                <NetworkMetrics period={statsPeriod} type="tradeVolume" />
              ),
              title: 'Bridged Volume',
            },
            {
              component: (
                <NetworkMetrics period={statsPeriod} type="tradeCount" />
              ),
              title: 'Bridged Trades',
            },
          ]}
        />
        <Card fullHeight>
          {loadingAssetBridges ? (
            <LoadingIndicator centered />
          ) : (
            <>
              <AssetBridgeList
                assetBridges={items}
                positionOffset={(page - 1) * pageSize}
                statsPeriod={statsPeriod}
              />
              <Paginator
                onPageChange={setPage}
                page={page}
                pageCount={pageCount}
                pageSize={pageSize}
                recordCount={recordCount}
              />
            </>
          )}
        </Card>
      </PageLayout>
    </>
  );
};

AssetBridgesPage.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default withPagination(AssetBridgesPage);
