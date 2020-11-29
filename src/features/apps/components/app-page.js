import { useParams } from 'react-router';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { ExternalLinkIcon } from '../../../components/icons';
import { getPeriodDescriptor } from '../../../util';
import { media } from '../../../styles/util';
import { TIME_PERIOD } from '../../../constants';
import { useMetadata, useNavigator, useSearchParam } from '../../../hooks';
import AppLogo from './app-logo';
import AppStats from './app-stats';
import AppTokensCard from './app-tokens-card';
import buildAppUrl from '../util/build-app-url';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import Link from '../../../components/link';
import LoadingPage from '../../../components/loading-page';
import MobileTimePeriodFilter from '../../../components/mobile-time-period-filter';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import RecentFillsCard from '../../fills/components/recent-fills-card';
import RelatedAppsCard from './related-apps-card';
import useApp from '../hooks/use-app';
import Visible from '../../../components/visible';
import AppChartsCard from './app-charts-card';

const ActionLink = styled(Link)`
  align-items: center;
  background-color: ${COLORS.NEUTRAL.MYSTIC_100};
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2);
  display: flex;
  font-size: 14px;
  font-weight: 500;
  height: 38px;
  padding: 0 8px;

  &:hover {
    box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.4);
  }

  ${media.greaterThan('sm')`
    padding: 0 16px;
  `}
`;

const AppPage = () => {
  const { slug } = useParams();
  const { navigateTo } = useNavigator();
  const statsPeriod = useSearchParam('statsPeriod', TIME_PERIOD.MONTH);
  const [app, loading] = useApp(slug, { statsPeriod });

  useMetadata({
    title:
      app === undefined
        ? undefined
        : `${app.name} Trading Activity, Metrics & Charts`,
  });

  if (loading) {
    return <LoadingPage />;
  }

  if (app === undefined) {
    return <PageNotFound />;
  }

  return (
    <PageLayout
      actions={
        <div css="display: flex;">
          <MobileTimePeriodFilter
            css="margin-right: 1rem;"
            onChange={(newPeriod) => {
              navigateTo(buildAppUrl(app.urlSlug), {
                statsPeriod: newPeriod,
              });
            }}
            value={statsPeriod}
          />
          <ActionLink href={app.websiteUrl}>
            <Visible above="sm">Visit App</Visible>
            <ExternalLinkIcon
              css={`
                ${media.greaterThan('md')`
                  margin-left: 8px;
                `}
              `}
              size={19}
            />
          </ActionLink>
        </div>
      }
      icon={<AppLogo height={35} imageUrl={app.logoUrl} width={35} />}
      subTitle={getPeriodDescriptor(statsPeriod)}
      title={`${app.name} Activity`}
    >
      <CardGrid>
        <AppStats app={app} period={statsPeriod} />
        <CardGridRow minHeight="360px">
          <CardGridCol xs={12}>
            <AppChartsCard appId={app.id} statsPeriod={statsPeriod} />
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol lg={7}>
            <RecentFillsCard filter={{ apps: [app.id] }} limit={12} />
          </CardGridCol>
          <CardGridCol lg={5}>
            <RelatedAppsCard
              app={app}
              css="margin-bottom: 2rem;"
              limit={5}
              statsPeriod={statsPeriod}
            />
            <AppTokensCard app={app} limit={5} statsPeriod={statsPeriod} />
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default AppPage;
