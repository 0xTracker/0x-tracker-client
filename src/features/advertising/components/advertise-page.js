import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { AdvertiseIcon, EditIcon } from '../../../components/icons';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import Link from '../../../components/link';
import PageLayout from '../../../components/page-layout';

const StyledLink = styled(Link)`
  color: ${COLORS.PRIMARY.SCAMPI_500};

  &:hover {
    color: ${COLORS.PRIMARY.SCAMPI_500};
    text-decoration: underline;
  }
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
        <EditIcon css="margin-right: 6px;" size={18} />
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
            <CardBody css="padding: 30px;">
              <p css="font-size: 18px; margin-bottom: 24px;">
                Sponsoring 0x Tracker puts your brand in front of thousands of
                crypto enthusiasts, developers, and traders on a fortnightly
                basis, whilst supporting the development of 0x Tracker.
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
                  <StyledLink href="https://microsponsors.io/exchange.html?view=auctions&sort=token43&reflink=0x56d9fb185343ff68484abb2964ad319728083cc9">
                    June 3rd 2020 - June 16th 2020
                  </StyledLink>
                </li>
                <li>
                  <StyledLink href="https://microsponsors.io/exchange.html?view=auctions&sort=token44&reflink=0x56d9fb185343ff68484abb2964ad319728083cc9">
                    June 17th 2020 - June 30th 2020
                  </StyledLink>
                </li>
                <li>
                  <StyledLink href="https://microsponsors.io/exchange.html?view=auctions&sort=token45&reflink=0x56d9fb185343ff68484abb2964ad319728083cc9">
                    July 1st 2020 - July 14th 2020
                  </StyledLink>
                </li>
              </ul>
              <h2
                css={`
                  font-size: 18px;
                  margin: 16px 0 12px;
                `}
              >
                How do I buy a sponsorship slot?
              </h2>
              <p>
                <img
                  css="border-radius: 12px; float: right; width: 60px; margin: 0 0 24px 24px;"
                  src="https://avatars3.githubusercontent.com/u/47410768?s=200&v=4"
                />
                Sponsorship slots are{' '}
                <StyledLink href="https://microsponsors.io/exchange.html?view=auctions&sort=createdby0x56D9FB185343FF68484abb2964aD319728083Cc9">
                  auctioned via microsponsors.io
                </StyledLink>
                , a 0x based marketplace which specialises in time-based NFTs.
                Winning bidders receive an{' '}
                <StyledLink href="http://erc721.org/">ERC-721 token</StyledLink>{' '}
                in their Ethereum wallet representing ownership of the slot for
                a given time period which can be used to manage your ad content
                at any time.
              </p>

              <h2
                css={`
                  font-size: 18px;
                  margin: 16px 0 12px;
                `}
              >
                I purchased a slot. How do I manage the ad content?
              </h2>
              <p>
                Managing ad content is simple. Just{' '}
                <StyledLink href="/ad-manager">
                  log in to the advert manager
                </StyledLink>{' '}
                using the wallet you purchased with. Once logged in you&rsquo;ll
                see all the ad slots you own, and will have the option to submit
                new content at anytime.
              </p>
              <p>
                All content is subject to approval and will be reviewed before
                being accepted. The review process should take no longer than 24
                hours.
              </p>
              <h2
                css={`
                  font-size: 18px;
                  margin: 16px 0 12px;
                `}
              >
                Can I resell/donate my slot?
              </h2>
              <p>
                Yes! Thanks to the power of ERC-721 tokens, you can transfer
                ownership of the slot to anyone, and we can easily verify their
                ownership. The new owner can update ad content (subject to
                approval) at any time via the advert manager.
              </p>
              <p>
                Please note: Twitter shout outs and newsletter mentions are a
                one-time benefit, given to the original auction winner.
              </p>
              <h2
                css={`
                  font-size: 18px;
                  margin: 16px 0 12px;
                `}
              >
                How can I contact you?
              </h2>
              <p>
                Fill out the{' '}
                <StyledLink href="https://0xtracker.typeform.com/to/HfuuTK">
                  contact form
                </StyledLink>{' '}
                to get in touch.
              </p>
            </CardBody>
          </Card>
        </CardGridCol>
        <CardGridCol lg={5}>
          <Card
            autoHeight={false}
            css={`
              background-color: rgb(231, 233, 243);
              box-shadow: none;
              margin-bottom: 2rem;
            `}
          >
            <CardBody css="padding: 2rem">
              <h2
                css={`
                  font-size: 18px;
                  margin: 0 0 12px;
                `}
              >
                Display Ad Examples
              </h2>
              <p css="margin-bottom: 24px;">
                Display ads vary based on screen size but are always displayed
                in a prominent position.
              </p>

              <h3
                css={`
                  font-size: 15px;
                  color: ${COLORS.NEUTRAL.MYSTIC_700};
                `}
              >
                Small Desktop
              </h3>
              <Link href="https://resources.0xtracker.com/images/promo-compact-desktop.png">
                <img
                  css="margin: 0 0 18px; width: 100%;"
                  src="https://resources.0xtracker.com/images/promo-compact-desktop.png"
                />
              </Link>

              <div css="align-items:space-between;display: flex;">
                <div css="flex-basis: 50%; margin-right: 6px;">
                  <h3
                    css={`
                      font-size: 15px;
                      color: ${COLORS.NEUTRAL.MYSTIC_700};
                    `}
                  >
                    Regular Desktop
                  </h3>
                  <Link href="https://resources.0xtracker.com/images/promo-desktop.png">
                    <img
                      css="width: 100%;"
                      src="https://resources.0xtracker.com/images/promo-desktop.png"
                      width={200}
                    />
                  </Link>
                </div>
                <div css="flex-basis: 50%; margin-left: 6px;">
                  <h3
                    css={`
                      font-size: 15px;
                      color: ${COLORS.NEUTRAL.MYSTIC_700};
                    `}
                  >
                    Mobile / Tablet
                  </h3>
                  <Link href="https://resources.0xtracker.com/images/promo-mobile.png">
                    <img
                      css="width: 100%;"
                      src="https://resources.0xtracker.com/images/promo-mobile.png"
                    />
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card
            css={`
              background-color: rgb(231, 233, 243);
              box-shadow: none;
            `}
          >
            <CardBody css="padding: 2rem">
              <h2
                css={`
                  font-size: 18px;
                  margin: 16px 0 12px;
                `}
              >
                Content Guidelines
              </h2>
              <p>
                The following guidelines should be followed when submitting your
                preferred content for the display ad:
              </p>
              <ul>
                <li>
                  Total length of all copy (headline & body) should be 100
                  characters or less
                </li>
                <li>Content should represent what is being linked to</li>
                <li>Advertised content should be crypto related</li>
                <li>No scams, ponzi schemes, or clickbait</li>
              </ul>
              <p>
                Please make sure you can follow these guidelines before
                purchasing a sponsorship slot.
              </p>
            </CardBody>
          </Card>
        </CardGridCol>
      </CardGridRow>
    </CardGrid>
  </PageLayout>
);

export default AdvertisePage;
