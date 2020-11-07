import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import CardPlaceholder from './card-placeholder';

const TryAgainButton = styled.button`
  background: ${COLORS.NEUTRAL.MYSTIC_400};
  border: none;
  border-radius: 4px;
  color: ${COLORS.NEUTRAL.MYSTIC_800};
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 8px 12px;
  margin: 24px auto 0 auto;
  text-align: center;

  &:hover {
    background: ${COLORS.NEUTRAL.MYSTIC_500};
  }
`;

class CardErrorBoundary extends React.PureComponent {
  state = {};

  componentDidCatch(error) {
    if (_.has(window, 'bugsnagClient')) {
      window.bugsnagClient.notify(error);
    }

    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children, message } = this.props;

    if (error === undefined) {
      return children;
    }

    return (
      <CardPlaceholder>
        {message}
        <TryAgainButton
          onClick={() => {
            this.setState({ error: undefined });
          }}
          type="button"
        >
          Try Again
        </TryAgainButton>
      </CardPlaceholder>
    );
  }
}

CardErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  message: PropTypes.string,
};

CardErrorBoundary.defaultProps = {
  message: 'An error occurred while trying to load this content',
};

export default CardErrorBoundary;
