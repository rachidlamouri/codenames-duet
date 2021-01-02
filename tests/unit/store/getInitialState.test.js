import { getInitialState } from 'store/getInitialState';
import { storeState } from 'schemas';

describe('store/getInitialState', () => {
  it('returns a valid state', () => {
    expect(getInitialState()).toMatchSchema(storeState);
  });
});
