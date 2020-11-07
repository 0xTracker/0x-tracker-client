import { Cat } from 'react-kawaii';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import AdManagerPageLayout from './ad-manager-page-layout';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import Link from '../../../components/link';
import metaMaskFox from '../../../assets/images/metamask.svg';

const MetamaskRequired = () => (
  <AdManagerPageLayout>
    <CardGrid>
      <CardGridRow minHeight="500px">
        <CardGridCol>
          <Card>
            <CardBody css="flex-direction: row;">
              <div
                css={`
                  align-items: center;
                  display: flex;
                  flex-basis: 40%;
                  justify-content: center;
                  padding: 32px;
                `}
              >
                <Link
                  css={`
                    align-items: center;
                    background: ${COLORS.NEUTRAL.MYSTIC_400};
                    border: none;
                    border-radius: 4px;
                    display: flex;
                    font-size: 16px;
                    font-weight: 500;
                    letter-spacing: 0.05em;
                    padding: 8px 16px;
                    text-transform: uppercase;

                    &:hover {
                      background: ${COLORS.NEUTRAL.MYSTIC_500};
                    }
                  `}
                  href="https://metamask.io"
                >
                  <img
                    css="margin-right: 16px;"
                    height={50}
                    src={metaMaskFox}
                    width={50}
                  />
                  Download Metamask
                </Link>
              </div>
              <div
                css={`
                  align-items: flex-end;
                  background-color: ${COLORS.NEUTRAL.MYSTIC_100};
                  display: flex;
                  justify-content: flex-end;
                  flex-basis: 60%;
                  padding: 32px;
                  position: relative;
                `}
              >
                <div css="left: 80px; position: absolute; top: 80px; max-width: 450px;">
                  <h2 css="font-size: 24px;">Advert Manager</h2>
                  <p
                    css={`
                      color: ${COLORS.NEUTRAL.MYSTIC_800};
                      font-size: 18px;
                    `}
                  >
                    Metamask (or a Metamask compatible) wallet is required to
                    access the advert manager. Please download Metamask to
                    continue.
                  </p>
                </div>
                <Cat
                  color={COLORS.NEUTRAL.MYSTIC_500}
                  css="align-self: flex-end;"
                  mood="happy"
                  size={250}
                />
              </div>
            </CardBody>
          </Card>
        </CardGridCol>
      </CardGridRow>
    </CardGrid>
  </AdManagerPageLayout>
);

export default MetamaskRequired;
