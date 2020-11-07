import { Cat } from 'react-kawaii';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import AdManagerPageLayout from './ad-manager-page-layout';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';

const UnsupportedBreakpoint = () => (
  <AdManagerPageLayout>
    <CardGrid>
      <CardGridRow minHeight="500px">
        <CardGridCol>
          <Card>
            <CardBody css="position: relative;">
              <div css="left: 40px; position: absolute; top: 40px; max-width: 450px; padding-right: 40px;">
                <h2 css="font-size: 24px; margin: 0;">Unsupported Device</h2>
                <p
                  css={`
                    color: ${COLORS.NEUTRAL.MYSTIC_800};
                    font-size: 18px;
                  `}
                >
                  The ad manager isn&rsquo;t currently supported on your
                  device&rsquo;s screen size. Please use a larger device.
                </p>
              </div>
              <div css="bottom: 40px; right: 40px; position: absolute;">
                <Cat color={COLORS.NEUTRAL.MYSTIC_500} mood="sad" size={200} />
              </div>
            </CardBody>
          </Card>
        </CardGridCol>
      </CardGridRow>
    </CardGrid>
  </AdManagerPageLayout>
);

export default UnsupportedBreakpoint;
