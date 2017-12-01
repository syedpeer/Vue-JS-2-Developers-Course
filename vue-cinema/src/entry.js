import Detail from './components/Detail.js';
import Overview from './components/Overview.js';
import {checkFilter,setDay} from "./util/bus.js";
import {EventBus} from "./util/bus.js";
import Tooltip from './util/tooltip.js';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Tooltip);

let router = new VueRouter({
  routes: [
    {path: '/', component: Overview,name: 'home'},
    {path: '/movie/:id',component: Detail,name: 'movie'},
    {path: '*', redirect: {name: 'home'}}
  ]
});

Vue.config.productionTip = false;

const vue_instance = new Vue({
  el: '#app', //the main template
  data: {
    genre: [],
    time: [],
    movies: [],
    day: moment()
  },
  created(){
    this.$http.get('/api').then((response) => {
      this.movies = response.data;
    });
    EventBus.$on('check-filter',checkFilter.bind(this));
    EventBus.$on('set-day',setDay.bind(this));
  },
  router
});

