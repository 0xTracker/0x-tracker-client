import React from 'react';

let context = React.createContext('xl');

const setTestValue = (initialValue) => {
  context = React.createContext(initialValue);
};

const getBreakpointContext = () => context;

export { getBreakpointContext, setTestValue };
