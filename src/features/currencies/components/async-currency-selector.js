import loadable from 'loadable-components';

const AsyncCurrencySelector = loadable(() => import('./currency-selector'));

export default AsyncCurrencySelector;
