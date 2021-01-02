import ResetButton from 'components/ResetButton.vue';

const { shallowMount } = getMountUtils({
  component: ResetButton,
});

describe('components/ResetButton', () => {
  context('when not activated', () => {
    it('renders as inactive', () => {
      const wrapper = shallowMount({
        props: {
          activated: false,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  context('when activated', () => {
    it('renders as activated', () => {
      const wrapper = shallowMount({
        props: {
          activated: true,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
