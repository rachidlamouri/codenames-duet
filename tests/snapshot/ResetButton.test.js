import { shallowMount } from '@vue/test-utils';
import ResetButton from '../../src/components/ResetButton.vue';

test('renders as inactive', () => {
  const wrapper = shallowMount(ResetButton, {
    propsData: {
      activated: false,
    },
  });
  expect(wrapper.element).toMatchSnapshot();
});

test('renders as activated', () => {
  const wrapper = shallowMount(ResetButton, {
    propsData: {
      activated: true,
    },
  });
  expect(wrapper.element).toMatchSnapshot();
});
