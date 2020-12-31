import { getInitialState } from 'store/getInitialState';
import SideBoard from 'components/SideBoard.vue';
import ResetButton from 'components/ResetButton.vue';
import TurnCounter from 'components/TurnCounter.vue';

const { mount, shallowMount } = getMountUtils({
  component: SideBoard,
});

describe('components/SideBoard', () => {
  describe('at the beginning of the game', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallowMount({
        store: {
          ...getInitialState(),
          turnsTaken: 0,
        },
      });
    });

    it('renders two reset buttons', () => {
      expect(wrapper.findAllComponents(ResetButton).length).toBe(2);
    });

    it('renders nine turn counters', () => {
      expect(wrapper.findAllComponents(TurnCounter).length).toBe(9);
    });

    it('renders normal counters', () => {
      const turnCounterElements = wrapper.findAllComponents(TurnCounter).wrappers
        .map((innerWrapper) => innerWrapper.element);
      expect(turnCounterElements).toMatchSnapshot();
    });
  });

  describe('when turns have been used', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallowMount({
        store: {
          sideboard: { maxTurns: 9 },
          turnsTaken: 3,
        },
      });
    });

    it('renders less turn counters', () => {
      expect(wrapper.findAllComponents(TurnCounter).length).toBe(6);
    });
  });

  describe('when too many turns have been used', () => {
    let wrapper;
    let turnCounterElements;
    beforeAll(() => {
      wrapper = shallowMount({
        store: {
          sideboard: { maxTurns: 9 },
          turnsTaken: 12,
        },
      });

      turnCounterElements = wrapper.findAllComponents(TurnCounter).wrappers
        .map((innerWrapper) => innerWrapper.element);
    });

    it('renders the overused counters', () => {
      expect(turnCounterElements.length).toBe(3);
    });

    it('renders error counters', () => {
      expect(turnCounterElements).toMatchSnapshot();
    });
  });

  describe('when both reset buttons are pressed', () => {
    let wrapper;
    let topResetButton;
    let bottomResetButton;
    const reload = jest.fn();
    beforeAll(() => {
      wrapper = mount({
        store: {
          reload,
        },
      });

      [topResetButton, bottomResetButton] = wrapper.findAllComponents(ResetButton).wrappers;
      topResetButton.trigger('click');
      bottomResetButton.trigger('click');
    });

    it('reloads the window', () => {
      expect(reload).toHaveBeenCalled();
    });
  });

  describe('when a reset button is pressed twice before the other reset button is pressed', () => {
    let wrapper;
    let topResetButton;
    let bottomResetButton;
    const reload = jest.fn();
    beforeAll(() => {
      wrapper = mount({
        store: {
          reload,
        },
      });

      [topResetButton, bottomResetButton] = wrapper.findAllComponents(ResetButton).wrappers;
      topResetButton.trigger('click');
      topResetButton.trigger('click');
      bottomResetButton.trigger('click');
    });

    it('does not reload the window', () => {
      expect(reload).not.toHaveBeenCalled();
    });
  });
});
