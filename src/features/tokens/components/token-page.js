import { compose, mapProps } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import buildTokenUrl from '../util/build-token-url';
import callApi from '../../../util/call-api';
import ChartsContainer from '../../../components/charts-container';
import ContentHeader from '../../../components/content-header';
import ContentSection from '../../../components/content-section';
import Fills from '../../fills/components/fills';
import getIsMobile from '../../../selectors/get-is-mobile';
import LoadingIndicator from '../../../components/loading-indicator';
import TokenVolume from '../../metrics/components/token-volume';
import withRates from '../../currencies/components/with-rates';

class TokenPage extends PureComponent {
  constructor() {
    super();

    this.state = { token: null };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async componentDidUpdate(prevProps) {
    const { tokenAddress } = this.props;

    if (prevProps.tokenAddress !== tokenAddress) {
      await this.fetchData();
    }
  }

  async fetchData() {
    const { tokenAddress } = this.props;
    const token = await callApi(`tokens/${tokenAddress}`);

    this.setState({ token });
  }

  render() {
    const { token } = this.state;
    const { isMobile } = this.props;

    if (token === null) {
      return <LoadingIndicator isCentered />;
    }

    return [
      <ContentHeader
        breadcrumbItems={[
          { title: 'Tokens', url: URL.TOKENS },
          { title: token.name, url: buildTokenUrl(token) },
        ]}
        key="pageHeading"
        subTitle={token.symbol}
        title={token.name}
      />,
      <ContentSection key="content">
        <div className="mb-4">
          <ChartsContainer
            charts={[
              {
                component: <TokenVolume token={token} />,
                title: 'Network Volume',
              },
            ]}
            chartsHeight={265}
            defaultPeriod={TIME_PERIOD.MONTH}
            periods={
              !isMobile && [
                { label: '24H', value: TIME_PERIOD.DAY },
                { label: '7D', value: TIME_PERIOD.WEEK },
                { label: '1M', value: TIME_PERIOD.MONTH },
                { label: '1Y', value: TIME_PERIOD.YEAR },
                { label: 'ALL', value: TIME_PERIOD.ALL },
              ]
            }
          />
        </div>
        <Fills filter={{ token: token.address }} heading="Recent Fills" />
      </ContentSection>,
    ];
  }
}

TokenPage.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  tokenAddress: PropTypes.string.isRequired,
};

const enhance = compose(
  withRates,
  mapProps(({ match }) => ({ tokenAddress: match.params.address })),
  connect(state => ({ isMobile: getIsMobile(state) })),
);

export default enhance(TokenPage);
