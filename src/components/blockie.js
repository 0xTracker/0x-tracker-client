import PropTypes from 'prop-types';
import React from 'react';

import { renderBlockie } from '../util/blockies';

const Blockie = ({ seed, size, ...otherProps }) => {
  const ref = React.useRef();

  React.useEffect(() => {
    renderBlockie(
      {
        scale: 8,
        seed,
        size: 8,
      },
      ref.current,
    );
  });

  return (
    <canvas
      css={`
        height: ${size};
        width: ${size};
      `}
      ref={ref}
      {...otherProps}
    />
  );
};

Blockie.propTypes = {
  seed: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default Blockie;
