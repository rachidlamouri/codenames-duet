import Vue from 'vue';
import App from './App.vue';

const root = new Vue({
  render: (h) => h(App),
});

root.$mount('#app');
