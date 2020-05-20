import _ from 'lodash';
import { useParams } from 'react-router';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD } from '../../../constants';
import { useMetadata, usePaginator } from '../../../hooks';
import { EtherscanIcon } from '../../../components/icons';
import { COLORS } from '../../../styles/constants';
import { media } from '../../../styles/util';
import { truncateAddress } from '../../../util';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import AddressMetrics from '../../metrics/components/address-metrics';
import Blockie from '../../../components/blockie';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import Link from '../../../components/link';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import SubTitle from '../../../components/sub-title';
import useTrader from '../hooks/use-trader';
import Visible from '../../../components/visible';

const ActionLink = styled(Link)`
  align-items: center;
  background-color: ${COLORS.NEUTRAL.MYSTIC_300};
  border-radius: 4px;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  height: 35px;
  padding: 0 8px;

  &:hover {
    background-color: ${COLORS.NEUTRAL.MYSTIC_400};
  }

  ${media.greaterThan('sm')`
    padding: 0 16px;
  `}
`;

const truncateName = (name, breakpoint) => {
  if (breakpoint.greaterThan('md')) {
    return _.truncate(name, { length: 85 });
  }

  if (breakpoint.greaterThan('sm')) {
    return _.truncate(name, { length: 60 });
  }

  if (breakpoint.greaterThan('xs')) {
    return _.truncate(name, { length: 55 });
  }

  return _.truncate(name, { length: 25 });
};

const TraderPage = () => {
  const { address } = useParams();
  const { page, setPage } = usePaginator();
  const [trader, loadingTrader] = useTrader(address);
  const breakpoint = useCurrentBreakpoint();

  useMetadata({
    title: `0x Trading Activity for ${
      trader === undefined || trader.name === null ? address : trader.name
    }`,
  });

  if (loadingTrader) {
    return <LoadingPage />;
  }

  return (
    <PageLayout
      filter={
        <ActionLink href={`https://etherscan.io/address/${address}`}>
          <EtherscanIcon
            css={`
              ${media.greaterThan('md')`
                margin-right: 8px;
              `}
            `}
            size={19}
          />
          <Visible above="sm">View on Etherscan</Visible>
        </ActionLink>
      }
      title={
        <div css="display: flex; align-items: center;">
          <Blockie
            css="border-radius: 0.25rem; margin-right: 0.75rem;"
            seed={address}
            size="35px"
          />
          <div>
            {_.isString(trader.name)
              ? truncateName(trader.name, breakpoint)
              : 'Unknown Trader'}
            <SubTitle>
              {breakpoint.greaterThan('xs')
                ? trader.address
                : truncateAddress(trader.address, 25)}
            </SubTitle>
          </div>
        </div>
      }
    >
      <CardGrid>
        <CardGridRow>
          <CardGridCol>
            <ChartsContainer
              charts={[
                {
                  component: <AddressMetrics address={address} />,
                  title: 'Volume',
                },
                {
                  component: (
                    <AddressMetrics address={address} keyMetric="tradeCount" />
                  ),
                  title: 'Trades',
                },
              ]}
              defaultPeriod={TIME_PERIOD.MONTH}
              periods={[
                { label: '24H', value: TIME_PERIOD.DAY },
                { label: '7D', value: TIME_PERIOD.WEEK },
                { label: '1M', value: TIME_PERIOD.MONTH },
                { label: '1Y', value: TIME_PERIOD.YEAR },
                { label: 'ALL', value: TIME_PERIOD.ALL },
              ]}
            />
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol>
            <Card>
              <CardBody>
                <Fills
                  filter={{ address }}
                  onPageChange={setPage}
                  page={page}
                />
              </CardBody>
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default TraderPage;
