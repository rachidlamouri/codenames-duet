import CardBoard from 'components/CardBoard.vue';

const { shallowMount } = getMountUtils({
  component: CardBoard,
});

describe('components/CardBoard', () => {
  context('always', () => {
    it('renders 25 cards', () => {
      const wrapper = shallowMount();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
