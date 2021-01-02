import { genStoreState } from 'generators';
import { storeState } from 'schemas';
import { mutations } from 'store/mutations';

const itLeavesTheStoreInAValidState = (state) => {
  it('leaves the store in a valid state', () => {
    expect(state).toMatchSchema(storeState);
  });
};

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

    itLeavesTheStoreInAValidState(state);
  });

  describe('updateCardStatus', () => {
    context('with a valid status', () => {
      const state = genStoreState({
        cards: [undefined, undefined, { status: [null, 'agent'] }],
      });

      beforeAll(() => {
        mutations.updateCardStatus(state, { cardId: 2, playerId: 1, status: 'assassin' });
      });

      it('updates the cards status for that player', () => {
        expect(state.cards[2].status[1]).toBe('assassin');
      });

      itLeavesTheStoreInAValidState(state);
    });

    context('with an invalid status', () => {
      it('throws an error', () => {
        const testFn = () => {
          mutations.updateCardStatus(genStoreState(), { playerId: 0, status: 'bagel' });
        };

        expect(testFn).toThrow('Invalid status "bagel"');
      });
    });
  });
});
