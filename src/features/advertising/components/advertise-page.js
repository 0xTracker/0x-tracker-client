import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { AdvertiseIcon } from '../../../components/icons';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import Link from '../../../components/link';
import PageLayout from '../../../components/page-layout';

const StyledLink = styled(Link)`
  color: ${COLORS.PRIMARY.SCAMPI_500};
`;

const AdvertisePage = () => (
  <PageLayout
    actions={
      <Link
        css={`
          align-items: center;
          background: ${COLORS.NEUTRAL.MYSTIC_100};
          box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2);
          border-radius: 4px;
          display: flex;
          font-weight: 500;
          height: 35px;
          padding: 0 16px;

          &:hover {
            box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.4);
          }
        `}
        href="/ad-manager"
      >
        Ad Manager
      </Link>
    }
    icon={<AdvertiseIcon size={44} />}
    subTitle="via fortnightly sponsorship"
    title="Advertise With Us"
  >
    <CardGrid>
      <CardGridRow>
        <CardGridCol lg={7}>
          <Card>
            <CardBody css="font-size: 16px; padding: 30px;">
              <p>
                Sponsoring 0x Tracker provides companies and projects with a way
                to reach thousands of crypto enthusiasts, developers, and
                traders on a fortnightly basis, whilst supporting the
                development of 0x Tracker.
              </p>
              <p>What sponsors get:</p>
              <ul>
                <li>A prominent display ad on every page of the site</li>
                <li>
                  A shout out on Twitter via{' '}
                  <StyledLink href="https://twitter.com/0xTracker">
                    @0xTracker
                  </StyledLink>
                </li>
                <li>A mention in our monthly ecosystem update newsletter</li>
              </ul>
              <p>The following slots are currently available:</p>
              <ul>
                <li>
                  <StyledLink href="https://google.com">
                    June 3rd 2020 - June 16th 2020
                  </StyledLink>
                </li>
                <li>
                  <StyledLink href="https://google.com">
                    June 17th 2020 - June 30th 2020
                  </StyledLink>
                </li>
                <li>
                  <StyledLink href="https://google.com">
                    July 1st 2020 - July 14th 2020
                  </StyledLink>
                </li>
              </ul>
              <h2
                css={`
                  color: ${COLORS.NEUTRAL.MYSTIC_700};
                  font-size: 18px;
                  margin: 16px 0 12px;
                `}
              >
                What does the display ad look like?
              </h2>
              <p>
                The display ad consists of a small image/icon, headline, body
                text, and link. How the advert is displayed depends upon the
                device being used, however it is always shown in a prominent
                position and isn’t affected by ad-blockers since no third party
                scripts are used.
              </p>
              <h2
                css={`
                  color: ${COLORS.NEUTRAL.MYSTIC_700};
                  font-size: 18px;
                  margin: 16px 0 12px;
                `}
              >
                How do I buy an a sponsorship slot?
              </h2>
              <p>
                <img
                  css="border-radius: 12px; float: right; width: 60px; margin: 0 0 24px 24px;"
                  src="https://avatars3.githubusercontent.com/u/47410768?s=200&v=4"
                />
                Sponsorship slots are auctioned via microsponsors.io, a 0x based
                marketplace which specialises in time-based NFTs. Winning
                bidders receive an ERC-721 token in their Ethereum wallet
                representing ownership of the slot for a given time period which
                can be used to manage your ad content at any time.
              </p>

              <h2
                css={`
                  color: ${COLORS.NEUTRAL.MYSTIC_700};
                  font-size: 18px;
                  margin: 16px 0 12px;
                `}
              >
                I purchased a slot. How do I manage the ad content?
              </h2>
            </CardBody>
          </Card>
        </CardGridCol>
        <CardGridCol lg={5}>
          <Card css="margin-bottom: 2rem;">
            <CardHeader>
              <CardHeading>Display Ad Variations</CardHeading>
            </CardHeader>
            <CardBody padded />
          </Card>
          <Card>
            <CardHeader>
              <CardHeading>Content Guidelines</CardHeading>
            </CardHeader>
            <CardBody padded />
          </Card>
        </CardGridCol>
      </CardGridRow>
    </CardGrid>
  </PageLayout>
);

export default AdvertisePage;
