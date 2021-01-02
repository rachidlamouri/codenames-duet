import { genStoreState } from 'generators';
import { storeState } from 'schemas';
import { mutations } from 'store/mutations';

describe('mutations', () => {
  describe('updateSuccessfulTurnCount', () => {
    const state = genStoreState({
      players: [undefined, { successfulTurnCount: 6 }],
    });

    beforeAll(() => {
      mutations.updateSuccessfulTurnCount(state, { playerId: 1, count: 7 });
    });

    it('updates the players turn count', () => {
      expect(state.players[1].successfulTurnCount).toBe(7);
    });

    it('leaves the store in a valid state', () => {
      expect(state).toMatchSchema(storeState);
    });
  });

});
