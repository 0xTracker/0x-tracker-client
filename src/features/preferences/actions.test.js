import { disableAutoReload, enableAutoReload, setCurrency } from './actions';
import {
  DISABLE_AUTO_RELOAD,
  ENABLE_AUTO_RELOAD,
  SET_CURRENCY,
} from './action-types';

describe('disableAutoReload', () => {
  it('generates expected action', () => {
    const action = disableAutoReload();

    expect(action).toEqual({ type: DISABLE_AUTO_RELOAD });
  });

  it('generates action with GBP currency', () => {
    const action = setCurrency('GBP');

    expect(action).toEqual({ currency: 'GBP', type: SET_CURRENCY });
  });

  it('generates action with USD currency', () => {
    const action = setCurrency('USD');

    expect(action).toEqual({ currency: 'USD', type: SET_CURRENCY });
  });
});

describe('enableAutoReload', () => {
  it('generates expected action', () => {
    const action = enableAutoReload();

    expect(action).toEqual({ type: ENABLE_AUTO_RELOAD });
  });
});
