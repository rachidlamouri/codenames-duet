import Vue from 'vue';
import './bootstrapVue';
import store from './store';
import App from './components/App.vue';

const root = new Vue({
  render: (h) => h(App),
  store,
});

root.$mount('#app');
