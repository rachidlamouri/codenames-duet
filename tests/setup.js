import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import { genStore } from './generators';

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
        store: genStore(store),
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
        store: genStore(store),
      },
    ),
  };
};
