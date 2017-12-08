import App from './components/App.js';
import store from './store/store-states.js';

Vue.use(Vuex);
Vue.use(VueResource);

const vueInstance = new Vue({
  el: '#app',
  components: {
    App
  },
  store
});

vueInstance.$http.get('/events').then((response) => {
  if(response.status === 200){
    const events = response.body.map(function(event) {
      event.date = moment(event.date);
      return event;
    });
    const initialState = Object.assign({},store.state,{vueInstance,events});
    store.replaceState(initialState);
  }else{
    console.log(`Error getting events from server. Status: ${response.status}`)
  }
});
