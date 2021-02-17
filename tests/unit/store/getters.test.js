import { getInitialState } from 'store/getInitialState';
import { getters } from 'store/getters';
import { genStoreState } from 'helpers/generators';
import { utils } from 'src/utils';

describe('getters', () => {
  describe('turnsTaken', () => {
    context('at the beginning of the game', () => {
      it('returns 0', () => {
        const state = getInitialState();
        expect(getters.turnsTaken(state)).toBe(0);
      });
    });

    context('when players have successful and unsuccessful turns', () => {
      it('returns the sum of all successful and unsuccessful turns', () => {
        const state = genStoreState({
          cards: [
            ...utils.range(10).map(() => ({ status: ['agent', 'agent'] })),
            { status: ['bystander', null] },
            { status: [null, 'bystander'] },
            { status: ['bystander', 'bystander'] },
            { status: ['assassin', null] },
            { status: [null, 'assassin'] },
            { status: ['assassin', 'assassin'] },
            { status: ['bystander', 'assassin'] },
            { status: ['assassin', 'bystander'] },
            ...utils.range(7).map(() => ({ status: ['agent', 'agent'] })),
          ],
          players: [
            { successfulTurnCount: 5 },
            { successfulTurnCount: 7 },
          ],
        });
        expect(getters.turnsTaken(state)).toBe(24);
      });
    });
  });
});
