import _ from 'lodash';
import { distanceInWordsToNow } from 'date-fns';
import { Users as UsersIcon } from 'styled-icons/icomoon/Users.cjs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { BASE_CURRENCY } from '../../currencies/constants';
import FillLink from './fill-link';
import RelayerLink from '../../relayers/components/relayer-link';
import TokenAmount from '../../tokens/components/token-amount';
import LocalisedAmount from '../../currencies/components/localised-amount';

const StyledRecentFillsItem = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.athensGray};
  display: flex;
  margin: 0 0 1rem 0;
  padding: 0 0 1rem 0;

  &:last-child {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const Metadata = styled.dl`
  color: ${colors.stormGray};
  font-size: 0.9rem;
  margin: 0;

  dt {
    display: none;
  }

  dd {
    display: inline-block;
    margin: 0;
    vertical-align: middle;

    &::after {
      content: '';
      border-radius: 50%;
      width: 0.25rem;
      height: 0.25rem;
      background-color: currentColor;
      display: inline-block;
      vertical-align: middle;
      margin: 0 0.5rem;
    }

    &:last-child {
      &::after {
        display: none;
      }
    }
  }
`;

const Heading = styled.h4`
  font-size: 1.1rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${props => (props.compact ? 'wrap' : 'nowrap')};
`;

const FillAmount = styled(LocalisedAmount)`
  color: ${colors.violet};
  font-size: 1.2rem;
  font-weight: bold;
`;

const RecentFillsItem = ({ fill, screenSize }) => (
  <StyledRecentFillsItem>
    {fill.relayer ? (
      <RelayerLink css="color: currentColor;" relayer={fill.relayer}>
        <img
          alt=""
          css="width: 50px; height: 50px; margin-right: 1rem;"
          src={fill.relayer.imageUrl}
        />
      </RelayerLink>
    ) : (
      <UsersIcon
        color={colors.stormGray}
        css="margin-right: 1rem;"
        width={50}
      />
    )}
    <div css="display: flex; flex-direction: column; justify-content: center; flex-grow: 1;">
      <Heading>
        <FillLink fillId={fill.id}>
          <TokenAmount
            amount={fill.makerAmount}
            linked={false}
            token={fill.makerToken}
          />{' '}
          &#8651;{' '}
          <TokenAmount
            amount={fill.takerAmount}
            linked={false}
            token={fill.takerToken}
          />
        </FillLink>
      </Heading>
      <Metadata>
        <dt>Relayer</dt>
        <dd>
          {fill.relayer ? (
            <RelayerLink css="color: currentColor;" relayer={fill.relayer}>
              {fill.relayer.name ? fill.relayer.name : 'Unknown Relayer'}
            </RelayerLink>
          ) : (
            'No Relayer'
          )}
        </dd>
        <dt>Date</dt>
        <dd>{distanceInWordsToNow(fill.date)} ago</dd>
      </Metadata>
    </div>
    {screenSize.greaterThan.xs && _.has(fill, `amount.${BASE_CURRENCY}`) ? (
      <FillAmount amount={fill.amount[BASE_CURRENCY]} />
    ) : null}
  </StyledRecentFillsItem>
);

RecentFillsItem.propTypes = {
  fill: PropTypes.object.isRequired,
  screenSize: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  screenSize: state.screen,
});

export default connect(mapStateToProps)(RecentFillsItem);
