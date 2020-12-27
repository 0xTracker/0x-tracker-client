import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { CopiedIcon, CopyIcon } from '../../../components/icons';
import Tooltip from '../../../components/tooltip';

const Button = styled.button`
  background: none;
  border: none;
  color: ${COLORS.NEUTRAL.MYSTIC_700};
  font-size: 0.9rem;
  padding: 0;
`;

const CopyToClipboardButton = ({ className, text, title }) => {
  const [copied, setCopied] = React.useState(false);

  return (
    <Tooltip content={title} placement="top">
      <Button
        className={className}
        onClick={() => {
          // eslint-disable-next-line promise/catch-or-return, compat/compat
          navigator.clipboard.writeText(text).then(() => {
            setCopied(true);

            setTimeout(() => {
              setCopied(false);
            }, 2000);
          });
        }}
        type="button"
      >
        {copied ? (
          <div css="align-items: center; display: flex;">
            <CopiedIcon css="margin-right: 4px;" size={18} />
            Copied
          </div>
        ) : (
          <CopyIcon size={18} />
        )}
      </Button>
    </Tooltip>
  );
};

CopyToClipboardButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

CopyToClipboardButton.defaultProps = {
  className: undefined,
};

export default CopyToClipboardButton;
