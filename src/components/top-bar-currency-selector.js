import styled from 'styled-components';

import CurrencySelector from '../features/currencies/components/currency-selector';

const TopBarCurrencySelector = styled(CurrencySelector)`
  width: 220px;

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
    background: #222;
    box-shadow: none;
    color: white;
    margin: 0;
  }

  && &__option:hover,
  && &__option:active,
  && &__option--is-focused {
    background: #666;
    cursor: pointer;
  }

  && &__option--is-selected {
    background: #444;
  }
`;

export default TopBarCurrencySelector;
