import LilButton from 'src/components/LilButton.vue';

const { shallowMount } = getMountUtils({
  component: LilButton,
});

describe('components/LilButton', () => {
  describe('when not activated', () => {
    it('renders as inactive', () => {
      const wrapper = shallowMount({
        props: {
          activated: false,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when activated', () => {
    it('renders as activated', () => {
      const wrapper = shallowMount({
        props: {
          activated: true,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when green', () => {
    it('renders as green', () => {
      const wrapper = shallowMount({
        props: {
          type: 'green',
          activated: false,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when grey', () => {
    it('renders as grey', () => {
      const wrapper = shallowMount({
        props: {
          type: 'grey',
          activated: false,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
