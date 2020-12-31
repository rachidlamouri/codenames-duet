import CardBoard from 'components/CardBoard.vue';

const { shallowMount } = getMountUtils({
  component: CardBoard,
});

describe('components/CardBoard', () => {
  describe('always', () => {
    it('renders 25 cards in 5 rows', () => {
      const wrapper = shallowMount();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
