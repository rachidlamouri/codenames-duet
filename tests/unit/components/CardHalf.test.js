import Vue from 'vue';
import CardHalf from 'components/CardHalf.vue';
import { genCard } from 'generators';

const { shallowMount } = getMountUtils({
  component: CardHalf,
  defaultProps: {
    card: genCard(),
    playerId: 0,
  },
});

const getWordContainer = (wrapper) => wrapper.find('.word');
const getButtonGroup = (wrapper) => wrapper.find('.button-group');

describe('components/CardHalf', () => {
  describe('by default', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallowMount({
        props: {
          card: genCard({ word: 'THE WORD' }),
        },
      });
    });

    it('renders the word', () => {
      expect(getWordContainer(wrapper).element).toMatchSnapshot();
    });

    it('does not render buttons', () => {
      expect(getButtonGroup(wrapper).element).toMatchSnapshot();
    });
  });

  describe('when player id is 0', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallowMount({
        props: {
          playerId: 0,
        },
      });
    });

    it('renders as the top word', () => {
      expect(wrapper.classes()).toContain('top');
    });
  });

  describe('when player id is 1', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallowMount({
        props: {
          playerId: 1,
        },
      });
    });

    it('renders as the bottom word', () => {
      expect(wrapper.classes()).toContain('bottom');
    });
  });

  describe('when pressed', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallowMount();

      wrapper.trigger('click');
    });

    it('renders buttons', () => {
      expect(getButtonGroup(wrapper).element).toMatchSnapshot();
    });
  });

  describe('when pressed twice', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallowMount();

      wrapper.trigger('click');
      wrapper.trigger('click');
    });

    it('hides the buttons', () => {
      expect(getButtonGroup(wrapper).element).toMatchSnapshot();
    });
  });

  describe('when the agent button is pressed', () => {
    let wrapper;
    const updateCardStatus = jest.fn();
    beforeAll((done) => {
      wrapper = shallowMount({
        props: {
          card: genCard({ id: 4 }),
          playerId: 1,
        },
        store: {
          updateCardStatus,
        },
      });

      wrapper.trigger('click');
      Vue.nextTick(() => {
        getButtonGroup(wrapper).find('.agent').trigger('click');
        done();
      });
    });

    it('sets the cards status', () => {
      expect(updateCardStatus).toHaveBeenCalledWith(
        expect.anything(),
        { cardId: 4, playerId: 1, status: 'agent' },
      );
    });

    it('hides the buttons', () => {
      expect(getButtonGroup(wrapper).element).toMatchSnapshot();
    });
  });

  describe('when the bystander button is pressed', () => {
    let wrapper;
    const updateCardStatus = jest.fn();
    beforeAll((done) => {
      wrapper = shallowMount({
        props: {
          card: genCard({ id: 7 }),
          playerId: 0,
        },
        store: {
          updateCardStatus,
        },
      });

      wrapper.trigger('click');
      Vue.nextTick(() => {
        getButtonGroup(wrapper).find('.bystander').trigger('click');
        done();
      });
    });

    it('sets the cards status', () => {
      expect(updateCardStatus).toHaveBeenCalledWith(
        expect.anything(),
        { cardId: 7, playerId: 0, status: 'bystander' },
      );
    });

    it('hides the buttons', () => {
      expect(getButtonGroup(wrapper).element).toMatchSnapshot();
    });
  });

  describe('when the assassin button is pressed', () => {
    let wrapper;
    const updateCardStatus = jest.fn();
    beforeAll((done) => {
      wrapper = shallowMount({
        props: {
          card: genCard({ id: 2 }),
          playerId: 1,
        },
        store: {
          updateCardStatus,
        },
      });

      wrapper.trigger('click');
      Vue.nextTick(() => {
        getButtonGroup(wrapper).find('.assassin').trigger('click');
        done();
      });
    });

    it('sets the cards status', () => {
      expect(updateCardStatus).toHaveBeenCalledWith(
        expect.anything(),
        { cardId: 2, playerId: 1, status: 'assassin' },
      );
    });

    it('hides the buttons', () => {
      expect(getButtonGroup(wrapper).element).toMatchSnapshot();
    });
  });

  describe('when the reset button is pressed', () => {
    let wrapper;
    const updateCardStatus = jest.fn();
    beforeAll((done) => {
      wrapper = shallowMount({
        props: {
          card: genCard({ id: 6 }),
          playerId: 0,
        },
        store: {
          updateCardStatus,
        },
      });

      wrapper.trigger('click');
      Vue.nextTick(() => {
        getButtonGroup(wrapper).find('.reset').trigger('click');
        done();
      });
    });

    it('sets the cards status', () => {
      expect(updateCardStatus).toHaveBeenCalledWith(
        expect.anything(),
        { cardId: 6, playerId: 0, status: null },
      );
    });

    it('hides the buttons', () => {
      expect(getButtonGroup(wrapper).element).toMatchSnapshot();
    });
  });
});
