import { matchers } from 'jest-json-schema';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import { genMockStore } from './generators';

expect.extend(matchers);

global.context = describe;

global.getMountUtils = ({
  component,
  defaultProps = {},
} = {}) => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  return {
    mount: ({ props = {}, store, ...options } = {}) => mount(
      component,
      {
        ...options,
        propsData: {
          ...defaultProps,
          ...props,
        },
        localVue,
        store: genMockStore(store),
      },
    ),
    shallowMount: ({ props = {}, store, ...options } = {}) => shallowMount(
      component,
      {
        ...options,
        propsData: {
          ...defaultProps,
          ...props,
        },
        localVue,
        store: genMockStore(store),
      },
    ),
  };
};
