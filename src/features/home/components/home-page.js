import { Col, Row } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD } from '../../../constants';
import { media } from '../../../styles/util';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import ChartsContainer from '../../../components/charts-container';
import Container from '../../../components/container';
import HomePageMetrics from './home-page-metrics';
import getPeriodOptions from '../../../util/get-period-options';
import LatestNewsCard from '../../news/components/latest-news-card';
import NetworkVolume from '../../metrics/components/network-volume';
import RecentFillsCard from '../../fills/components/recent-fills-card';
import TopRelayers from '../../relayers/components/top-relayers';
import TopTokens from '../../tokens/components/top-tokens';

const HomePageColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: ${props => (props.lastRow ? '0' : '1.25rem')};
  }

  ${media.greaterThan('lg')`
    margin-bottom: ${props => (props.lastRow ? '0' : '2rem')};

    &:last-child {
      margin-bottom: ${props => (props.lastRow ? '0' : '2rem')};
    }
  `}
`;

const StyledHomePageMetrics = styled(HomePageMetrics)`
  margin-bottom: 1.25rem;

  ${media.greaterThan('lg')`
    margin-bottom: 2rem;
  `}
`;

const HomePage = () => {
  const breakpoint = useCurrentBreakpoint();

  return (
    <Container>
      <StyledHomePageMetrics />
      <Row>
        <HomePageColumn lg={7}>
          <ChartsContainer
            charts={[
              { component: NetworkVolume, title: 'Fill Volume' },
              {
                component: <NetworkVolume type="fills" />,
                title: 'Fill Count',
              },
            ]}
            defaultPeriod={TIME_PERIOD.YEAR}
            periods={
              breakpoint.greaterThan('xs')
                ? getPeriodOptions([
                    TIME_PERIOD.DAY,
                    TIME_PERIOD.WEEK,
                    TIME_PERIOD.MONTH,
                    TIME_PERIOD.YEAR,
                    TIME_PERIOD.ALL,
                  ])
                : undefined
            }
          />
        </HomePageColumn>
        <HomePageColumn lg={5}>
          <ChartsContainer
            charts={[
              { component: TopTokens, title: 'Top Tokens' },
              { component: TopRelayers, title: 'Top Relayers' },
            ]}
            defaultPeriod={TIME_PERIOD.WEEK}
            periods={
              breakpoint.greaterThan('xs')
                ? getPeriodOptions([
                    TIME_PERIOD.DAY,
                    TIME_PERIOD.WEEK,
                    TIME_PERIOD.MONTH,
                  ])
                : undefined
            }
          />
        </HomePageColumn>
      </Row>
      <Row>
        <HomePageColumn css="flex-grow: 1;" lastRow lg={7}>
          <RecentFillsCard css="flex-grow: 1;" />
        </HomePageColumn>
        <HomePageColumn css="flex-grow: 1;" lastRow lg={5}>
          <LatestNewsCard
            compact={breakpoint.lessThan('sm') || breakpoint.greaterThan('md')}
            css="flex-grow: 1;"
            showImages={breakpoint.greaterThan('xs')}
          />
        </HomePageColumn>
      </Row>
    </Container>
  );
};

export default HomePage;
