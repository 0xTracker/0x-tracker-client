import { compose, mapProps } from 'recompose';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import buildTokenUrl from '../util/build-token-url';
import callApi from '../../../util/call-api';
import Card from '../../../components/card';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import TokenVolume from '../../metrics/components/token-volume';

class TokenPage extends PureComponent {
  state = {};

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

    if (token === undefined) {
      return <LoadingIndicator centered />;
    }

    return (
      <PageLayout
        breadcrumbItems={[
          { title: 'Tokens', url: URL.TOKENS },
          { title: token.name, url: buildTokenUrl(token) },
        ]}
        title={token.symbol ? `${token.name} (${token.symbol})` : token.name}
      >
        <ChartsContainer
          charts={[
            {
              component: <TokenVolume token={token} />,
              title: 'Network Volume',
            },
          ]}
          css="margin: 0 0 2em 0"
          defaultPeriod={TIME_PERIOD.MONTH}
          periods={[
            { label: '24H', value: TIME_PERIOD.DAY },
            { label: '7D', value: TIME_PERIOD.WEEK },
            { label: '1M', value: TIME_PERIOD.MONTH },
            { label: '1Y', value: TIME_PERIOD.YEAR },
            { label: 'ALL', value: TIME_PERIOD.ALL },
          ]}
        />
        <Card>
          <Fills filter={{ token: token.address }} />
        </Card>
      </PageLayout>
    );
  }
}

TokenPage.propTypes = {
  tokenAddress: PropTypes.string.isRequired,
};

const enhance = compose(
  mapProps(({ match }) => ({ tokenAddress: match.params.address })),
);

export default enhance(TokenPage);
