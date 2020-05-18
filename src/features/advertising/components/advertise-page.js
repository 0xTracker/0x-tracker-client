import React from 'react';

import { COLORS } from '../../../styles/constants';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import Link from '../../../components/link';
import PageLayout from '../../../components/page-layout';
import SideBanner from './side-banner';

const AdvertisePage = () => (
  <PageLayout
    filter={
      <Link
        css={`
          align-items: center;
          background: ${COLORS.NEUTRAL.MYSTIC_300};
          border-radius: 4px;
          display: flex;
          font-weight: 500;
          height: 35px;
          padding: 0 16px;

          &:hover {
            background: ${COLORS.NEUTRAL.MYSTIC_400};
          }
        `}
        href="/ad-manager"
      >
        <svg
          css="margin-right: 8px;"
          fill="currentColor"
          focusable="false"
          height="19"
          role="img"
          viewBox="0 0 24 24"
          width="19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>CalendarStar icon</title>
          <path d="M9.981 14.811l-.467 2.726 2.449-1.287 2.449 1.287-.468-2.726 1.982-1.932-2.738-.398L11.963 10l-1.225 2.481L8 12.879z" />
          <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm.002 16H5V8h14l.002 12z" />
        </svg>
        Ad Manager
      </Link>
    }
    title="Advertise With Us"
  >
    <CardGrid>
      <CardGridRow>
        <CardGridCol lg={7}>
          <Card>
            <CardBody padded>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                condimentum, arcu et sollicitudin scelerisque, felis elit
                dapibus libero, vel pharetra nibh diam non quam. Morbi sagittis
                est vitae laoreet imperdiet. Nunc eget efficitur ex, eget
                commodo lorem. Nulla interdum eleifend mauris vel placerat.
                Vestibulum ultrices sem vitae lectus rhoncus, sit amet auctor
                diam rhoncus. Donec eget metus congue, porttitor lectus nec,
                lobortis ante. Suspendisse non imperdiet sem. Nullam vitae felis
                massa. Cras elit turpis, maximus a lorem eu, pellentesque
                euismod nisi. Fusce sodales laoreet lorem sit amet fringilla. Ut
                imperdiet vehicula dolor, ac iaculis mi mollis vel.
              </p>
              <p>
                Donec ut efficitur massa, sed scelerisque neque. Aenean
                vulputate est lacinia tempus gravida. Suspendisse nisi est,
                convallis ac mollis sit amet, bibendum quis neque. Mauris
                sollicitudin dui turpis, ut pellentesque turpis scelerisque id.
                Nam turpis urna, pulvinar vel velit ut, malesuada convallis mi.
                Praesent bibendum nisl nec condimentum placerat. Integer nec
                iaculis purus, in luctus erat. Morbi eros ante, suscipit ut
                porttitor eu, tempus vitae justo. Integer eu nulla vitae magna
                congue fermentum vitae eu tortor. Integer et lobortis nunc.
                Morbi porttitor tincidunt ex non feugiat. Duis luctus fermentum
                dui, vitae sodales eros interdum nec. Proin quis ornare diam.
                Integer facilisis neque sed maximus bibendum.
              </p>
              <p>
                Maecenas et justo magna. Phasellus luctus est vitae neque
                elementum, in suscipit risus ullamcorper. Donec ac laoreet elit.
                Vestibulum luctus purus leo, sit amet feugiat purus pellentesque
                vitae. Nunc rhoncus fermentum purus, et rhoncus erat. Nulla nibh
                lectus, luctus at porta tempus, volutpat sit amet lectus.
                Maecenas ut enim sit amet enim finibus volutpat.
              </p>
            </CardBody>
          </Card>
        </CardGridCol>
        <CardGridCol lg={5}>
          <SideBanner css="margin-bottom: 2rem;" />
          <Card>
            <CardHeader>
              <CardHeading>Content Guidelines</CardHeading>
            </CardHeader>
            <CardBody padded>
              <p>
                All purchased ad slots must follow these guidelines. Failing to
                do so may result in the placement being refused. Please make
                sure you read them before bidding.
              </p>
            </CardBody>
          </Card>
        </CardGridCol>
      </CardGridRow>
    </CardGrid>
  </PageLayout>
);

export default AdvertisePage;
