import { shallowMount } from '@vue/test-utils';
import ResetButton from '../../src/components/ResetButton.vue';

describe('components/ResetButton', () => {
  describe('when not activated', () => {
    test('renders as inactive', () => {
      const wrapper = shallowMount(ResetButton, {
        propsData: {
          activated: false,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when activated', () => {
    test('renders as activated', () => {
      const wrapper = shallowMount(ResetButton, {
        propsData: {
          activated: true,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
