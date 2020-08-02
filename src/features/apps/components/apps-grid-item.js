import { useMeasure } from 'react-use';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { prettyPeriod } from '../../../util';
import appsPropTypes from '../prop-types';
import Badge from '../../../components/badge';
import Card from '../../../components/card';
import LocalisedAmount from '../../currencies/components/localised-amount';
import MiniAppMetrics from './mini-app-metrics';
import Number from '../../../components/number';
import sharedPropTypes from '../../../prop-types';

const Header = styled.div`
  align-items: center;
  background-color: ${COLORS.NEUTRAL.MYSTIC_100};
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  position: relative;
`;

const Logo = styled.img`
  border-radius: 0.25rem;
  height: 50px;
  width: 50px;
  z-index: 5;
`;

const ChartWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px 0 0 0;
`;

const HeadingWrapper = styled.div`
  z-index: 5;
`;

const Heading = styled.h2`
  font-size: 1.3rem;
  margin: 0 0 0.1rem;
`;

const CategoryBadge = styled(Badge)`
  color: ${COLORS.NEUTRAL.MYSTIC_800};
  margin-right: 0.5rem;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex-grow: 1;
`;

const Description = styled.p`
  color: ${COLORS.NEUTRAL.MYSTIC_700};
  flex-grow: 1;
  padding: 0;
  margin: 0 0 1.5rem;
`;

const Stats = styled.dl`
  border-radius: 1px;
  display: flex;
  padding: 0;
  margin: 0;
`;

const Stat = styled.div`
  margin-right: 2rem;
`;

const StatTitle = styled.dt`
  color: ${COLORS.NEUTRAL.MYSTIC_600};
  text-transform: uppercase;
  font-size: 0.8rem;
`;

const StatValue = styled.dd`
  margin: 0;
  font-size: 1.1rem;
  font-weight: bold;
`;

const AppsGridItem = ({ app, statsPeriod }) => {
  const [chartContainer, { width, height }] = useMeasure();
  const shortPeriod = prettyPeriod(statsPeriod);

  return (
    <Card css="height: 100%; flex-grow: 1;">
      <Header ref={chartContainer}>
        <ChartWrapper>
          <MiniAppMetrics
            app={app.urlSlug}
            height={height + 22}
            period={statsPeriod}
            width={width + 30}
          />
        </ChartWrapper>
        <HeadingWrapper>
          <Heading>{app.name}</Heading>
          {app.categories.map((category) => (
            <CategoryBadge key={category}>{category}</CategoryBadge>
          ))}
        </HeadingWrapper>
        <Logo src={app.logoUrl} />
      </Header>
      <Body>
        <Description>{app.description}</Description>
        <Stats>
          <Stat>
            <StatTitle>Volume ({shortPeriod})</StatTitle>
            <StatValue>
              <LocalisedAmount amount={app.stats.totalVolume} summarize />
            </StatValue>
          </Stat>
          <Stat>
            <StatTitle>Trades ({shortPeriod})</StatTitle>
            <StatValue>
              <Number summarize>{app.stats.totalTrades}</Number>
            </StatValue>
          </Stat>
        </Stats>
      </Body>
    </Card>
  );
};

AppsGridItem.propTypes = {
  app: appsPropTypes.appWithStats.isRequired,
  statsPeriod: sharedPropTypes.timePeriod.isRequired,
};

export default AppsGridItem;
