import ReactSelect from 'react-select';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const Select = styled(ReactSelect).attrs({
  classNamePrefix: 'Select',
  controlShouldRenderValue: true,
})`
  color: inherit;

  && .Select__control {
    border: 2px solid ${COLORS.NEUTRAL.MYSTIC_300};
    min-height: 0;
    padding: 0.5rem 1rem;

    &:hover {
      cursor: pointer;
    }
  }

  .Select__value-container {
    padding: 0;
  }

  .Select__control--is-focused {
    box-shadow: none;
  }

  .Select__dropdown-indicator,
  .Select__clear-indicator {
    color: ${COLORS.NEUTRAL.MYSTIC_400};
  }

  .Select__clear-indicator {
    &:hover {
      color: ${COLORS.NEUTRAL.MYSTIC_1000};
    }
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__indicator {
    padding: 0;
  }

  .Select__option:hover,
  .Select__option:active,
  .Select__option--is-focused {
    background: ${COLORS.NEUTRAL.MYSTIC_300};
    color: inherit;
    cursor: pointer;
  }

  .Select__option--is-selected {
    background: ${COLORS.NEUTRAL.MYSTIC_200};
    color: inherit;
  }

  &:hover {
    .Select__control {
      border-color: ${COLORS.NEUTRAL.MYSTIC_400};
    }

    .Select__dropdown-indicator {
      color: ${COLORS.NEUTRAL.MYSTIC_500};
    }
  }

  && .Select__menu {
    border: none;
    box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2);
  }

  && .Select__menu-list {
    border: 2px solid ${COLORS.NEUTRAL.MYSTIC_400};
    border-radius: 4px;
    padding: 0;
  }

  && .Select__placeholder {
    color: ${COLORS.NEUTRAL.MYSTIC_400};
  }
`;

export default Select;
