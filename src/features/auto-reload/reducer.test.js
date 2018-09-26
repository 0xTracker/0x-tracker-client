import { RELOAD_DATA } from './actions';
import reducer from './reducer';

describe('reload data action', () => {
  it('generates a new autoReload key', () => {
    const state = { key: 'bob' };
    const action = { type: RELOAD_DATA };
    const newState = reducer(state, action);

    expect(typeof newState.key).toBe('string');
    expect(newState.key).not.toBe(state.key);
  });

  it('generates a new autoReload key when an existing key is not set', () => {
    const state = {};
    const action = { type: RELOAD_DATA };
    const newState = reducer(state, action);

    expect(typeof newState.key).toBe('string');
  });
});
