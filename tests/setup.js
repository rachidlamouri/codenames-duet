import { matchers } from 'jest-json-schema';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import { genMockStore } from './helpers/generators';

expect.extend(matchers);

global.context = describe;

global.getMountUtils = ({
  component,
  defaultProps = {},
} = {}) => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  return {
    mount: ({ props = {}, flatStore, ...options } = {}) => mount(
      component,
      {
        ...options,
        propsData: {
          ...defaultProps,
          ...props,
        },
        localVue,
        store: genMockStore(flatStore),
      },
    ),
    shallowMount: ({ props = {}, flatStore, ...options } = {}) => shallowMount(
      component,
      {
        ...options,
        propsData: {
          ...defaultProps,
          ...props,
        },
        localVue,
        store: genMockStore(flatStore),
      },
    ),
  };
};
