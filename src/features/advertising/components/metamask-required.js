import React from 'react';

import AdManagerPageLayout from './ad-manager-page-layout';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';

const MetamaskRequired = () => (
  <AdManagerPageLayout>
    <CardGrid>
      <CardGridRow>
        <CardGridCol>
          <Card>
            <CardBody padded>
              A metamask compatible wallet is required to use the ad manager.
            </CardBody>
          </Card>
        </CardGridCol>
      </CardGridRow>
    </CardGrid>
  </AdManagerPageLayout>
);

export default MetamaskRequired;
