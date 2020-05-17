import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import summarizeNumber from '../util/summarize-number';

const Number = ({ children, precision, summarize, title }) => {
  const formattedValue = numeral(children).format(
    precision === 0 ? '0,0' : `0,0.[${_.repeat('0', precision)}]`,
  );

  if (summarize) {
    return (
      <span title={title ? formattedValue : undefined}>
        {summarizeNumber(children)}
      </span>
    );
  }

  return formattedValue;
};

Number.propTypes = {
  children: PropTypes.number.isRequired,
  summarize: PropTypes.bool,
  title: PropTypes.bool,
};

Number.defaultProps = {
  summarize: false,
  title: true,
};

export default Number;
