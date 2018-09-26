import {
  DISABLE_AUTO_RELOAD,
  ENABLE_AUTO_RELOAD,
  SET_CURRENCY,
} from './action-types';
import reducer from './reducer';

describe('disable auto reload action', () => {
  it('disables auto reload preference', () => {
    const state = { autoReload: { enabled: true } };
    const action = { type: DISABLE_AUTO_RELOAD };
    const newState = reducer(state, action);

    expect(newState.autoReload.enabled).toBe(false);
  });
});

describe('enable auto reload action', () => {
  it('enables auto reload preference', () => {
    const state = { autoReload: { enabled: false } };
    const action = { type: ENABLE_AUTO_RELOAD };
    const newState = reducer(state, action);

    expect(newState.autoReload.enabled).toBe(true);
  });
});

describe('set currency action', () => {
  it('changes currency to specified one', () => {
    const state = { currency: 'BTC' };
    const action = { type: SET_CURRENCY, currency: 'GBP' };
    const newState = reducer(state, action);

    expect(newState.currency).toBe('GBP');
  });
});

it('returns original state for unknown action', () => {
  const state = { autoReload: { enabled: true }, currency: 'BTC' };
  const action = { type: 'unknown' };
  const newState = reducer(state, action);

  expect(newState).toBe(state);
});

it('returns default state if state is undefined', () => {
  const action = { type: 'unknown' };
  const newState = reducer(undefined, action);

  expect(newState).toEqual({
    autoReload: { enabled: true },
    currency: 'USD',
  });
});
