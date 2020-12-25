import ResetButton from '../../src/components/ResetButton.vue';

const { shallowMount } = getMountUtils({
  component: ResetButton,
});

test('renders as inactive', () => {
  const wrapper = shallowMount({
    props: {
      activated: false,
    },
  });
  expect(wrapper.element).toMatchSnapshot();
});

test('renders as activated', () => {
  const wrapper = shallowMount({
    props: {
      activated: true,
    },
  });
  expect(wrapper.element).toMatchSnapshot();
});
