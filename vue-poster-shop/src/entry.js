import App from './components/App.js';
Vue.use(VueResource);

const vue_instance = new Vue({
  el: '#app',
  components: {
    App
  }
});
