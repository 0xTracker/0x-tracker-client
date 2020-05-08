import PropTypes from 'prop-types';
import React from 'react';

import AdManagerPageLayout from './ad-manager-page-layout';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';

const WalletDisconnected = ({ onConnect }) => (
  <AdManagerPageLayout>
    <CardGrid>
      <CardGridRow>
        <CardGridCol>
          <Card>
            <CardBody padded>
              <button onClick={() => onConnect()} type="submit">
                Connect Wallet
              </button>
            </CardBody>
          </Card>
        </CardGridCol>
      </CardGridRow>
    </CardGrid>
  </AdManagerPageLayout>
);

WalletDisconnected.propTypes = {
  onConnect: PropTypes.func.isRequired,
};

export default WalletDisconnected;
