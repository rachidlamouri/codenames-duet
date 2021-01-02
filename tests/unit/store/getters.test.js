const { getInitialState } = require('store/getInitialState');
const { getters } = require('store/getters');
const { genStoreState } = require('generators');
const { utils } = require('src/utils');

describe('getters', () => {
  describe('turnsTaken', () => {
    describe('at the beginning of the game', () => {
      it('returns 0', () => {
        const state = getInitialState();
        expect(getters.turnsTaken(state)).toBe(0);
      });
    });

    describe('when players have successful and unsuccessful turns', () => {
      it('returns the sum of all successful and unsuccessful turns', () => {
        const state = genStoreState({
          cards: [
            ...utils.range(10).map(() => ({ status: ['agent', 'agent'] })),
            { status: ['bystander', null] },
            { status: [null, 'bystander'] },
            { status: [null, 'bystander'] },
            { status: [null, 'bystander'] },
            ...utils.range(11).map(() => ({ status: ['assassin', 'assassin'] })),
          ],
          players: [
            { successfulTurnCount: 5 },
            { successfulTurnCount: 7 },
          ],
        });
        expect(getters.turnsTaken(state)).toBe(16);
      });
    });
  });
});
