import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';

import { COLORS } from '../styles/constants';
import { HelpIcon } from './icons';

const StyledTippy = styled(Tippy)`
  && {
    background-color: ${COLORS.ACCENT.ANZAC_500};
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    color: ${COLORS.NEUTRAL.MYSTIC_1000};
    font-weight: 400;
    max-width: 320px !important;
    padding: 0.75rem 1.25rem;

    .tippy-content {
      padding: 0;
    }

    .tippy-arrow {
      color: ${COLORS.ACCENT.ANZAC_500};
    }

    dl {
      margin: 0;
      padding: 0;
    }

    dt {
      color: ${COLORS.PRIMARY.SCAMPI_1000};
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      margin: 0;
      text-transform: uppercase;
    }

    dd {
      color: ${COLORS.ACCENT.SCAMPI_800};
      display: inline-block;
      font-size: 0.9rem;
      margin: 0 0 0 0.25rem;
    }

    p:last-child {
      margin-bottom: 0;
    }
  }
`;

const Tooltip = ({ children, content, iconColor, placement }) => (
  <StyledTippy content={content} placement={placement}>
    <span css="display: flex; align-items: center; justify-content: flex-end; text-align: right;">
      <span>{children}</span>
      <HelpIcon color={iconColor} css="margin-left: 0.5rem;" size={18} />
    </span>
  </StyledTippy>
);

Tooltip.defaultProps = {
  iconColor: 'inherit',
  placement: 'right',
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  iconColor: PropTypes.string,
  placement: PropTypes.string,
};

export default Tooltip;
