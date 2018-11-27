import React from 'react';
import styled from 'styled-components';

const Icon = props => (
  <svg {...props} viewBox="0 0 15 15">
    <path d="M0 6.5V1c0-.6.4-1 1-1 9 .3 13.7 5 14 14 0 .6-.4 1-1 1H8.5c-.6 0-1-.4-1-1-.3-4.4-2-6.2-6.5-6.5-.6 0-1-.4-1-1z" />
  </svg>
);

const SpectrumIcon = styled(Icon)`
  color: inherit;

  path {
    fill: currentColor;
  }
`;

export default SpectrumIcon;
