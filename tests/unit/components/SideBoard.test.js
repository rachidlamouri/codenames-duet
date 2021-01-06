import { getInitialState } from 'store/getInitialState';
import SideBoard from 'components/SideBoard.vue';
import LilButton from 'components/LilButton.vue';
import TurnCounter from 'components/TurnCounter.vue';

const { mount, shallowMount } = getMountUtils({
  component: SideBoard,
});

describe('components/SideBoard', () => {
  context('at the beginning of the game', () => {
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
      expect(wrapper.findAllComponents(LilButton).length).toBe(2);
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

  context('when turns have been used', () => {
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

  context('when too many turns have been used', () => {
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

  context('when both reset buttons are pressed', () => {
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

      [topResetButton, bottomResetButton] = wrapper.findAllComponents(LilButton).wrappers;
      topResetButton.trigger('click');
      bottomResetButton.trigger('click');
    });

    it('reloads the window', () => {
      expect(reload).toHaveBeenCalled();
    });
  });

  context('when a reset button is pressed twice before the other reset button is pressed', () => {
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

      [topResetButton, bottomResetButton] = wrapper.findAllComponents(LilButton).wrappers;
      topResetButton.trigger('click');
      topResetButton.trigger('click');
      bottomResetButton.trigger('click');
    });

    it('does not reload the window', () => {
      expect(reload).not.toHaveBeenCalled();
    });
  });
});
