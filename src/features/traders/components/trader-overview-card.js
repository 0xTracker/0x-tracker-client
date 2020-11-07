import _ from 'lodash';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import CardPlaceholder from '../../../components/card-placeholder';
import Link from '../../../components/link';
import Pill from '../../../components/pill';
import traderPropTypes from '../prop-types';

const TraderOverviewCard = ({ trader }) => (
  <Card>
    <CardHeader>
      <CardHeading>Overview</CardHeading>
      <Pill
        as={Link}
        href={
          _.isString(trader.name)
            ? `https://github.com/0xTracker/ethereum-address-metadata/blob/master/data/${trader.address}.json`
            : 'https://github.com/0xTracker/ethereum-address-metadata'
        }
      >
        Edit
      </Pill>
    </CardHeader>
    <CardBody padded>
      {_.isString(trader.description) || _.isString(trader.url) ? (
        <dl>
          <dt
            css={`
              color: ${COLORS.NEUTRAL.MYSTIC_800};
            `}
          >
            Description:
          </dt>
          <dd css="margin-bottom: 24px;">
            {_.isString(trader.description)
              ? trader.description
              : 'No description available for this trader.'}
          </dd>
          {_.isString(trader.url) && (
            <>
              <dt
                css={`
                  color: ${COLORS.NEUTRAL.MYSTIC_800};
                `}
              >
                Website:
              </dt>
              <dd>
                <Link
                  css={`
                    &:hover {
                      text-decoration: underline;
                    }
                  `}
                  href={trader.url}
                  noFollow
                >
                  {trader.url}
                </Link>
              </dd>
            </>
          )}
        </dl>
      ) : (
        <CardPlaceholder>
          <p>No additional information is available for this trader.</p>
        </CardPlaceholder>
      )}
    </CardBody>
  </Card>
);

TraderOverviewCard.propTypes = {
  trader: traderPropTypes.trader.isRequired,
};

export default TraderOverviewCard;
