import _ from 'lodash';
import { createSelector } from 'reselect';

const getTokens = createSelector(
  state => state.tokens,
  tokens =>
    _.isPlainObject(tokens)
      ? _.map(
          tokens,
          ({ address, name, symbol, decimals, imageUrl, price }) => ({
            address,
            decimals,
            imageUrl,
            name,
            price: _.isPlainObject(price)
              ? {
                  ...price,
                  lastPrice: {
                    USD: price.lastPrice,
                  },
                  lastTrade: {
                    ...price.lastTrade,
                    date: new Date(price.lastTrade.date),
                  },
                }
              : undefined,
            symbol,
          }),
        )
      : undefined,
);

export default getTokens;
