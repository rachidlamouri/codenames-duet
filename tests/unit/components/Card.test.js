import Card from 'components/Card.vue';
import CardHalf from 'components/CardHalf.vue';
import { utils } from 'src/utils';
import { genCard } from 'helpers/generators';

const { shallowMount } = getMountUtils({
  component: Card,
});

describe('components/Card', () => {
  let wrapper;
  const card = genCard({ id: 4 });
  let cardHalves;

  beforeAll(() => {
    wrapper = shallowMount({
      props: {
        cardId: 4,
      },
      flatStore: {
        cards: [
          ...utils.range(4).map(utils.noop),
          card,
        ],
      },
    });

    cardHalves = wrapper.findAllComponents(CardHalf).wrappers;
  });

  it('renders two card halves', () => {
    expect(cardHalves.length).toBe(2);
  });

  it('passes the card to the card half', () => {
    cardHalves.forEach((cardHalf) => {
      expect(cardHalf.props().card).toStrictEqual(card);
    });
  });
});
