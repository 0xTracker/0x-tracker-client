import { compose, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { TIME_PERIOD } from '../../../constants';
import { media } from '../../../styles/util';
import Card from '../../../components/card';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import getPeriodOptions from '../../../util/get-period-options';
import LoadingPage from '../../../components/loading-page';
import NetworkVolume from '../../metrics/components/network-volume';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import useRelayer from '../hooks/use-relayer';

const StyledChartsContainer = styled(ChartsContainer)`
  margin-bottom: 1.25rem;

  ${media.greaterThan('lg')`
    margin-bottom: 2rem;
  `}
`;

const RelayerPage = ({ screenSize, slug }) => {
  const [page, setPage] = useState(1);
  const [relayer, loadingRelayer] = useRelayer(slug);

  if (loadingRelayer) {
    return <LoadingPage />;
  }

  if (relayer === undefined) {
    return <PageNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{relayer.name}</title>
      </Helmet>
      <PageLayout title={relayer.name}>
        <StyledChartsContainer
          charts={[
            {
              component: <NetworkVolume relayerId={relayer.id} />,
              title: 'Fill Volume',
            },
            {
              component: <NetworkVolume relayerId={relayer.id} type="fills" />,
              title: 'Fill Count',
            },
          ]}
          defaultPeriod={TIME_PERIOD.YEAR}
          periods={
            screenSize.greaterThan.xs
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
        <Card>
          <Fills
            excludeColumns={['relayer']}
            filter={{ relayer: relayer.id }}
            onPageChange={setPage}
            page={page}
          />
        </Card>
      </PageLayout>
    </>
  );
};

RelayerPage.propTypes = {
  screenSize: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  screenSize: state.screen,
});

const enhance = compose(
  mapProps(({ match }) => ({ slug: match.params.slug })),
  connect(mapStateToProps),
);

export default enhance(RelayerPage);
