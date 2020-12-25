const { mount, shallowMount } = require('@vue/test-utils');

global.getMountUtils = ({
  component,
} = {}) => ({
  mount: ({ props, ...options } = {}) => mount(
    component,
    {
      ...options,
      propsData: props,
    },
  ),
  shallowMount: ({ props, ...options } = {}) => shallowMount(
    component,
    {
      ...options,
      propsData: props,
    },
  ),
});
