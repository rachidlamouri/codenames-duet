import { getInitialState } from 'store/getInitialState';
import PlayerBoard from 'components/PlayerBoard.vue';
import TurnCounter from 'components/TurnCounter.vue';

const { mount, shallowMount } = getMountUtils({
  component: PlayerBoard,
  defaultProps: { playerId: 0 },
});

const getAddCounterButton = (wrapper) => wrapper.find('button.add-counter');

describe('components/PlayerBoard', () => {
  describe('always', () => {
    it('renders an "add counter" button', () => {
      const wrapper = shallowMount();
      expect(getAddCounterButton(wrapper).element).toMatchSnapshot();
    });
  });

  describe('at the beginning of the game', () => {
    it('does not render turn counters', () => {
      const wrapper = shallowMount({
        store: getInitialState(),
      });

      const turnCounters = wrapper.findAllComponents(TurnCounter).wrappers;
      expect(turnCounters.length).toBe(0);
    });
  });

  describe('when the "add counter" button is pressed', () => {
    let wrapper;
    let addCounterButton;
    const updateSuccessfulTurnCount = jest.fn();
    beforeAll(() => {
      wrapper = shallowMount({
        props: { playerId: 1 },
        store: {
          players: [
            undefined,
            { successfulTurnCount: 5 },
          ],
          updateSuccessfulTurnCount,
        },
      });

      addCounterButton = getAddCounterButton(wrapper);
      addCounterButton.trigger('click');
    });

    it('increments the players turn count', () => {
      expect(updateSuccessfulTurnCount).toHaveBeenCalledWith(
        expect.anything(),
        { playerId: 1, count: 6 },
      );
    });
  });

  describe('when the player has taken turns', () => {
    let wrapper;
    let turnCounters;
    beforeAll(() => {
      wrapper = shallowMount({
        props: { playerId: 0 },
        store: {
          players: [
            { successfulTurnCount: 2 },
          ],
        },
      });

      turnCounters = wrapper.findAllComponents(TurnCounter).wrappers;
    });

    it('renders a turn counter for each successful turn', () => {
      expect(turnCounters.length).toBe(2);
    });

    it('renders "player" turn counters', () => {
      const elements = turnCounters.map(({ element }) => element);
      expect(elements).toMatchSnapshot();
    });
  });

  describe('when a turn counter is pressed', () => {
    let wrapper;
    let secondTurnCounter;
    const updateSuccessfulTurnCount = jest.fn();
    beforeAll(() => {
      wrapper = mount({
        props: { playerId: 0 },
        store: {
          players: [
            { successfulTurnCount: 3 },
          ],
          updateSuccessfulTurnCount,
        },
      });

      [, secondTurnCounter] = wrapper.findAllComponents(TurnCounter).wrappers;
      secondTurnCounter.trigger('click');
    });

    it('decrements the players turn count', () => {
      expect(updateSuccessfulTurnCount).toHaveBeenCalledWith(
        expect.anything(),
        { playerId: 0, count: 2 },
      );
    });
  });
});
