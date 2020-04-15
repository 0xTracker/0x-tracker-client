import { rgba } from 'polished';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';

import { colors } from '../styles/constants';

const Tooltip = styled(Tippy).attrs({ placement: 'right' })`
  && {
    background-color: #e5c459;
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px 0 ${rgba(colors.black, 0.2)};
    color: ${colors.violet};
    font-size: 0.9rem;
    font-weight: 500;
    max-width: 320px !important;
    padding: 0.75rem 1.25rem;

    .tippy-content {
      padding: 0;
    }

    .tippy-arrow {
      color: ${colors.anzac};
    }
  }
`;

export default Tooltip;
