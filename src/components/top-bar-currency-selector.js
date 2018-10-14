import styled from 'styled-components';

import { media } from '../styles/util';
import { colors } from '../styles/constants';
import AsyncCurrencySelector from '../features/currencies/components/async-currency-selector';

const TopBarCurrencySelector = styled(AsyncCurrencySelector)`
  display: none;
  width: 220px;

  ${media.lg`
    display: block;
  `};

  && &__control {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  && &__control--is-focused {
    box-shadow: none;
  }

  && &__single-value {
    color: white;
  }

  && &__dropdown-indicator {
    padding: 0;
  }

  && &__indicator-separator {
    display: none;
  }

  && &__menu {
    background: ${colors.mineShaft};
    box-shadow: none;
    color: white;
    margin: 0;
  }

  && &__option:hover,
  && &__option:active,
  && &__option--is-focused {
    background: ${colors.scampi};
    cursor: pointer;
  }

  && &__option--is-selected {
    background: ${colors.tuna};
  }
`;

export default TopBarCurrencySelector;
